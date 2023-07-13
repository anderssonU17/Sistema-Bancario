import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { isUserAuthenticated } from "./auth/helpers/LoginHelper";
import { Dashboard } from "./components/Dashboard";
import { Start } from "./Start/Pages/Start";
import { LoginPage } from "./auth/pages/LoginPage";
import { ActiveAccounts } from "./Statistics/Pages/ActiveAccounts";
import { checkRolAdmin } from "./Statistics/helper/checkAdmin";

export const AppRouter = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const logged = isUserAuthenticated();
        !logged ? (window.location.href = "/") : null;

        const token = localStorage.getItem("token");

        const isAdmin = await checkRolAdmin(token);
        setIsAdmin(isAdmin);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchAdminStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/start" element={<Start />} />
      <Route
        path="/stadistics"
        element={isAdmin ? <ActiveAccounts /> : <Navigate to="/start" />}
      />
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          isUserAuthenticated() ? (
            <>
              <Dashboard />
              <Outlet /> {/* Rutas hijas del dashboard */}
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};