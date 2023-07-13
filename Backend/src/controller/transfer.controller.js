'use strict'

const { accountExist, checkAmountTransfer, checkSenderBalance, calculateSenderBalance, calculateAmountBalance } = require('../helpers/functionsControllers/transaferFunctions')
const { userExists, convertCurrencies } = require('../helpers/functionsControllers/userFunctions')
const Transfer = require('../models/transfer.model')
const User = require('../models/user.model')

exports.createTransfer = async(req, res)=> {
    try {
        
        //Obtener los datos de quien envia y de quien recibe
        const { beneficiary, typeAccount , amount , currency } = req.body

        //Comprobar qeu el monto de la transferencia sea mayor a cero.
        if(amount < 1) return res.status(400).send({message: 'El deposito debe tener un monto mayor a 0.'})
        //Comprobar que la transferenia que se quiere hacer no pase los Q1000.00
        if( ! checkAmountTransfer( currency , amount ) ) return res.status(400).send({message: 'El monto de la transferencia sobre pasa lo permitido por el banco.'})

        //Comprobar que ambas cuentas existan
        const userSender = await userExists(req.user._id)
        if(!userSender) return res.status(404).send({message: 'Su cuenta no existe en la base de datos.'});

        const accoundBeneficiary = await accountExist(beneficiary)
        if(!accoundBeneficiary) return res.status(404).send({message: 'No se encontro la cuenta del beneficiario en la base de datos.'})

        //Comprobar que el tipo de cuenta que se haya enviado por parte del remitente sea el mismo
        if( typeAccount != accoundBeneficiary.typeAccount ) return res.status(400).send({message: 'Error al enviar los datos de la cuenta beneficiaria.'})

        //Comprobar que la cuenta remitente tenga el saldo suficiente
        if(  await checkSenderBalance( userSender.currency , userSender.accountBalance , amount , currency ) ) 
        return res.status(400).send({message: 'El monto de la transferencia supera el saldo de la cuenta del beneficiario.'})

        //***********Actualizamos cada una de las cuentas.
        // Se calcula el nuevo saldo de la cuenta del remitente
        let newAccountBalanceSender = await calculateAmountBalance(userSender.currency , amount , currency)
        newAccountBalanceSender = userSender.accountBalance - newAccountBalanceSender

        const newUserSender = await User.findOneAndUpdate( 
            {_id: userSender._id},
            { 
                accountBalance: newAccountBalanceSender ,
                $inc: { numberOfTransactions: 1},
            },
            {new: true}
            )

        // Se calcula el nuevo saldo del beneficiario
        let newAccoundBalanceBeneficiary = await calculateAmountBalance( accoundBeneficiary.currency , amount , currency )
        newAccoundBalanceBeneficiary = parseFloat(accoundBeneficiary.accountBalance) + parseFloat(newAccoundBalanceBeneficiary);

        const newAccoundBeneficiary = await User.findOneAndUpdate(
            {_id: accoundBeneficiary._id},
            { 
                accountBalance: newAccoundBalanceBeneficiary,
                $inc: { numberOfTransactions: 1},
            },
            {new: true}
        )

        if( !newUserSender ) return res.status(404).send({message: 'No se pudo acutalizar el saldo de la cuenta del remitente.'})
        if( !newAccoundBeneficiary ) return res.status(404).send({message: 'No se pudo acutalizar el saldo de la cuenta del beneficiario.'});

        //Crear la transferencia y gurdarla en la base de datos
        let newTransfer = new Transfer({
            movementType: req.body.movementType,
            beneficiary: accoundBeneficiary.number_Account,
            amount: amount,
            currency: currency,
            sender: userSender.number_Account,
            typeAccount: accoundBeneficiary.typeAccount,
        })

        newTransfer = await newTransfer.save()

        return res.status(200).send({message: 'Se realizo la transfernecia correctamente.' , newTransfer});

    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'No se pudo completar la tarea. Error en el servidor'})        
    }
}

exports.createDeposit = async(req, res)=> {
    try {
        
        let {beneficiary, typeAccount, amount, currency} = req.body;

        //Comprobar que el deposito no pase los Q10000.00, diez mil quetzales. Y que sea mayor a 0
        if(amount < 1) return res.status(400).send({message: 'No se ha podido '})

        if( ! await checkAmountTransfer(currency, amount) ) return res.status(400).send({message: 'El monto del deposito sobrepasa lo permitido por el banco.'})

        //Comprobar que la cuenta del beneficiario exista
        beneficiary = await User.findOne({number_Account: beneficiary})
        if( !beneficiary ) return res.status(404).send({message: 'No se ha encontrado el beneficiario en al base de datos.'});

        //Comprobar que el tipo de cuenta enviado y el correspondiente de la cuenta encontrada (beneficiario) sean iguales
        console.log(JSON.stringify(beneficiary.typeAccount)  == JSON.stringify(typeAccount));
        if( beneficiary.typeAccount != typeAccount ) return res.status(400).send({message: 'El tipo de cuenta no es correcto.'})

        //Si en dado caso el tipo de moneda del deposito es diferente al tipo de moneda que tiene el usuario, se hara una conversion.
        if( currency != beneficiary.currency ){
            amount = await convertCurrencies(currency, beneficiary.currency, amount)
        }

        //Agregar el deposito al beneficiario
        const updateBeneficiary = await User.findOneAndUpdate(
            {number_Account: beneficiary.number_Account},
            {
                $inc: {
                        numberOfTransactions: 1,
                        accountBalance: amount
                    },
            },
            {new: true}
        )

        if(!updateBeneficiary) return res.status(404).send({message: 'No fue posible actualizar la cuenta del beneficiario.'})

        //Crear la transferencia y gurdarla en la base de datos
        let newTransfer = new Transfer({
            movementType: 'DEPOSITO',
            beneficiary: beneficiary.number_Account,
            amount: req.body.amount,
            currency: req.body.currency,
            typeAccount: beneficiary.typeAccount,
        })

        newTransfer = await newTransfer.save()

        return res.status(200).send({message: 'Se realizo el deposito correctamente.', newTransfer})

    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'No se pudo completar la tarea. Error en el servidor'})        
    }
}

exports.getMovementHistory = async (req, res) => {
    try {
      // Obtener el ID del usuario autenticado desde el req.user proporcionado por el middleware validateJWT
      const userId = req.user._id;
  
      // Comprobar que el usuario exista en la base de datos
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado en la base de datos.' });
      }
  
      // Obtener el historial de movimientos del usuario
      const movements = await Transfer.find({ beneficiary: user.number_Account });
  
      return res.status(200).json({ message: 'Historial de movimientos obtenido exitosamente.', movements });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor al obtener el historial de movimientos.' });
    }
  };