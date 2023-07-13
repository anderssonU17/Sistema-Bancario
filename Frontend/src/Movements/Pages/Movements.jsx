import React, { useEffect, useState } from "react";
import { Dashboard } from "../../components/Dashboard";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "../../assets/css/movements.css";
import { checkRolAdmin } from "../../Statistics/helper/checkAdmin";

export const Movements = () => {

    const nagiate = useNavigate()

    const navegar = (_pagina) => {
        nagiate(_pagina);
    }

  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const checkRol = async () => {
      return await checkRolAdmin();
    };

    checkRol().then((response) => {
      setAdmin(response);
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", marginLeft: "80px" }}>
        <div>
          <Dashboard />
        </div>
        <div className="movement-container">
          {admin ? (
            <div className="movement-deposit-container">
              <h3>Deposito</h3>
              <p>
                En este apartado se le permitira a su usurio realizar un
                deposito a una cuenta, simepre y cuando conozca los datos del
                destinatario.
              </p>
              <button onClick={() => navegar('/movements/deposit')} >  Hacer deposito</button>
            </div>
          ) : (
            <div>
              <h2 style={{ color: "gray" }}>
                Si desea hacer un deposito comuniquese con un Administrador{" "}
              </h2>
            </div>
          )}
          <div className="movement-transfer-container">
            <h3>Transferencia</h3>
            <p>
              En este apartado se le permitira a su usuario realizar una
              trasferian de su cuenta hacia otra, simepre y cuando conozca los
              datos del destinatario.
            </p>
            <button onClick={() => navegar('/movements/transfer')} >Hacer transferencia</button>
          </div>
        </div>
      </div>
    </>
  );
};
