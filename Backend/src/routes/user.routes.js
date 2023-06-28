'use strict'

const {Router} = require('express');
const { check } = require('express-validator')

const {validateJWT} = require('../middlewares/validate-jwt')
const { validateParams } = require('../middlewares/validate-params')

const {createUser, login, viewAllUsers, updateUser, viewOwnUser, updateOwnUser} = require('../controller/user.controller');
const { administradorRol } = require('../middlewares/validate-rol');

const api = Router();

//---- Login
api.post('/login', [

    check('userName', 'El parametro userName es necesario para iniciar sesion.').not().isEmpty(),
    check('password', 'El parametro password es necesario para iniciar sesion.').not().isEmpty(),
    validateParams
    
],login)
// *******************************Funciones de ADMINISTRADOR *******************************************
// ------ Crear usuario
api.post('/add-user', [
    validateJWT,

    administradorRol,

    check('rol', 'El parametro rol es necesario para crear la cuenta').not().isEmpty(),
    
    check('name', 'El parametro name es necesario para crear la cuenta').not().isEmpty(),
    
    check('userName', 'El parametro userName es necesario para crear la cuenta').not().isEmpty(),
    
    check('typeAccount', 'El parametro typeAccount es necesario para crear la cuenta').not().isEmpty(),
    
    check('DPI', 'El parametro DPI debe tener 13 digitos para crear la cuenta').isLength({min: 13, max: 13}),
    
    check('address', 'El parametro address es necesario para crear la cuenta').not().isEmpty(),
    
    check('phoneNumber', 'El parametro phoneNumber es necesario para crear la cuenta').not().isEmpty(),    
    
    check('email', 'El parametro email es necesario para crear la cuenta').not().isEmpty(),    
    
    check('password', 'El parametro password debe tener al menos 6 digitos para crear la cuenta').isLength({min: 6}),
    
    check('workName', 'El parametro workName es necesario para crear la cuenta').not().isEmpty(),    

    //Los parametros para ver si su ingreso mensual es mayor a Q100.00 sin importar que moneda se use al crear la cuenta

    //Que tipo de moneda va usar para abrir la cuenta
    check('currency', 'El parametro currency es necesario para crear la cuenta').not().isEmpty(),
    //Que cantidad de la moneda va usar
    check('monthlyIncome', 'El parametro monthlyIncome es necesario para crear la cuenta').not().isEmpty(),
    
    validateParams
],createUser);

//Ver todos los usuarios, restringido a los administradores
api.get('/allUsers', [
    validateJWT,
    administradorRol
], viewAllUsers)

//Editar usuario por id (este se tiene que mandar en el body)
api.put('/updateUser', [
    validateJWT,
    administradorRol,
    check('idUser', 'El parametro "idUser" es necesario para actualizar el usuario. ').not().isEmpty(),
    validateParams
], updateUser)

// *******************************Funciones de CLIENTE *******************************************

//Ver perfil propio
api.get('/viewOwnUser', [
    validateJWT
], viewOwnUser)

//Editar propio perfil
api.put('/updateOwnUser', [
    validateJWT
], updateOwnUser)

module.exports = api