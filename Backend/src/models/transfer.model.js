'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransferSchema = new Schema({
    movementType: {
        type: String,
        enum: ['TRANSFERENCIA', 'COMPRA', 'CREDITO'],
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
    sender: {
        require: true,
        type: Number
    },
    beneficiary: {
        require: true,
        type: Number
    }
})

module.exports = mongoose.model('Transfers', TransferSchema)