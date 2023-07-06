import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./dashboard.css";

export const Dashboard = () => {
  const [window, setWindow] = useState(false);

  let openClose = () => {
    if (window === false) {
      setWindow(true);
    } else {
      setWindow(false);
    }
  };
//https://iconsvg.xyz/ para los iconos
    return(
        <>
          <nav className="navbar-menu" style={{ width: window === false ? 215 : 60 }}>
            <div className="box" onClick={() => openClose()}>
              <img src="/img/menu.svg" alt="box" />
            </div>
            <div className="navbar__list">

              <Link to="/" className="navbar__li-box" style={{ display: "inline-block"}}>
                <img src="/img/home.svg" style={{ paddingLeft: window === false ? 27 : 15 }}/>
                <div className="navbar__li" style={{ display: window === false ? "inline-block" : "none" }}>
                    Principal
                </div>
              </Link>
              
              <Link to="/addClient" className="navbar__li-box" style={{ display: "inline-block"}}>
                <img src="/img/addClient.svg" style={{ paddingLeft: window === false ? 27 : 15 }}/>
                <div className="navbar__li" style={{ display: window === false ? "inline-block" : "none" }}>
                    Agregar Cliente
                </div>
              </Link>

            </div>
          </nav>
        </>
    )
}