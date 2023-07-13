'use strict'

const User = require('../../models/user.model')
const Transfer = require('../../models/transfer.model');
const { convertCurrencies } = require('./userFunctions');

//Comprobar que una cuenta exista 
exports.accountExist = async(numberAccount) => {
    const findAccount = await User.findOne({number_Account: numberAccount});

    if(!findAccount) return false 
    return findAccount;

}

//Comprobar que un monto no pase los Q1000.00
exports.checkAmountTransfer = async( base , quantity ) => {
    try {
        
        let response = await convertCurrencies(base , 'GTQ' , quantity)
        console.log(response);
        if( response > 10000 ) return false;
        return response;

    } catch (error) {
        console.error(error);
    }
}

//Comprobar que el remitente tenga suficiente dinero en su cuenta
exports.checkSenderBalance = async( currencySender , accountBalance , amount , currency ) => {
    try {
        
        //Cambiar el monto a lo equivalente en la moneda del remitente
        const amountSenderCurrency = await convertCurrencies( currency , currencySender , amount )
        
        console.log("amountSenderCurrency", amountSenderCurrency)
        console.log("accountBalance", accountBalance)
        console.log(amountSenderCurrency > accountBalance)
        
        return amountSenderCurrency >  accountBalance

    } catch (error) {
        console.error(error);
    }
}

//Calcular el nuevo saldo de la cuenta del remitente
exports.calculateAmountBalance = async( currencyAccount , amountTransfer , currencyTransfer ) =>{
    try {
        
        const newAmountBalance = await convertCurrencies( currencyTransfer , currencyAccount , amountTransfer )

        return parseFloat(newAmountBalance)

    } catch (error) {
        console.error(error);
    }
}