import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:3005/api/";

export const checkRol = async (token) => {
  try {

    const response = await axios.post(`${URL}checkRolAdmin`,null, {
        headers:{
            'x-token': token
        }
    })

    return response.data.ok;

  } catch (error) {
    console.error(error);
  }
};

export const alertAdmin = () => {
  Swal.fire({
    title: 'Este usuario es un admin. No es posible editarlo o eliminarlo.',
    icon: 'warning'
  })
}
