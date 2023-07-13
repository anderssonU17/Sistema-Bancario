import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { isUserAuthenticated } from './auth/helpers/LoginHelper';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './auth/pages/LoginPage';
import { UserPage } from './user/pages/UserPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          isUserAuthenticated() ? (
            <Dashboard>
              <Outlet />
            </Dashboard>
          ) : (
            <Navigate to="/login" replace={true} />
          )
        }
      />
      <Route
        path="/profile"
        element={
          isUserAuthenticated() ? (
            <UserPage />
          ) : (
            <Navigate to="/login" replace={true} />
          )
        }
      />
      <Route
        path="/login"
        element={isUserAuthenticated() ? <Navigate to="/dashboard" replace={true} /> : <LoginPage />}
      />
      <Route path="/" element={<Navigate to="/dashboard" replace={true} />} />
    </Routes>
  );
};