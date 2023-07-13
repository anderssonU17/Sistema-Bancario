import React, { useEffect, useState } from 'react';
import { getOwnUser, updateEmail, updatePassword } from '../api/ApiUser';
import '../../assets/css/User.css';
import Swal from 'sweetalert2';

export const UserPage = () => {
  const [user, setUser] = useState({});
  const [showUpdateEmailModal, setShowUpdateEmailModal] = useState(false);
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getOwnUser(token);
        setUser(result);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, []);

  const openUpdateEmailModal = () => {
    if (!showUpdatePasswordModal) {
      setShowUpdateEmailModal(true);
    }
  };

  const closeUpdateEmailModal = () => {
    setShowUpdateEmailModal(false);
  };

  const openUpdatePasswordModal = () => {
    if (!showUpdateEmailModal) {
      setShowUpdatePasswordModal(true);
    }
  };

  const closeUpdatePasswordModal = () => {
    setShowUpdatePasswordModal(false);
  };

  const handleUpdateEmail = async () => {
    try {
      await updateEmail(newEmail);
      const updatedUser = { ...user, email: newEmail };
      setUser(updatedUser);
      setNewEmail('');
      closeUpdateEmailModal();
      Swal.fire({
        icon: 'success',
        title: 'Email actualizado',
        text: 'El email se ha actualizado correctamente.',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el email.',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      });
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(newPassword);
      setNewPassword('');
      closeUpdatePasswordModal();
      Swal.fire({
        icon: 'success',
        title: 'Contraseña actualizada',
        text: 'La contraseña se ha actualizado correctamente.',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la contraseña.',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <section className="user-section">
      <div className="container py-5">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="user-card">
                  <div className="user-avatar">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" />
                  </div>
                  <h5 className="my-3 user-name">{user.name}</h5>
                  <p className="text-muted user-role">{user.rol}</p>
                  <p className="text-muted user-address">{user.address}</p>
                </div>
                <div className="btn-group" role="group" aria-label="Editar">
                  <button type="button" className="btn btn-primary btn-sm" onClick={openUpdateEmailModal}>
                    Editar Email
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={openUpdatePasswordModal}>
                    Editar Contraseña
                  </button>
                </div>
              </div>
              <div className="col-md-8">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <tbody>
                      <tr>
                        <th className="table-title">Full Name:</th>
                        <td>{user.userName}</td>
                      </tr>
                      <tr>
                        <th className="table-title">Email:</th>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <th className="table-title">Number Account:</th>
                        <td>{user.number_Account}</td>
                      </tr>
                      <tr>
                        <th className="table-title">Type Account:</th>
                        <td>{user.typeAccount}</td>
                      </tr>
                      <tr>
                        <th className="table-title">DPI:</th>
                        <td>{user.DPI}</td>
                      </tr>
                      <tr>
                        <th className="table-title">Phone Number:</th>
                        <td>{user.phoneNumber}</td>
                      </tr>
                      <tr>
                        <th className="table-title">Work Name:</th>
                        <td>{user.workName}</td>
                      </tr>
                      <tr>
                        <th className="table-title">Currency:</th>
                        <td>{user.currency}</td>
                      </tr>
                      <tr>
                        <th className="table-title">Monthly Income:</th>
                        <td>{user.monthlyIncome}</td>
                      </tr>
                      <tr>
                        <th className="table-title">Account Balance:</th>
                        <td>{user.accountBalance}</td>
                      </tr>
                      <tr>
                        <th className="table-title">Number of Transactions:</th>
                        <td>{user.numberOfTransactions}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición de correo electrónico */}
      {showUpdateEmailModal && (
        <div className="modal-overlay" onClick={closeUpdateEmailModal}>
          <div className="floating-card" onClick={(e) => e.stopPropagation()}>
            <h4>Editar Email</h4>
            <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Ingrese el nuevo correo electrónico" />
            <div className="floating-card-buttons">
              <button className="btn btn-primary" onClick={handleUpdateEmail}>Actualizar Email</button>
              <button className="btn btn-secondary" onClick={closeUpdateEmailModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición de contraseña */}
      {showUpdatePasswordModal && (
        <div className="modal-overlay" onClick={closeUpdatePasswordModal}>
          <div className="floating-card" onClick={(e) => e.stopPropagation()}>
            <h4>Editar Contraseña</h4>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Ingrese la nueva contraseña" />
            <div className="floating-card-buttons">
              <button className="btn btn-primary" onClick={handleUpdatePassword}>Actualizar Contraseña</button>
              <button className="btn btn-secondary" onClick={closeUpdatePasswordModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
