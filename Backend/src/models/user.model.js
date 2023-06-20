'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    rol:{
        type: String,
        enum: ['CLIENTE', 'ADMINISTRADOR'],
        require: true
    },
    name:{
        require: true,
        type: String
    },
    userName: {
        require: true,
        type: String
    },
    number_Account: {
        require: true,
        type: Number
    }, 
    typeAccount: {
        require: true,
        type: String
    },
    DPI: {
        require: true,
        type: Number
    },
    address: {
        require: true,
        type: String
    },
    phoneNumber: {
        require: true,
        type: String
    },
    email:{
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    workName:{
        require: true,
        type: String
    },
    monthlyIncome: {
        require: true,
        type: Number,
    },
    accountBalance: {
        type: Number,
        default: 0
    },
    favorites: [
        {
            number_Account: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            typeAccount: {
                require: true,
                type: String
            },
            alis: {
                type: String
            }

        }
    ]
})

module.exports = mongoose.model('Users', UserSchema)