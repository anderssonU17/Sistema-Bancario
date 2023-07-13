import React, { useEffect, useState } from "react";
import { getAllUser } from "../../Start/api/startAdmin";

import '../../assets/css/table.css'

export const TableUsers = ({ token }) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getAllUser(token).then((usersResponse) => {
          console.log(usersResponse);
          setUsers(usersResponse);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    sortTable("numberOfTransactions", sortOrder);
  }, [sortOrder]);

  const sortTable = (key, order) => {
    if(!users){
        return false
    }
    const sortedData = [...users].sort((a, b) => {
      if (order === "asc") {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });
    setUsers(sortedData);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  return (
    <>
      <div>
        <button onClick={toggleSortOrder} className="button-asc-desc" >
          {sortOrder === "asc" ? "Orden Descendente" : "Orden Ascendente"}
        </button>
        <table>
          <thead>
            <tr>
              <th>Numero de cuenta</th>
              <th>Cantidad de transacciones</th>
              <th>Sobrenombre</th>
              <th>Nombre del trabajo</th>
              <th>Rol</th>
              <th>Tipo de cuenta</th>
              <th style={{backgroundColor: 'skyblue'}} >Saldo de la cuenta</th>
              <th>Moneda</th>
            </tr>
          </thead>
          <tbody>
            {
            users &&
            users.map((item, index) => (
              <tr key={index}>
                <td>{item.number_Account}</td>
                <td>{item.numberOfTransactions}</td>
                <td>{item.userName}</td>
                <td>{item.workName}</td>
                <td>{item.rol}</td>
                <td>{item.typeAccount}</td>
                <td>{item.accountBalance}</td>
                <td>{item.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
