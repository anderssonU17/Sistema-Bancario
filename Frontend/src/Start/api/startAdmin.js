import axios from "axios"
import { useContext } from "react";
import Swal from "sweetalert2";

const URL = "http://localhost:3005/api/";

//Obtener todos los usuarios de la base de datos
export const getAllUser = async(token) => {
    try {
        
        const response = await axios.get(`${URL}allUsers`,{
            headers:{
                'x-token': token
            }
        })

        return response.data.allUsers

    } catch (error) {
        console.error(error)
    }
}

//Confirmacion para eliminar un usuario
export const confirmDeleteUser = (idUser, setUsers) => {
    try {
        
        Swal.fire({
            title: '¿Estas seguro de eliminar de este usuario?',
            text: "No podras recuperarlo.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'tomato',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              deleteUser(idUser, setUsers)
            }
          })

    } catch (error) {
        console.error(error)
    }
}

//Eliminar un usuario 
export const deleteUser = async(idUser,setUsers) => {
    try {
        
        const token = localStorage.getItem('token')

        const response = await axios.delete(`${URL}deleteUser`,
        {
            data:{
                idUser: idUser
            },
            headers:{
                'x-token':token
            }
        }
        )

        setUsers( await getAllUser(token) )

        Swal.fire({
            title: 'Usuario eliminado con exito.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })

    } catch (error) {
        console.error(error)
        Swal.fire({
            title: 'Error.',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        })
    }
}