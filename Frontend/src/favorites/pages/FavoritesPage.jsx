import React, { useState, useEffect } from 'react';
import { getFavorites, addFavorite, deleteFavorite } from '../api/ApiFavorities';
import Swal from 'sweetalert2';
import '../../assets/css/FavoritesPage.css';

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [alias, setAlias] = useState('');
  const [isAddFormVisible, setAddFormVisible] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getFavorites(token).then((responseFavorites) => {
        setFavorites(responseFavorites);
        console.log(responseFavorites)
    })
  }, []);

  const handleAddFavorite = async (e) => {
    e.preventDefault();
    try {
      await addFavorite(accountNumber, alias, token);
      setAccountNumber('');
      setAlias('');
      setAddFormVisible(false);
      fetchFavorites();
      Swal.fire({
        icon: 'success',
        title: 'Favorito agregado',
        text: 'El favorito se agregó correctamente.',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el favorito.',
      });
    }
  };

  const handleDeleteFavorite = async (alias) => {
    try {
      await deleteFavorite(alias, token);
      fetchFavorites();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="favorites-container">
      <h2 className="letrita">Lista de Favoritos</h2>
      {favorites.length > 0 ? (
  <ul className="favorites-list">
    {favorites.map(({favorite}) => (
      <li key={favorite._id} className="favorite-item">
        <span className="favorite-icon">★</span>
        <span className="favorite-alias">{favorite.alias}</span>
        <button
          className="delete-favorite-btn"
          onClick={() => handleDeleteFavorite(favorite.alias)}
        >
          Eliminar
        </button>
      </li>
    ))}
  </ul>
) : (
  <p>No hay favoritos.</p>
)}
      {isAddFormVisible ? (
        <form className="add-favorite-form" onSubmit={handleAddFavorite}>
          <input
            type="text"
            placeholder="Número de cuenta"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            required
          />
          <button type="submit">Agregar</button>
        </form>
      ) : (
        <button className="add-favorite-btn" onClick={() => setAddFormVisible(true)}>
          Agregar Favorito
        </button>
      )}
    </div>
  );
};