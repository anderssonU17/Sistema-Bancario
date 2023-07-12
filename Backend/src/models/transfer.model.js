'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransferSchema = new Schema({
    movementType: {
        type: String,
        enum: ['TRANSFERENCIA', 'COMPRA', 'CREDITO', 'DEPOSITO'],
        require: true
    },
    date: {
        require: true,
        type: Date,
        default: new Date()
    },
    amount: {
        require: true,
        type: Number
    },
    currency: {
        require: true,
        type: String
    },
    sender: {
        //Se retira el necesario por si lo que se hace es un deposito
        // require: true, 
        type: String
    },
    beneficiary: {
        require: true,
        type: Number
    },
    //El tipo de cuenta del beneficiario
    typeAccount: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('Transfers', TransferSchema)