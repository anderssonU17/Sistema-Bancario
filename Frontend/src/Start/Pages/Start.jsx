import React, { useEffect, useState } from "react";
import { Dashboard } from "../../components/Dashboard";

import '../../assets/css/start.css'

import { checkRol } from "../api/startCheckRol";
import { StartAdmin } from "./StartAdmin";
import { StartClient } from "./StartClient";

export const Start = () => {
  const [admin, setAdmin] = useState(null);

  
  useEffect(() => {
    localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1SWQiOiI2NDkyMjM0YzU3NGI1MjY5YzkyYjViOTIiLCJ1c2VybmFtZSI6IkFETUlOQiIsImVtYWlsIjoiQURNSU5CQGdtYWlsLmNvbSIsImlhdCI6MTY4OTEzNzExMywiZXhwIjoxNjg5Mzk2MzEzfQ.o4_Shl5rZAZG1mFFZ7NDu8MbYlxVX6jYIAdq1LjN1UI")
    const rol = async () => {
        //En esta parte, cuando ya se tenga el verdadero login se enviara el token qeu este guardado en el localstorage
      await checkRol(
        localStorage.getItem('token')
      ).then((response) => {
        setAdmin(response)
      });
    };

    rol()

  }, []);

  return (
    <>
      <div className="container-start">
        <div>
          <Dashboard />
        </div >
        <div id="start-content" >{admin ? <StartAdmin/> : <StartClient/> }</div>
      </div>
    </>
  );
};
