import axios from "axios";
import Swal from "sweetalert2";

const URL = 'https://sistema-bancario-backend-nine.vercel.app/api/';

//Obtener todos los usuarios de la base de datos
export const getAllUser = async (token) => {
  try {
    const response = await axios.get(`${URL}allUsers`, {
      headers: {
        "x-token": token,
      },
    });

    return response.data.allUsers;
  } catch (error) {
    console.error(error);
  }
};

//Agregar usuario
export const addUser = async(user, setUsers) => {
  try {
    const token = localStorage.getItem('token');

    const data = {
      rol: user.rol,
      name: user.name,
      userName: user.userName,
      typeAccount: user.typeAccount,
      DPI: user.DPI,
      address: user.address,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
      workName: user.workName,
      currency: user.currency,
      monthlyIncome: user.monthlyIncome
    }

    const response = await axios.post(`${URL}add-user`,data,
      {
        headers: {
          "x-token": token,
        },
      }
    );
    response && setUsers( await getAllUser(token))

  } catch (error) {

    console.log(error);

    let errorResponse = null;
    error.response.data.errors ?  errorResponse = Object.keys(error.response.data.errors) : null;
    errorResponse ? errorResponse = errorResponse.join(", ") : null;
    

    Swal.fire({
      title: "Error.",
      text: error.response.data.message || `Error parametro(s): ${errorResponse}` || 'Error en la peticion.',
      icon: "error",
      showConfirmButton: true
    });
  }
}

//Editar un usuario 
export const editUser = async(newUser, setUsers) => {
  try {
    
    const data = {
      idUser: newUser._id,
      rol: newUser.rol,
      name: newUser.name,
      userName: newUser.userName,
      typeAccount: newUser.typeAccount,
      address: newUser.address,
      phoneNumber: newUser.phoneNumber,
      email: newUser.email,
      workName: newUser.workName,
      currency: newUser.currency,
      monthlyIncome: newUser.monthlyIncome,
      accountBalance: newUser.accountBalance
    }
    console.log('Lo que se va mandar en el body');
    console.log(data);

    const response = await axios.put(`${URL}updateUser`, data, {
      headers: {
              "x-token": localStorage.getItem("token"),
            },
    })

    Swal.fire(
      "¡Guardado!",
      "El usuario ha sido actualizado correctamente.",
      "success"
    );

    response && setUsers( await getAllUser(localStorage.getItem("token")))

  } catch (error) {
    console.error(error)
    Swal.fire({
      title: "Error.",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: true,
    })
  }
}


//Confirmacion para eliminar un usuario
export const confirmDeleteUser = (idUser, setUsers) => {
  try {
    Swal.fire({
      title: "¿Estas seguro de eliminar de este usuario?",
      text: "No podras recuperarlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "tomato",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(idUser, setUsers);
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

//Eliminar un usuario
export const deleteUser = async (idUser, setUsers) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${URL}deleteUser`, {
      data: {
        idUser: idUser,
      },
      headers: {
        "x-token": token,
      },
    });

    setUsers(await getAllUser(token));

    Swal.fire({
      title: "Usuario eliminado con exito.",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
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
