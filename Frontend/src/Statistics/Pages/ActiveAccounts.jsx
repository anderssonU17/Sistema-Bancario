import React from "react";
import { Dashboard } from "../../components/Dashboard";
import { TableUsers } from "../components/TableUsers";

import '../../assets/css/table.css'

export const ActiveAccounts = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <div style={{display: 'flex', marginLeft: '80px'}} >
        <div className="table-container" >
          <TableUsers token={token} />
        </div>
      </div>
    </>
  );
};
