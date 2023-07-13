import Swal from "sweetalert2";
import { addUser } from "../api/startAdmin";

let newUser;

export const addUserModal = (setUsers) => {
  try {
    Swal.fire({
      title: "Ingrese la información",
      html: html,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#88DC65",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "tomato",
      preConfirm: () => {
        let user = {};
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
        user.currency = document.getElementById("currency").value;

        if ( !checkParams(user) ){
          return false
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        addUser(newUser, setUsers);
        Swal.fire("¡Guardado!", "El nuevo usuario ha sido agregado correctamente.", "success");
      }
    });

    
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error.",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

//Comprobar que todos los datos se hayan enviado
const checkParams = (user) => {

  const paramsVoid =  checkObjectAttributesNotEmpty(user)

  if(!paramsVoid){
    Swal.fire({
      title: "Error.",
      text: 'Error, debes llenar todos los parametros',
      icon: "error",
      confirmButtonText: 'ok',
    })
    
  }else{
    newUser = user
    return newUser
  }

};

function checkObjectAttributesNotEmpty(obj) {
  for (let key in obj) {
    if (!obj[key]) {
      
      if(obj[key] == 'DPI' && obj[key].lenght < 13 && obj[key].lenght > 13) {
        Swal.fire({
          title: "Error.",
          text: 'El DPI debe tener 13 digitos',
          icon: "error",
          confirmButtonText: 'ok',
        })
      }else if(obj[key] == 'password' && obj[key].length < 6) {
        Swal.fire({
          title: "Error.",
          text: 'La contraseña debe tener 6 digitos como minimo',
          icon: "error",
          confirmButtonText: 'ok',
        })
      }
      return false;
    }
  }
  return true;
}

const html =
  //El rol y un select para escoger entre admin o cliente
  '<label class="swal2-label">Rol<label/>' +
  "<br/>" +
  `
        <select id="rol" class="swal2-select">
          <option value="" >Seleccione una opción</option>
          <option value="ADMINISTRADOR">ADMINISTRADOR</option>
          <option value="CLIENTE">CLIENTE</option>
        </select>
      ` +
  "<br/>" +
  //Name
  '<label class="swal2-label">Nombre<label/>' +
  "<br/>" +
  '<input id="name" class="swal2-input" placeholder="name">' +
  "<br/>" +
  //userName
  '<label class="swal2-label">Sobrenombre<label/>' +
  "<br/>" +
  '<input id="userName" class="swal2-input" placeholder="userName">' +
  "<br/>" +
  //typeAccount
  '<label class="swal2-label">Tipo de cuenta<label/>' +
  "<br/>" +
  '<input id="typeAccount" class="swal2-input" placeholder="typeAccount">' +
  "<br/>" +
  //DPI
  '<label class="swal2-label">DPI<label/>' +
  "<br/>" +
  '<input id="DPI" class="swal2-input" type="number" placeholder="DPI">' +
  "<br/>" +
  //address
  '<label class="swal2-label">Direccion<label/>' +
  "<br/>" +
  '<input id="address" class="swal2-input" placeholder="address">' +
  "<br/>" +
  //phoneNumber
  '<label class="swal2-label">Telefono<label/>' +
  "<br/>" +
  '<input id="phoneNumber" class="swal2-input" type="number" placeholder="phoneNumber">' +
  "<br/>" +
  //email
  '<label class="swal2-label">Correo<label/>' +
  "<br/>" +
  '<input id="email" class="swal2-input" placeholder="email">' +
  "<br/>" +
  //password
  '<label class="swal2-label">Contraseña<label/>' +
  "<br/>" +
  '<input id="password" class="swal2-input" placeholder="password">' +
  "<br/>" +
  //workName
  '<label class="swal2-label">Trabajo<label/>' +
  "<br/>" +
  '<input id="workName" class="swal2-input" placeholder="workName">' +
  "<br/>" +
  //MonthlyIncome
  '<label class="swal2-label">Salario<label/>' +
  "<br/>" +
  '<input id="monthlyIncome" class="swal2-input" type="number" placeholder="monthlyIncome">' +
  "<br/>" +
  //Currency
  '<label class="swal2-label">Moneda<label/>' +
  "<br/>" +
  `
  <select id="currency" class="swal2-select">
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

      ` +
  "<br/>";
