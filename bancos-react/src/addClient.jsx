import React from "react";
import showPassword from "./js/showPassword";
import "./client.css";

export const AddClient = () => {
  return (
    <>
        <h1>Agregar cliente</h1>
        <div className="container" >
            <div className="formContainer">
                <form> 
                    <label>Nombre</label><br/>
                    <input type="text" name="nombre" placeholder="Nombre completo" /><br/><br/>
                    <label>Usuario</label><br/>
                    <input type="text" name="usuario" placeholder="Nombre de usuario"></input><br/><br/>
                    <label>ID</label><br/>
                    <input type="text" name="nCuenta" placeholder="Número de cuenta"></input><br/><br/><br/>
                    <label>DPI</label><br/>
                    <input type="text" name="DPI" placeholder="DPI"></input><br/><br/>
                    <label>Dirección</label><br/>
                    <input type="text" name="Dirección" placeholder="Dirección"></input><br/><br/>
                </form>
            </div>
            <div className="formContainer">
                <form>
                    <label>Teléfono</label><br/>
                    <input type="tel" name="telefono" placeholder="Número de teléfono"></input><br/><br/>
                    <label>Correo</label><br/>
                    <input type="email" name="correo" placeholder="Correo electrónico"></input><br/><br/>
                    <label>Contraseña</label><br/>
                    <input type="password" name="contrasena" id="pass" placeholder="Contraseña"></input><br/>
                    <input type="checkbox" onChange={showPassword}/>Mostrar contraseña<br/><br/>
                    <label>Trabajo</label><br/>
                    <input type="text" name="trabajo" placeholder="Nombre del trabajo"></input><br/><br/>
                    <label>Ingresos</label><br/>
                    <input type="text" name="ingresos" placeholder="Ingresos mensuales"></input><br/><br/>
                </form>
            </div>
        </div>
        <div className="buttonContainer" >
            <div className="hCenter">
                <input type="submit" value={"Crear cliente"}></input>
            </div>
        </div>
    </>
  )
}
