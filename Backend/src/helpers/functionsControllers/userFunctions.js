"use strict";

const axios = require('axios')
const bcrypt = require('bcrypt')

const userModel = require("../../models/user.model");

//Comprobar que un usuario exista
exports.userExists = async (idUser) =>{
  try {
    
    const userFind = await userModel.findById(idUser)
    if(!userFind) return false
    return userFind

  } catch (error) {
    console.error(error);
  }
}

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

    if(response < 100){
      return false;
    }else{
      return parseFloat(response);
    }
    
  } catch (error) {
    console.error(error);
  }
}

//Comprobar que el alias no sea uno repetido, y si es repetido solo va ser agregado al arreglo si el id no es el mismo
exports.checkAliasRepeted = (favorites , alias , idFavorite) =>{
  const repetedAlias = favorites.filter( favorito => favorito.alias == alias)
  
  if( repetedAlias.length && JSON.stringify(repetedAlias[0]._id) != `"${idFavorite}"` ) return repetedAlias[0]
  else  return false
}