import React, { useState } from "react";

import "../../assets/css/startAdmin.css";
import { alertAdmin } from "../api/startCheckRol";
import { confirmDeleteUser } from "../api/startAdmin";

export const UserCard = (props) => {

  const filterAction = (action) => {
    if(props.user.rol == 'ADMINISTRADOR') return alertAdmin()
    else{
      switch (action) {
        case 'delete':
          confirmDeleteUser(props.user._id, props.setUsers)
          break;
        case 'edit':
          
          break;
      }
    }
  }

  return (
    <>
      <div className="card-user">
        <div>
          <h5 id="subtitle" >Cuenta:&nbsp;&nbsp;</h5>
          <h5>{props.user.number_Account}</h5>
        </div>
        <hr />
        <div>
          <h5 id="subtitle" >Sobrenombre:&nbsp;&nbsp;</h5>
          <h5>{props.user.userName}</h5>
        </div>
        <div>
          <h5 id="subtitle" >Saldo actual:&nbsp;&nbsp;</h5>
          <h5>{props.user.currency + " " + props.user.accountBalance}</h5>
        </div>
        <div>
          <h5 id="subtitle" >Salario:&nbsp;&nbsp;</h5>
          <h5>{props.user.currency + " " + props.user.monthlyIncome}</h5>
        </div>
        <div>
          <h5 id="subtitle" >DPI:&nbsp;&nbsp;</h5>
          <h5>{props.user.DPI}</h5>
        </div>
        <div>
          <h5 id="subtitle" >Tipo de cuenta:&nbsp;&nbsp;</h5>
          <h5>{props.user.typeAccount}</h5>
        </div>
        <div>
          <h5 id="subtitle" >Nombre:&nbsp;&nbsp;</h5>
          <h5>{props.user.name}</h5>
        </div>
        <div>
          <h5 id="subtitle" >Correo:&nbsp;&nbsp;</h5>
          <h5>{props.user.email}</h5>
        </div>
        <div>
          <h5 id="subtitle" >Trabajo:&nbsp;&nbsp;</h5>
          <h5>{props.user.workName}</h5>
        </div>
        <div>
          <h5 id="subtitle" >Telefono:&nbsp;&nbsp;</h5>
          <h5>{props.user.phoneNumber}</h5>
        </div>
        <div className="btn-section" >
          <button id="btn-editar" onClick={() =>filterAction('edit')}>Editar</button>
          <button id="btn-eliminar" onClick={() =>filterAction('delete')} >Eliminar</button>
        </div>
      </div>
    </>
  );
};
