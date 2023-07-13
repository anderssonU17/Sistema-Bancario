
const {Router} = require('express');
const api = Router();
const {check} = require('express-validator');

const {validateJWT} = require('../middlewares/validate-jwt');
const {validateParams} = require('../middlewares/validate-params')

const { createTransfer, createDeposit, getMovementHistory} = require('../controller/transfer.controller');
const { administradorRol } = require('../middlewares/validate-rol');

api.post('/transfer', [
    validateJWT,
    check('movementType', 'El parametro "movementType" es necesario para realizar la transferencia.').not().isEmpty(),
    check('beneficiary', 'El parametro "beneficiary" es necesario para realizar la transferencia.').not().isEmpty(),
    check('typeAccount', 'El parametro "typeAccount" es necesario para realizar la transferencia.').not().isEmpty(),
    check('amount', 'El parametro "amount" es necesario para realizar la transferencia.').not().isEmpty(),
    check('currency', 'El parametro "currency" es necesario para realizar la transferencia.').not().isEmpty(),
    validateParams
], createTransfer)

api.post('/deposit',[
    validateJWT,
    administradorRol,
    check('beneficiary', 'El parametro "beneficiary" es necesario para realizar la transferencia.').not().isEmpty(),
    check('typeAccount', 'El parametro "typeAccount" es necesario para realizar la transferencia.').not().isEmpty(),
    check('amount', 'El parametro "amount" es necesario para realizar la transferencia.').not().isEmpty(),
    check('currency', 'El parametro "currency" es necesario para realizar la transferencia.').not().isEmpty(),
    validateParams
], createDeposit )

api.get('/movement',[
    validateJWT,
], getMovementHistory )

module.exports = api


