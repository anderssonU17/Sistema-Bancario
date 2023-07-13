import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:3005/api/";

export const transfer = async (transfer) => {
  try {
    const token = localStorage.getItem("token");

    const data = {
      movementType: "TRANSFERENCIA",
      beneficiary: transfer.beneficiary,
      typeAccount: transfer.typeAccount,
      amount: transfer.amount,
      currency: transfer.currency,
    };

    const reponse = await axios.post(`${URL}transfer`, data, {
      headers: {
        "x-token": token,
      },
    });

    Swal.fire({ 
        icon: "success", 
        title: "Deposito hecho correctamente",
        showConfirmButton: true,
     }).then(
        (response) => {
            if(response.isConfirmed) {
                window.location.href = '/movements';
            }else{
                window.location.href = '/movements';
            }
        }
     )

  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message,
      showConfirmButton: true,
    });
  }
};

export const deposit = async (deposit) => {
  try {
    const data = {
      beneficiary: deposit.beneficiary,
      typeAccount: deposit.typeAccount,
      amount: deposit.amount,
      currency: deposit.currency,
    };

    const response = await axios.post(`${URL}deposit`, data, {
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    });

    Swal.fire({ 
        icon: "success", 
        title: "Deposito hecho correctamente",
        showConfirmButton: true,
     }).then(
        (response) => {
            if(response.isConfirmed) {
                window.location.href = '/movements';
            }else{
                window.location.href = '/movements';
            }
        }
     )
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message,
      showConfirmButton: true,
    });
  }
};
