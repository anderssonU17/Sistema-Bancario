import axios from "axios";
import Swal from "sweetalert2";

const URL = 'https://sistema-bancario-backend-nine.vercel.app/api/';

export const getMovements = async () => {
  try {
    const response = await axios.get(`${URL}movement`, {
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    });

    return response.data.movements;

  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ha ocurrido un error.",
    });
  }
};
