import React, { useEffect, useState } from "react";
import { Dashboard } from "../../components/Dashboard";

import "../../assets/css/start.css";

import { checkRol } from "../api/startCheckRol";
import { StartAdmin } from "./StartAdmin";
import { StartClient } from "./StartClient";
import { isUserAuthenticated } from "../../auth/helpers/LoginHelper";
import { Navigate } from "react-router-dom";

export const Start = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const rol = async () => {

      const token = localStorage.getItem("token");
      
      if (!token) {
        return <Navigate to="/login" />;
      }

      await checkRol(token).then((response) => {
        setAdmin(response);
      });
    };

    rol();
  }, []);

  return (
    <>
      <div className="container-start">
        <div>
          <Dashboard />
        </div>
        <div id="start-content">
          {admin ? (
            <StartAdmin />
          ) : isUserAuthenticated() ? (
            <StartClient />
          ) : (
            <Navigate to="/" />
          )}
        </div>
      </div>
    </>
  );
};
