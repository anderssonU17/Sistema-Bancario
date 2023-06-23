import React, { useState } from "react";
import "./dashboard.css";

const Dashboard = ({ li }) => {
    const [window, setWindow] = useState(false);

    let openClose = () => {
      if (window === false) {
        setWindow(true);
      } else {
        setWindow(false);
      }
    };

    return (
      <nav className="navbar-menu" style={{ width: window === false ? 210 : 60 }}>
        <div className="box" onClick={() => openClose()}>
          <img src="/img/menu.svg" alt="box" />
        </div>
        <ul className="navbar__list">
          {li.map((item, i) => (
            <div className="navbar__li-box" key={i}>
              <img
                src={item[1]}
                alt={item[1]}
                style={{ paddingLeft: window === false ? 27 : 15 }}
              />
              <li
                className="navbar__li"
                style={{ display: window === false ? "inline-block" : "none" }}
              >
                {item[0]}
              </li>
            </div>
          ))}
        </ul>
    </nav>
    )
}

export default Dashboard;