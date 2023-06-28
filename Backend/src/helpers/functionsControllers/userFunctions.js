"use strict";

const axios = require('axios')
const bcrypt = require('bcrypt')

const userModel = require("../../models/user.model");


//Generar un numero aleatorio de 10 digitos
exports.genereteNumberAccount = async () => {
  try {
    let numberAccountFind = false;
    let newNumberAccount;
    do {

      newNumberAccount = Math.floor(Math.random() * 1000000000);

      //Buscar si ya existe este numero de cuenta
      numberAccountFind = await userModel.findOne({
        number_Account: newNumberAccount,
      });

    } while (numberAccountFind);

    return newNumberAccount;

  } catch (error) {
    console.error(error);
  }
};

//Comprobar si el userName ya existe

exports.repeatUser = async (userName) => {
  try {
    const userFind = await userModel.findOne({ userName: userName });

    return userFind;

  } catch (error) {
    console.error(error);
  }
};

//Ecriptar password
exports.encryptPassword = (password) =>{
  try {
    
    const saltos = bcrypt.genSaltSync();
    const encryptado = bcrypt.hashSync(password, saltos)
    return encryptado;

  } catch (error) {
    console.error(error);
  }
}

//Convertir moneda a otra

exports.convertCurrencies = async(base, rate, quantity)=>{
  try {
    
    let response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${base}`);

    response = response.data.rates[rate];
    console.log(`Lo que nos respondio el conversor de ${base} a ${rate}`);
    console.log(response);

    return parseFloat(response) * parseFloat(quantity)

  } catch (error) {
    console.error(error);
  }
}

//Comprobar que el salario sea mayor a 100 quetzales

exports.checkSalaryNeeded = async(base, quantity) => {
  try {
    
    let response = await this.convertCurrencies(base, 'GTQ', quantity)
    console.log(`Conviertiendo ${base} ${quantity} a quetzales`);
    console.log(response);

    if(response < 100){
      return false;
    }else{
      return response;
    }
    
  } catch (error) {
    console.error(error);
  }
}