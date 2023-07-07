
const {Router} = require('express');
const api = Router();
const {check} = require('express-validator');

const {validateJWT} = require('../middlewares/validate-jwt');
const {validateParams} = require('../middlewares/validate-params')

const { createTransfer } = require('../controller/transfer.controller')

api.post('/transfer', [
    validateJWT,
    check('beneficiary', 'El parametro "beneficiary" es necesario para realizar la transferencia.').not().isEmpty(),
    check('typeAccount', 'El parametro "typeAccount" es necesario para realizar la transferencia.').not().isEmpty(),
    check('amount', 'El parametro "amount" es necesario para realizar la transferencia.').not().isEmpty(),
    check('currency', 'El parametro "currency" es necesario para realizar la transferencia.').not().isEmpty(),
    validateParams
], createTransfer)

module.exports = api

