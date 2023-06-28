'use strict'

const bcrypt = require('bcrypt')

const { repeatUser, genereteNumberAccount, checkSalaryNeeded, convertCurrencies, encryptPassword } = require('../helpers/functionsControllers/userFunctions');
const UserSchema = require('../models/user.model');
const { generateJWT } = require('../helpers/create-jwt');

// *******************************Funciones de ADMINISTRADOR *******************************************

// ----------------------- Crear usuario -----------------------------------
exports.createUser = async(req, res) => {
    try {
        let newUser = new UserSchema(req.body);

        const {userName, password, currency, monthlyIncome} = req.body;

        if ( await repeatUser(userName) ) 
        return res.status(400).send({message: 'Ya existe un usuario con este userName'})

        //Obtener el salario mensual
        const checkSalary = await checkSalaryNeeded( currency , monthlyIncome );

        if( ! checkSalary ) 
        return res.status(400).send({message: 'El usuario debe tener un ingreso mensual de almenos Q100.00 (cien quetzales guatemaltecos) para abrir una cuenta.'})
        
        //Asignar los valores al nuevo usuario 

        newUser.number_Account = await genereteNumberAccount();
        newUser.password = encryptPassword(password);
        newUser.monthlyIncome = monthlyIncome;

        //Guardar el nuevo usuario
        newUser = await newUser.save()

        return res.status(200).send({message: `Se ha creado el usuario correctamente.` , newUser})
        

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se pudo completar la tarea.'})
    }
}

//Ver todos los usuarios
exports.viewAllUsers = async(req, res)=>{
    try {
        
        const allUsers = await UserSchema.find();

        if(allUsers.length == 0) return res.status(404).send({message: 'No se han encontrado usuarios en la base de datos.'});

        return res.status(200).send({message: 'Usuarios encontrados', allUsers});

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se pudo completar la tarea.'})
    }
}

//Actualizar usuarios
exports.updateUser = async(req, res)=>{
    try {
        
        const idUser = req.body.idUser;
        const findUser = await UserSchema.findById(idUser);

        //Comprobaciones antes de actualizar el usuario
        if(!findUser) return res.status(404).send({message: 'No se ha encontrado el usuario en la base de datos.'});
        if(findUser.rol == 'ADMINISTRADOR') return res.status(400).send({message: 'El usuario ingresado es un administrador, no se permiten cambios a este usuario.'})

        const checkUserName = await repeatUser(req.body.userName);
        if( checkUserName && checkUserName._id !== findUser._id ) return res.status(400).send({message: 'El nombre de usuario ya esta en uso.'});

        let updateUser = new UserSchema(req.body);
        delete updateUser._doc.number_Account;
        delete updateUser._doc._id

        //Eliminar datos por si no vienen en la peticion
        !updateUser.numberOfTransactions && delete updateUser._doc.numberOfTransactions
        !updateUser.favorites && delete updateUser._doc.favorites

        //Evitar que se actualice el DPI y el password
        updateUser.password = findUser.password;
        updateUser.DPI = findUser.DPI;    

        //Encriptar la contrasenia solo si viene
        if(req.body.password) updateUser.password = encryptPassword(req.body.password)

        //Si el usuario quiere cambiar el tipo de moneda
        if( updateUser.currency && findUser.currency !== updateUser.currency ){

            //Convertir su anterior sueldo a la moneda actual
            updateUser.monthlyIncome = await convertCurrencies( findUser.currency, updateUser.currency, findUser.monthlyIncome )

            //Convertir el dinero que tenia la cuenta a la nueva moneda
            if(findUser.accountBalance > 0)
            updateUser.accountBalance = await convertCurrencies( findUser.currency, updateUser.currency, findUser.accountBalance );

        }else{
            updateUser.accountBalance = findUser.accountBalance;
        }

        //Si se ha cambiado el salario se comprueba que gana mas de Q100.00
        if( req.body.monthlyIncome ){

            //Para este proceso se va guardan en una variable el tipo de moneda para verificar el salario.
            //Si la peticion se envia el currency, la varible 'currencyToUse' tomara el valor desde el usuario actualizado.
            //Si no se envia el currency, la variable 'currencyToUse' tomara el valor del usuario encontrado.\

            let currencyToUse;
            req.body.currency ? currencyToUse = req.body.currency : currencyToUse = findUser.currency;
                
            const newMonthlyIncome = await checkSalaryNeeded(currencyToUse, updateUser.monthlyIncome);
            
            if(!newMonthlyIncome) 
            return res.status(400).send({message: 'El nuevo salario del usuario no es mayor a Q100.00. No se posible actualizar la cuenta'});

            updateUser.monthlyIncome = req.body.monthlyIncome

        }

        const userUpdatedSuccessfully = await UserSchema.findByIdAndUpdate(
            {_id: idUser}, 
            {...updateUser}, 
            {
                new: true
            }
        );        

        if(!userUpdatedSuccessfully) return res.status(400).send({message: 'No se ha podido actualizar el usuario.'});

        return res.status(200).send({message: 'Se ha actualizado el usuario correctamente.', updateUser});


    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se pudo completar la tarea.'})
    }
}

