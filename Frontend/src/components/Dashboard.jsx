import React, { useState } from 'react';
import '../assets/css/Dashboard.css';
import logo from '../assets/img/logo.png';
import profile from '../assets/img/user.jpg';

export const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
        <div className="logo_items flex">
          <span className="nav_image">
            <img src={logo} alt="logo_img" />
          </span>
          <span className="logo_name">Bancario</span>
          <i className="bx bx-lock-alt" id="lock-icon" title="Unlock Sidebar" onClick={toggleSidebar}></i>
          <i className="bx bx-x" id="sidebar-close" onClick={toggleSidebar}></i>
        </div>

        <div className="menu_container">
          <div className="menu_items">
            <ul className="menu_item">
              <div className="menu_title flex">
                <span className="title">Administrador</span>
                <span className="line"></span>
              </div>
              <li className="item">
                <a href="#" className="link flex">
                  <i className="bx bx-home-alt"></i>
                  <span>Clientes</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="link flex">
                  <i className="bx bx-grid-alt"></i>
                  <span>Estadisticas</span>
                </a>
              </li>
            </ul>

            <ul className="menu_item">
              <div className="menu_title flex">
                <span className="title">Acciones</span>
                <span className="line"></span>
              </div>
              <li className="item">
                <a href="#" className="link flex">
                  <i className="bx bxs-magic-wand"></i>
                  <span>Transacciones</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="link flex">
                  <i className="bx bx-folder"></i>
                  <span>Divisas</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="link flex">
                  <i className="bx bx-cloud-upload"></i>
                  <span>Historial</span>
                </a>
              </li>
            </ul>

            <ul className="menu_item">
              <div className="menu_title flex">
                <span className="title">Ajustes</span>
                <span className="line"></span>
              </div>
              <li className="item">
                <a href="#" className="link flex">
                  <i className="bx bx-flag"></i>
                  <span>Perfil</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="link flex">
                  <i className="bx bx-award"></i>
                  <span>Favoritos</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="link flex">
                  <i className="bx bx-cog"></i>
                  <span>Cerrar Sesion</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="sidebar_profile flex">
            <span className="nav_image">
              <img src={profile} alt="logo_img" />
            </span>
            <div className="data_text">
              <span className="name">Usuario</span>
              <br />
              <span className="email">ejemplo@gmail.com</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
