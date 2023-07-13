import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'https://sistema-bancario-backend-nine.vercel.app/api/';

export const viewOwnFavorites = async (token) => {
  try {
    const response = await axios.get(`${URL}viewOwnFavorites`, {
      headers: {
        'x-token': token
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw new Error('Error al obtener la lista de favoritos');
  }
};
  

export const addFavorite = async (accountNumber, alias, token) => {
  try {
    const response = await axios.put(
      `${URL}addFavorite`,
      { number_Account: accountNumber, alias },
      {
        headers: {
          'x-token': token
        }
      }
    );
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw new Error('Error al agregar el favorito');
  }
};


export const deleteFavorite = async (alias, token) => {
  try {
    const response = await axios.delete(
      `${URL}deleteOwnFavorite`,
      {
        headers: {
          'x-token': token
        },
        data: { alias }
      }
    );
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el favorito');
  }
};

