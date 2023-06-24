import React from "react";
import showPassword from "./js/showPassword";
import "./client.css";

export const AddClient = () => {
  return (
    <>
    <article style={{paddingTop: "2%"}}>
        <h1>Agregar cliente</h1>
        <div className="container">
            <div className="formContainer">
                <form>
                    <div className="inputContainer">
                        <label>Nombre</label><br/>
                        <input type="text" name="nombre" placeholder="Nombre completo" />
                    </div>
                    <div className="inputContainer">
                        <label>Usuario</label><br/>
                        <input type="text" name="usuario" placeholder="Nombre de usuario"></input>
                    </div>
                    <div className="inputContainer">
                        <label>ID</label><br/>
                        <input type="text" name="nCuenta" placeholder="Número de cuenta"></input>
                    </div>
                    <div className="inputContainer" style={{marginTop: "18px"}}>
                        <label>DPI</label><br/>
                        <input type="text" name="DPI" placeholder="DPI"></input>
                    </div>
                    <div className="inputContainer">
                        <label>Dirección</label><br/>
                        <input type="text" name="Dirección" placeholder="Dirección"></input>
                    </div>
                </form>
            </div>
            <div className="formContainer">
                <form>
                    <div className="inputContainer">
                        <label>Teléfono</label><br/>
                        <input type="tel" name="telefono" placeholder="Número de teléfono"></input>
                    </div>
                    <div className="inputContainer">
                        <label>Correo</label><br/>
                        <input type="email" name="correo" placeholder="Correo electrónico"></input>
                    </div>
                    <div className="inputContainer">
                        <label>Contraseña</label><br/>
                        <input type="password" name="contrasena" id="pass" placeholder="Contraseña"></input><br/>
                        <input type="checkbox" onChange={showPassword}/>Mostrar contraseña
                    </div>
                    <div className="inputContainer">
                        <label>Trabajo</label><br/>
                        <input type="text" name="trabajo" placeholder="Nombre del trabajo"></input>
                    </div>
                    <div className="inputContainer">
                        <label>Ingresos</label><br/>
                        <input type="text" name="ingresos" placeholder="Ingresos mensuales"></input>
                    </div>
                </form>
            </div>
            <div className="bCenter">
                <div className="buttonContainer">
                    <input type="submit" value={"Crear cliente"}></input>
                </div>
            </div>
        </div>
    </article>
    </>
  )
}

export default AddClient;