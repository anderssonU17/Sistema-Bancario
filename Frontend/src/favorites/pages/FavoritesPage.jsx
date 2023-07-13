import React, { useState, useEffect } from 'react';
import { viewOwnFavorites, addFavorite, deleteFavorite } from '../api/ApiFavorities';
import Swal from 'sweetalert2';
import '../../assets/css/FavoritesPage.css';

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [alias, setAlias] = useState('');
  const [isAddFormVisible, setAddFormVisible] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await viewOwnFavorites(token);
      if (response && response['Favoriotos:']) {
        setFavorites(response['Favoriotos:']);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      Swal.fire({
        icon: 'success',
        title: 'Favorito eliminado',
        text: 'El favorito se eliminó correctamente.',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el favorito.',
      });
    }
  };

  return (
    <div className="favorites-container">
      <h2 className="letrita">Lista de Favoritos</h2>
      <div className="add-favorite-section">
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
            <div className="add-favorite-form-buttons">
              <button type="submit">Agregar</button>
              <button type="button" onClick={() => setAddFormVisible(false)}>Cancelar</button>
            </div>
          </form>
        ) : (
          <button className="add-favorite-btn" onClick={() => setAddFormVisible(true)}>
            Agregar Favorito
          </button>
        )}
      </div>
      {favorites.length > 0 ? (
        <div className="favorites-list">
          {favorites.map((favorite) => (
            <div key={favorite._id} className="favorite-card">
              <span className="favorite-icon">★</span>
              <div className="favorite-card-content">
                <div className="favorite-card-header">
                  <span className="favorite-alias">{favorite.alias}</span>
                  <button
                    className="delete-favorite-btn"
                    onClick={() => handleDeleteFavorite(favorite.alias)}
                  >
                    X
                  </button>
                </div>
                <div className="favorite-card-body">
                  <span className="favorite-account-number">{favorite.number_Account}</span>
                  <span className="favorite-account-type">{favorite.typeAccount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay favoritos.</p>
      )}
    </div>
  );
};
