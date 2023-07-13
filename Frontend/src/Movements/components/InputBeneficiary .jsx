import React, { useState } from "react";
import Swal from "sweetalert2";
import "../../assets/css/inputBeneficiary.css";
import { deposit, transfer } from "../api/apiMovements";
import { useNavigate } from "react-router";

export const InputBeneficiary = (props) => {
  const navigate = useNavigate();

  const [accountNumber, setAccountNumber] = useState("");
  const [typeAccount, setTypeAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const handleTypeAccountChange = (event) => {
    setTypeAccount(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleCancelClick = () => {
    navigate("/start");
  };

  const checkParams = (action) => {
    if (
      !accountNumber ||
      !typeAccount ||
      !amount ||
      !currency
    ) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Por favor, completa todos los campos antes de continuar.",
      });
      return;
    } else {
      const data = {
        beneficiary: accountNumber,
        typeAccount: typeAccount,
        amount: amount,
        currency: currency,
      };
      console.log(data);
      fetchAction(data, action)
    }
  };

  const fetchAction = (data, action) => {
    switch (action) {
      case "deposito":
        deposit(data)
        break;
      case "transferencia":
        transfer(data);
        break;
      // Otros casos
    }
  };

  return (
    <>
      <h2 className="title-action">Datos para {props.action}</h2>
      <div className="action-container">
        <div>
          <div className="section-action">
            <label className="swal2-label">
              Numero de cuenta de destinatario:
            </label>
            <input
              className="swal2-input"
              type="number"
              value={accountNumber}
              onChange={handleAccountNumberChange}
            />
          </div>
          <div className="section-action">
            <label className="swal2-label">Tipo de cuenta:</label>
            <select
              id="typeAccount"
              className="swal2-select"
              value={typeAccount}
              onChange={handleTypeAccountChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="Monetaria ">Monetaria</option>
              <option value="Cuenta corriente">Cuenta corriente</option>
              <option value="Ahorro">Ahorro</option>
              <option value="Depósito ">Depósito </option>
              <option value="Nómina ">Nómina </option>
              <option value="Inversión ">Inversión </option>
            </select>
          </div>
          <div className="section-action">
            <label className="swal2-label">Monto de {props.action}:</label>
            <input
              id="amount"
              className="swal2-input"
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div className="section-action">
            <label className="swal2-label">Moneda para {props.action}:</label>
            <select
              className="swal2-select"
              id="currency"
              value={currency}
              onChange={handleCurrencyChange}
            >
              <option value="">Selecciona una moneda</option>
              <option value="AED">AED - Dirham</option>
              <option value="ARS">ARS - Peso argentino</option>
              <option value="AUD">AUD - Dólar australiano</option>
              <option value="BGN">BGN - Lev búlgaro</option>
              <option value="BRL">BRL - Real brasileño</option>
              <option value="BSD">BSD - Dólar bahameño</option>
              <option value="CAD">CAD - Dólar canadiense</option>
              <option value="CHF">CHF - Franco suizo</option>
              <option value="CLP">CLP - Peso chileno</option>
              <option value="CNY">CNY - Yuan chino</option>
              <option value="COP">COP - Peso colombiano</option>
              <option value="CZK">CZK - Corona checa</option>
              <option value="DKK">DKK - Corona danesa</option>
              <option value="DOP">DOP - Peso dominicano</option>
              <option value="EGP">EGP - Libra egipcia</option>
              <option value="EUR">EUR - Euro</option>
              <option value="FJD">FJD - Dólar fiyiano</option>
              <option value="GBP">GBP - Libra esterlina</option>
              <option value="GTQ">GTQ - Quetzal guatemalteco</option>
              <option value="HKD">HKD - Dólar de Hong Kong</option>
              <option value="HRK">HRK - Kuna croata</option>
              <option value="HUF">HUF - Florín húngaro</option>
              <option value="IDR">IDR - Rupia indonesia</option>
              <option value="ILS">ILS - Shekel israelí</option>
              <option value="INR">INR - Rupia india</option>
              <option value="ISK">ISK - Corona islandesa</option>
              <option value="JPY">JPY - Yen japonés</option>
              <option value="KRW">KRW - Won surcoreano</option>
              <option value="KZT">KZT - Tenge kazajo</option>
              <option value="MXN">MXN - Peso mexicano</option>
              <option value="MYR">MYR - Ringgit malayo</option>
              <option value="NOK">NOK - Corona noruega</option>
              <option value="NZD">NZD - Dólar neozelandés</option>
              <option value="PAB">PAB - Balboa panameño</option>
              <option value="PEN">PEN - Sol peruano</option>
              <option value="PHP">PHP - Peso filipino</option>
              <option value="PKR">PKR - Rupia pakistaní</option>
              <option value="PLN">PLN - Złoty polaco</option>
              <option value="PYG">PYG - Guaraní paraguayo</option>
              <option value="RON">RON - Leu rumano</option>
              <option value="RUB">RUB - Rublo ruso</option>
              <option value="SAR">SAR - Riyal saudí</option>
              <option value="SEK">SEK - Corona sueca</option>
              <option value="SGD">SGD - Dólar de Singapur</option>
              <option value="THB">THB - Baht tailandés</option>
              <option value="TRY">TRY - Lira turca</option>
              <option value="TWD">TWD - Nuevo dólar taiwanés</option>
              <option value="UAH">UAH - Grivna ucraniana</option>
              <option value="USD">USD - Dólar estadounidense</option>
              <option value="UYU">UYU - Peso uruguayo</option>
              <option value="VND">VND - Dong vietnamita</option>
              <option value="ZAR">ZAR - Rand sudafricano</option>
            </select>
          </div>
          <div className="button-action">
            <button
              className="conffirm-button"
              onClick={() => checkParams(props.action)}
            >
              Hacer {props.action}
            </button>
            <button className="cancel-button" onClick={handleCancelClick}>
              Cancelar {props.action}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
