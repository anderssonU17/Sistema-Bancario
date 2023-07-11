'use strict'

const { accountExist, checkAmountTransfer, checkSenderBalance, calculateSenderBalance, calculateAmountBalance } = require('../helpers/functionsControllers/transaferFunctions')
const { userExists } = require('../helpers/functionsControllers/userFunctions')
const Transfer = require('../models/transfer.model')
const User = require('../models/user.model')

exports.createTransfer = async(req, res)=> {
    try {
        
        //Obtener los datos de quien envia y de quien recibe
        const { beneficiary, typeAccount , amount , currency } = req.body

        //Comprobar que ambas cuentas existan
        const userSender = await userExists(req.user._id)
        if(!userSender) return res.status(404).send({message: 'Su cuenta no existe en la base de datos.'});

        const accoundBeneficiary = await accountExist(beneficiary)
        if(!accoundBeneficiary) return res.status(404).send({message: 'No se encontro la cuenta del beneficiario en la base de datos.'})

        //Comprobar que el tipo de cuenta que se haya enviado por parte del remitente sea el mismo
        if( typeAccount != accoundBeneficiary.typeAccount ) return res.status(400).send({message: 'Error al enviar los datos de la cuenta beneficiaria.'})

        //Comprobar que la transferenia que se quiere hacer no pase los Q1000.00
        if( ! checkAmountTransfer( currency , amount ) ) return res.status(400).send({message: 'El monto de la transferencia sobre pasa lo permitido por el banco.'})

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
        newAccoundBalanceBeneficiary = accoundBeneficiary.accountBalance + newAccoundBalanceBeneficiary

        const newAccoundBeneficiary = await User.findOneAndUpdate(
            {_id: accoundBeneficiary._id},
            { accountBalance: newAccoundBalanceBeneficiary },
            {new: true}
        )

        if( !newUserSender ) return res.status(404).send({message: 'No se pudo acutalizar el saldo de la cuenta del remitente.'})
        if( !newAccoundBeneficiary ) return res.status(404).send({message: 'No se pudo acutalizar el saldo de la cuenta del beneficiario.'});

        //Crear la transferencia y gurdarla en la base de datos
        const newTransfer = new Transfer({
            beneficiary: accoundBeneficiary._id,
            sender: userSender._id,
            typeAccount: accoundBeneficiary.typeAccount,
            amount: amount,
            currency: currency,
            movementType: typeAccount,
        })


        return res.status(200).send({message: 'Se realizo la transfernecia correctamente.' , newTransfer});

    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'No se pudo completar la tarea. Error en el servidor'})        
    }
}

exports.createDepositi = (req, res)=> {
    try {
        
        

    } catch (error) {
        console.error(object);
        return res.status(500).send({message: 'No se pudo completar la tarea. Error en el servidor'})        
    }
}