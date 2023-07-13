import Swal from "sweetalert2";
import { editUser } from "../api/startAdmin";

let newUser;

export const updateUserModal = (oldUser, setUsers) => {
  console.log(oldUser);
  const newHtml = html(oldUser);
  Swal.fire({
    title: "Actualizar usuario",
    html: newHtml,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    confirmButtonColor: "#88DC65",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "tomato",
    preConfirm: () => {
      let user = {};
      user._id = oldUser._id;
      user.rol = document.getElementById("rol").value;
      user.name = document.getElementById("name").value;
      user.userName = document.getElementById("userName").value;
      user.typeAccount = document.getElementById("typeAccount").value;
      user.DPI = document.getElementById("DPI").value;
      user.address = document.getElementById("address").value;
      user.phoneNumber = document.getElementById("phoneNumber").value;
      user.email = document.getElementById("email").value;
      user.password = document.getElementById("password").value;
      user.workName = document.getElementById("workName").value;
      user.monthlyIncome = document.getElementById("monthlyIncome").value;
      user.accountBalance = document.getElementById("accountBalance").value;
      user.currency = document.getElementById("currency").value;

      if (!checkParams(user)) {
        return false;
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      editUser(newUser, setUsers);
    }
  });
};

//Comprobar que todos los datos se hayan enviado
const checkParams = (user) => {
  const paramsVoid = checkObjectAttributesNotEmpty(user);
  console.log('Datos para actualizar: ');
  console.log(user);

  if (!paramsVoid) {
    Swal.fire({
      title: "Error.",
      text: "Error, debes llenar todos los parámetros",
      icon: "error",
      confirmButtonText: "ok",
    });
    return false;
  } else {
    newUser = user;
    return newUser;
  }
};

function checkObjectAttributesNotEmpty(obj) {
  for (let key in obj) {
    if (!obj[key]) {
      if (key === "DPI" && obj[key].length !== 13) {
        Swal.fire({
          title: "Error.",
          text: "El DPI debe tener 13 dígitos",
          icon: "error",
          confirmButtonText: "ok",
        });
      } else if (key === "password" && obj[key].length < 6) {
        Swal.fire({
          title: "Error.",
          text: "La contraseña debe tener al menos 6 caracteres",
          icon: "error",
          confirmButtonText: "ok",
        });
      }
      return false;
    }
  }
  return true;
}

const html = (oldUser) => {
  console.log("El usuairo recivido es");
  console.log(oldUser);
  return `
  <label class="swal2-label">Rol<label/>
  <br/>
  <select id="rol" class="swal2-select">
    <option value="" >Seleccione una opción</option>
    <option value="ADMINISTRADOR" ${
      oldUser.rol === "ADMINISTRADOR" ? "selected" : ""
    } >ADMINISTRADOR</option>
    <option value="CLIENTE" ${
      oldUser.rol === "CLIENTE" ? "selected" : ""
    } >CLIENTE</option>
  </select>
  <br/>
  <label class="swal2-label">Nombre<label/>
  <br/>
  <input id="name" class="swal2-input" placeholder="name" value="${
    oldUser.name || ""
  }">
  <br/>
  <label class="swal2-label">Sobrenombre<label/>
  <br/>
  <input id="userName" class="swal2-input" placeholder="userName" value="${
    oldUser.userName || ""
  }">
  <br/>
  <label class="swal2-label">Tipo de cuenta<label/>
  <br/>
  <input id="typeAccount" class="swal2-input" placeholder="typeAccount" value="${
    oldUser.typeAccount || ""
  }">
  <br/>
  <label class="swal2-label">DPI<label/>
  <br/>
  <input id="DPI" class="swal2-input" type="number" placeholder="DPI" value="${
    oldUser.DPI || ""
  }" readOnly >
  <br/>
  <label class="swal2-label">Direccion<label/>
  <br/>
  <input id="address" class="swal2-input" placeholder="address" value="${
    oldUser.address || ""
  }">
  <br/>
  <label class="swal2-label">Telefono<label/>
  <br/>
  <input id="phoneNumber" class="swal2-input" type="number" placeholder="phoneNumber" value="${
    oldUser.phoneNumber || ""
  }">
  <br/>
  <label class="swal2-label">Correo<label/>
  <br/>
  <input id="email" class="swal2-input" placeholder="email" value="${
    oldUser.email || ""
  }">
  <br/>
  <label class="swal2-label">Contraseña<label/>
  <br/>
  <input id="password" class="swal2-input" placeholder="password" disable value="${
    oldUser.password || ""
  }" readOnly>
  <br/>
  <label class="swal2-label">Trabajo<label/>
  <br/>
  <input id="workName" class="swal2-input" placeholder="workName" value="${
    oldUser.workName || ""
  }">
  <br/>
  <label class="swal2-label">Salario<label/>
  <br/>
  <input id="monthlyIncome" class="swal2-input" type="number" placeholder="monthlyIncome" value="${
    oldUser.monthlyIncome || ""
  }">
  <br/>
  <label class="swal2-label">Saldo<label/>
  <br/>
  <input id="accountBalance" class="swal2-input" type="number" placeholder="accountBalance" value="${
    oldUser.accountBalance || ""
  }">
  <br/>
  <!-- ============================> Monedas<=================================================== -->
  <label class="swal2-label">Moneda<label/>
  <br/>
  <select id="currency" class="swal2-select">
      <option value="">Selecciona una moneda</option>
      <option value="AED" ${
        oldUser.currency === "AED" ? "selected" : ""
      }>AED - Dirham</option>
      <option value="ARS" ${
        oldUser.currency === "ARS" ? "selected" : ""
      }>ARS - Peso argentino</option>
      <option value="AUD" ${
        oldUser.currency === "AUD" ? "selected" : ""
      }>AUD - Dólar australiano</option>
      <option value="BGN" ${
        oldUser.currency === "BGN" ? "selected" : ""
      }>BGN - Lev búlgaro</option>
      <option value="BRL" ${
        oldUser.currency === "BRL" ? "selected" : ""
      }>BRL - Real brasileño</option>
      <option value="BSD" ${
        oldUser.currency === "BSD" ? "selected" : ""
      }>BSD - Dólar bahameño</option>
      <option value="CAD" ${
        oldUser.currency === "CAD" ? "selected" : ""
      }>CAD - Dólar canadiense</option>
      <option value="CHF" ${
        oldUser.currency === "CHF" ? "selected" : ""
      }>CHF - Franco suizo</option>
      <option value="CLP" ${
        oldUser.currency === "CLP" ? "selected" : ""
      }>CLP - Peso chileno</option>
      <option value="CNY" ${
        oldUser.currency === "CNY" ? "selected" : ""
      }>CNY - Yuan chino</option>
      <option value="COP" ${
        oldUser.currency === "COP" ? "selected" : ""
      }>COP - Peso colombiano</option>
      <option value="CZK" ${
        oldUser.currency === "CZK" ? "selected" : ""
      }>CZK - Corona checa</option>
      <option value="DKK" ${
        oldUser.currency === "DKK" ? "selected" : ""
      }>DKK - Corona danesa</option>
      <option value="DOP" ${
        oldUser.currency === "DOP" ? "selected" : ""
      }>DOP - Peso dominicano</option>
      <option value="EGP" ${
        oldUser.currency === "EGP" ? "selected" : ""
      }>EGP - Libra egipcia</option>
      <option value="EUR" ${
        oldUser.currency === "EUR" ? "selected" : ""
      }>EUR - Euro</option>
      <option value="FJD" ${
        oldUser.currency === "FJD" ? "selected" : ""
      }>FJD - Dólar fiyiano</option>
      <option value="GBP" ${
        oldUser.currency === "GBP" ? "selected" : ""
      }>GBP - Libra esterlina</option>
      <option value="GTQ" ${
        oldUser.currency === "GTQ" ? "selected" : ""
      }>GTQ - Quetzal guatemalteco</option>
      <option value="HKD" ${
        oldUser.currency === "HKD" ? "selected" : ""
      }>HKD - Dólar de Hong Kong</option>
      <option value="HRK" ${
        oldUser.currency === "HRK" ? "selected" : ""
      }>HRK - Kuna croata</option>
      <option value="HUF" ${
        oldUser.currency === "HUF" ? "selected" : ""
      }>HUF - Florín húngaro</option>
      <option value="IDR" ${
        oldUser.currency === "IDR" ? "selected" : ""
      }>IDR - Rupia indonesia</option>
      <option value="ILS" ${
        oldUser.currency === "ILS" ? "selected" : ""
      }>ILS - Shekel israelí</option>
      <option value="INR" ${
        oldUser.currency === "INR" ? "selected" : ""
      }>INR - Rupia india</option>
      <option value="ISK" ${
        oldUser.currency === "ISK" ? "selected" : ""
      }>ISK - Corona islandesa</option>
      <option value="JPY" ${
        oldUser.currency === "JPY" ? "selected" : ""
      }>JPY - Yen japonés</option>
      <option value="KRW" ${
        oldUser.currency === "KRW" ? "selected" : ""
      }>KRW - Won surcoreano</option>
      <option value="KZT" ${
        oldUser.currency === "KZT" ? "selected" : ""
      }>KZT - Tenge kazajo</option>
      <option value="MXN" ${
        oldUser.currency === "MXN" ? "selected" : ""
      }>MXN - Peso mexicano</option>
      <option value="MYR" ${
        oldUser.currency === "MYR" ? "selected" : ""
      }>MYR - Ringgit malayo</option>
      <option value="NOK" ${
        oldUser.currency === "NOK" ? "selected" : ""
      }>NOK - Corona noruega</option>
      <option value="NZD" ${
        oldUser.currency === "NZD" ? "selected" : ""
      }>NZD - Dólar neozelandés</option>
      <option value="PAB" ${
        oldUser.currency === "PAB" ? "selected" : ""
      }>PAB - Balboa panameño</option>
      <option value="PEN" ${
        oldUser.currency === "PEN" ? "selected" : ""
      }>PEN - Sol peruano</option>
      <option value="PHP" ${
        oldUser.currency === "PHP" ? "selected" : ""
      }>PHP - Peso filipino</option>
      <option value="PKR" ${
        oldUser.currency === "PKR" ? "selected" : ""
      }>PKR - Rupia pakistaní</option>
      <option value="PLN" ${
        oldUser.currency === "PLN" ? "selected" : ""
      }>PLN - Złoty polaco</option>
      <option value="PYG" ${
        oldUser.currency === "PYG" ? "selected" : ""
      }>PYG - Guaraní paraguayo</option>
      <option value="RON" ${
        oldUser.currency === "RON" ? "selected" : ""
      }>RON - Leu rumano</option>
      <option value="RUB" ${
        oldUser.currency === "RUB" ? "selected" : ""
      }>RUB - Rublo ruso</option>
      <option value="SAR" ${
        oldUser.currency === "SAR" ? "selected" : ""
      }>SAR - Riyal saudí</option>
      <option value="SEK" ${
        oldUser.currency === "SEK" ? "selected" : ""
      }>SEK - Corona sueca</option>
      <option value="SGD" ${
        oldUser.currency === "SGD" ? "selected" : ""
      }>SGD - Dólar de Singapur</option>
      <option value="THB" ${
        oldUser.currency === "THB" ? "selected" : ""
      }>THB - Baht tailandés</option>
      <option value="TRY" ${
        oldUser.currency === "TRY" ? "selected" : ""
      }>TRY - Lira turca</option>
      <option value="TWD" ${
        oldUser.currency === "TWD" ? "selected" : ""
      }>TWD - Nuevo dólar taiwanés</option>
      <option value="UAH" ${
        oldUser.currency === "UAH" ? "selected" : ""
      }>UAH - Grivna ucraniana</option>
      <option value="USD" ${
        oldUser.currency === "USD" ? "selected" : ""
      }>USD - Dólar estadounidense</option>
      <option value="UYU" ${
        oldUser.currency === "UYU" ? "selected" : ""
      }>UYU - Peso uruguayo</option>
      <option value="VND" ${
        oldUser.currency === "VND" ? "selected" : ""
      }>VND - Dong vietnamita</option>
      <option value="ZAR" ${
        oldUser.currency === "ZAR" ? "selected" : ""
      }>ZAR - Rand sudafricano</option>
    </select>
  <br/>
`;
};
