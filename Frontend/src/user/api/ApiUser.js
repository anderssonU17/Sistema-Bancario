import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:3005/api/";

export const getOwnUser = async (token) => {
    try {
      const response = await axios.get(`${URL}viewOwnUser`, {
        headers: {
          'x-token': token,
        },
      });
  
      return response.data.user;
  
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        showConfirmButton: true,
        confirmButtonText: "OK"
      }).then(r => {
        if (r.isConfirmed) {
          if (error.response.data.message === 'El token ha expirado') {
            localStorage.removeItem('token');
            window.location.href = '/';
          }
        } else {
          if (error.response.data.message === 'El token ha expirado') {
            localStorage.removeItem('token');
            window.location.href = '/';
          }
        }
      });
    }
  };
  
  export const updatePassword = async (password) => {
    try {
      const token = localStorage.getItem('token');
  
      const data = {
        password: password,
      };
  
      await axios.put(`${URL}updateOwnUser`, data, {
        headers: {
          'x-token': token,
        },
      });
  
      // Actualizar el estado del usuario o realizar cualquier otra acción necesaria
  
      return true; // Si la solicitud fue exitosa
    } catch (error) {
      console.error(error);
      return false; // Si hubo un error en la solicitud
    }
  };
  
  export const updateEmail = async (email) => {
    try {
      const token = localStorage.getItem('token');
  
      const data = {
        email: email,
      };
  
      await axios.put(`${URL}updateOwnUser`, data, {
        headers: {
          'x-token': token,
        },
      });
  
      // Actualizar el estado del usuario o realizar cualquier otra acción necesaria
  
      return true; // Si la solicitud fue exitosa
    } catch (error) {
      console.error(error);
      return false; // Si hubo un error en la solicitud
    }
  };