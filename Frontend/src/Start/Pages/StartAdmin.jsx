import React, { useEffect, useState } from "react";
import { getAllUser } from "../api/startAdmin";

import "../../assets/css/startAdmin.css";
import { UserCard } from "../components/userCard";
import { addUserModal } from "../functions/addUserModal";

export const StartAdmin = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [users, setUsers] = useState(null);

  useEffect(() => {
    getAllUser(token).then((responseUsers) => {
      setUsers(responseUsers);
      console.log(responseUsers);
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="button-addUser-container">
          <button className="button-addUser" onClick={() => addUserModal(setUsers)} > 
            Agregar usuario
          </button>
        </div>
        <div className="start-cards-container">
          {users &&
            users.map((user) => (
              <UserCard key={user._id} user={user} setUsers={setUsers} />
            ))}
        </div>
      </div>
    </>
  );
};
