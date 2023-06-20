'use strict'

const bcrypt = require('bcrypt')

const { repeatUser, genereteNumberAccount, checkSalaryNeeded, convertCurrencies, encryptPassword } = require('../helpers/functionsControllers/userFunctions');
const UserSchema = require('../models/user.model');
const { generateJWT } = require('../helpers/create-jwt');


// ----------------------- Crear usuario -----------------------------------
exports.createUser = async(req, res) => {
    try {
        let newUser = new UserSchema(req.body);

        const {userName, password, base, rate, quantity} = req.body;

        if ( await repeatUser(userName) ) 
        return res.status(400).send({message: 'Ya existe un usuario con este userName'})

        //Obtener el salario mensual
        const monthlyIncome = await checkSalaryNeeded( base, quantity );

        if( ! monthlyIncome ) 
        return res.status(400).send({message: 'El usuario debe tener un ingreso mensual de almenos Q100.00 para abrir una cuenta.'})
        
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