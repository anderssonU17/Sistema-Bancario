import React, { useState } from 'react';
import '../assets/css/Dashboard.css';
import logo from '../assets/img/logo.png';
import profile from '../assets/img/user.jpg';

export const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSidebarLocked, setSidebarLocked] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleLock = () => {
    setSidebarLocked(!isSidebarLocked);
    const sidebar = document.querySelector(".sidebar");
    const sidebarLockBtn = document.querySelector("#lock-icon");
  
    sidebar.classList.toggle("locked");
    if (!sidebar.classList.contains("locked")) {
      sidebar.classList.add("hoverable");
      sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    } else {
      sidebar.classList.remove("hoverable");
      sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    }
  };

  const showSidebar = () => {
    if (!isSidebarLocked) {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.remove("close");
      }
    }
  };

  const hideSidebar = () => {
    if (!isSidebarLocked) {
      const sidebar = document.querySelector(".sidebar");
      if (!sidebar.classList.contains("close")) {
        sidebar.classList.add("close");
      }
    }
  };
  
  return (
    <>
      <nav className={`sidebar ${isSidebarOpen ? '' : 'close'}`}
      onMouseEnter={showSidebar}
      onMouseLeave={hideSidebar}
      >
        <div className="logo_items flex">
          <span className="nav_image">
            <img src={logo} alt="logo_img" />
          </span>
          <span className="logo_name">Bancario</span>
          <i className="bx bx-lock-alt" id="lock-icon" title="Unlock Sidebar" onClick={toggleLock}></i>
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
                  <i className="bx bx-world"></i>
                  <span>Clientes</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="link flex">
                  <i className="bx bx-stats"></i>
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
                  <i className="bx bx-credit-card"></i>
                  <span>Transacciones</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="link flex">
                  <i className="bx bxs-badge-dollar"></i>
                  <span>Divisas</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="link flex">
                  <i className="bx bx-history"></i>
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
                  <i className="bx bxs-user-circle"></i>
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
                  <i className="bx bx-log-out"></i>
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
