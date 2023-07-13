import React, { useEffect, useState } from "react";

import "../../assets/css/client.css";
import { getMovements } from "../api/startClient";

export const Client = (props) => {
  const [movements, setMovements] = useState(null);

  useEffect(() => {
    getMovements().then((response) => {
      setMovements(response);
    });
  }, []);

  return (
    <>
      <div className="container-client">
        <h1>Bienvenido {props.user.name}!</h1>
        <div className="card-inf-client">
          <h2 style={{ color: "black", display: "flex" }}>
            Informacion de tu cuenta
          </h2>
          <hr />
          <div>
            <h3>Numero de cuenta:&nbsp;</h3>
            <h3>
              <span>{props.user.number_Account}</span>
            </h3>
          </div>
          <div>
            <h3>Tipo de cuenta:&nbsp;</h3>
            <h3>
              <span>{props.user.typeAccount}</span>
            </h3>
          </div>
          <div>
            <h3>Correo:&nbsp;</h3>
            <h3>
              <span>{props.user.email}</span>
            </h3>
          </div>
          <div>
            <h3>Trabajo:&nbsp;</h3>
            <h3>
              <span>{props.user.workName}</span>
            </h3>
          </div>
          <div>
            <h3>Telefono:&nbsp;</h3>
            <h3>
              <span>{props.user.phoneNumber}</span>
            </h3>
          </div>
          <div>
            <h3>Direccion:&nbsp;</h3>
            <h3>
              <span>{props.user.address}</span>
            </h3>
          </div>
          <div className="account-balance-client">
            <h3>Saldo:&nbsp; </h3>
            <h3>
              <span>
                {props.user.currency + " " + props.user.accountBalance}
              </span>
            </h3>
          </div>
        </div>

        <div className="client-historial" >
            <h1>Historial de transacciones</h1><hr />
        </div>
        <table>
          <thead>
            <tr>
              <th>Tipo de transaccion</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Moneda</th>
              <th>Remitente</th>
              <th>Beneficiario</th>
            </tr>
          </thead>
          <tbody>
            {movements && movements.lenght != 0 &&
              movements.map((item, index) => (
                <tr key={index}>
                  <td>{item.movementType}</td>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td>{item.currency}</td>
                  <td>{item.sender || "null"}</td>
                  <td>{item.beneficiary}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
