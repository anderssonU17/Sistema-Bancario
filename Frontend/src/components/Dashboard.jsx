import React, { useEffect, useState } from "react";
import "../assets/css/Dashboard.css";
import logo from "../assets/img/logo.png";
import profile from "../assets/img/user.jpg";
import { Link, Outlet } from "react-router-dom";
import { checkRolAdmin } from "../Statistics/helper/checkAdmin";

export const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSidebarLocked, setSidebarLocked] = useState(false);

  //Comprobar rol de administrador
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminCheck = async () => {
      try {
        const verfied = await checkRolAdmin();
        setAdmin(verfied);
      } catch (error) {
        console.error(error);
      }
    };

    adminCheck();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

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
    if (!isSidebarLocked && isSidebarOpen) {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar.classList.contains("close")) {
        sidebar.classList.remove("close");
      }
    }
  };

  const hideSidebar = () => {
    if (!isSidebarLocked && isSidebarOpen) {
      const sidebar = document.querySelector(".sidebar");
      if (!sidebar.classList.contains("close")) {
        sidebar.classList.add("close");
      }
    }
  };

  return (
    <>
      <div className="dashboard">
        <nav
          className={`sidebar ${isSidebarOpen ? "" : "close"}`}
          onMouseEnter={showSidebar}
          onMouseLeave={hideSidebar}
        >
          <div className="logo_items flex">
            <span className="nav_image">
              <img src={logo} alt="logo_img" />
            </span>
            <span className="logo_name">Bancario</span>
            <i
              className={`bx ${
                isSidebarLocked ? "bx-lock-alt" : "bx-lock-open-alt"
              }`}
              id="lock-icon"
              title="Toggle Lock"
              onClick={toggleLock}
            ></i>
            <i
              className="bx bx-x"
              id="sidebar-close"
              onClick={toggleSidebar}
            ></i>
          </div>

          <div className="menu_container">
            <div className="menu_items">
              {admin !== null & admin !== false ? (
                <ul className="menu_item">
                  <div className="menu_title flex">
                    <span className="title">Administrador</span>
                    <span className="line"></span>
                  </div>
                  <li className="item">
                    <Link to={"/start"} className="link flex">
                      <i className="bx bx-world"></i>
                      <span>Clientes</span>
                    </Link>
                  </li>
                  <li className="item">
                    <Link to={"/stadistics"} className="link flex">
                      <i className="bx bx-stats"></i>
                      <span>Estadisticas</span>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="menu_item">
                  <div className="menu_title flex">
                    <span className="title">Usuario</span>
                    <span className="line"></span>
                  </div>
                  <li className="item">
                    <Link to={"/start"} className="link flex">
                      <i className="bx bx-world"></i>
                      <span>Inicio</span>
                    </Link>
                  </li>
                </ul>
              )}

              <ul className="menu_item">
                <div className="menu_title flex">
                  <span className="title">Acciones</span>
                  <span className="line"></span>
                </div>
                <li className="item">
                  <Link to={"/movements"} className="link flex">
                    <i className="bx bx-credit-card"></i>
                    <span>Transacciones</span>
                  </Link>
                </li>
                <li className="item">
                  <Link to="/start" className="link flex">
                    <i className="bx bx-history"></i>
                    <span>Historial</span>
                  </Link>
                </li>
              </ul>
              
              <ul className="menu_item">
                <div className="menu_title flex">
                  <span className="title">Ajustes</span>
                  <span className="line"></span>
                </div>
                <li className="item">
                  <Link to="/profile" className="link flex">
                    <i className="bx bxs-user-circle"></i>
                    <span>Perfil</span>
                  </Link>
                </li>
                <li className="item">
                  <Link to="/favorites" className="link flex">
                    <i className="bx bx-award"></i>
                    <span>Favoritos</span>
                  </Link>
                </li>

                <li className="item">
                  <Link
                    to="/"
                    className="link flex"
                    onClick={() => cerrarSesion()}
                  >
                    <i className="bx bx-log-out"></i>
                    <span>Cerrar Sesion</span>
                  </Link>
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
          <div className="main-content">
            <Outlet />
          </div>
        </nav>
      </div>
    </>
  );
};