//Eliminar un usuario
exports.deleteUser = async(req, res)=>{
    try {
        
        const findUser = await UserSchema.findById(req.body.idUser);

        //Comprobar que el usuario existe
        if(!findUser) 
        return res.status(404).send({message: 'No se ha encontrado el usuario.'});

        //Comprobar que el usuario no sea un administrador
        if(findUser.rol == 'ADMINISTRADOR') 
        return res.status(400).send({message: 'El usuario que se trata de eliminar es un ADMINISTRADOR, esta accion no esta permita en este tipo de usuarios.'});

        const userDeleteSuccessfully = await UserSchema.findByIdAndDelete(findUser._id);
        if( !userDeleteSuccessfully ) 
        return res.status(400).send({message: 'No se ha podido eliminar el usuario'})

        return res.status(200).send({message: 'Usuario eliminado correctamente.', userDeleteSuccessfully});

    } catch (error) {
        console.error(error);
    }
}

// *******************************Funciones de CLIENTE *******************************************
//Ver mi perfil
exports.viewOwnUser = async(req, res) =>{
    try {
        
        const idUser = req.user._id;

        //Comprobar que el usuario exista
        const user = await UserSchema.findById(idUser);
        if(!user) return res.status(404).send({message: 'No se encontro el usuario en la base de datos.'});

        //Retornar el usuario 
        return res.status(200).send({message: 'Usuario encontrado.', user})

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se pudo completar la tarea.'})
    }
}

//Editar mi perfil
exports.updateOwnUser = async(req, res) => {
    try {
        
        const id = req.user._id;

        const findUser = await UserSchema.findById(id);

        //Comprobaciones antes de actualizar el usuario
        if(!findUser) return res.status(404).send({message: 'No se ha encontrado el usuario en la base de datos.'});

        let updateUser = new UserSchema(req.body);
        //Eliminar todos los datos que el usuario no puede actualizar de su propia cuenta.
        delete updateUser._doc.number_Account;
        delete updateUser._doc._id
        delete updateUser._doc.userName
        delete updateUser._doc.address
        delete updateUser._doc.DPI
        delete updateUser._doc.workName
        delete updateUser._doc.monthlyIncome

        //Eliminar datos por si no vienen en la peticion, asi evitar que se sobreescriban a los datos reales
        !updateUser.numberOfTransactions && delete updateUser._doc.numberOfTransactions
        !updateUser.favorites && delete updateUser._doc.favorites

        //Encriptar la contrasenia solo si viene
        if(req.body.password) updateUser.password = encryptPassword(req.body.password)

        const userUpdatedSuccessfully = await UserSchema.findByIdAndUpdate(
            {_id: id}, 
            {...updateUser}, 
            {
                new: true
            }
        );        

        if(!userUpdatedSuccessfully) return res.status(400).send({message: 'No se ha podido actualizar el usuario.'});

        return res.status(200).send({message: 'Se ha actualizado el usuario correctamente.', updateUser});

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se pudo completar la tarea.'})
    }
}


// ----------------------- Login -----------------------------------

exports.login = async (req, res)=>{
    try {
        
        const {userName, password} = req.body

        const findUser = await UserSchema.findOne({userName: userName});
        if(!findUser) return res.status(404).send({message: `No se ha encontrado ningun usuario con el nombre: ${userName}`});

        const correctPassword = bcrypt.compareSync(
            password, 
            findUser.password
        )
        if(!correctPassword) return res.status(400).send({message: 'Contraseña incorrecta.'})

        const token = await generateJWT(findUser._id, findUser.userName, findUser.email)

        res.status(200).json({
            ok: true,
            UserID: findUser._id,
            UserName: findUser.userName,
            Email: findUser.email,
            message: 'Usuario logueado correctamente.',
            token: token,
        })

    } catch (error) {
        console.error(error);
    }
}

// ----------------------- Administrador por defecto -----------------------------------

exports.adminDefault = async() =>{
    try {
        
        const userFind = await UserSchema.find();

        if(userFind.length !== 0) return 

        let _adminDefault = new UserSchema();

        _adminDefault.rol = 'ADMINISTRADOR'
        _adminDefault.name = 'Aministrador por defecto'
        _adminDefault.userName = 'ADMINB'
        //Solo este usuario tendra una cuenta no generada de manera aleatoria
        _adminDefault.number_Account = 111111111;
        _adminDefault.typeAccount = 'Cuenta corriente';
        _adminDefault.DPI = 111111111;
        _adminDefault.address = '...Guatemala';
        _adminDefault.phoneNumber = '1111-1111';
        _adminDefault.email = 'ADMINB@gmail.com';
        _adminDefault.password = encryptPassword('ADMINB');
        _adminDefault.workName = 'Administrador de banco';
        _adminDefault.monthlyIncome = 101;
        _adminDefault.accountBalance = 101;

        _adminDefault = await _adminDefault.save()

        console.log(`Usuario por defecto creado correctamente, datos del usuario por defecto: ${_adminDefault}`);

    } catch (error) {
        console.error(error);
    }
}