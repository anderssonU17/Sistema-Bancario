import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isUserAuthenticated } from './auth/helpers/LoginHelper';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './auth/pages/LoginPage';
import { UserPage } from './user/pages/UserPage';
import { Start } from './Start/Pages/Start';
import { Stadistics } from './Statistics/Pages/Stadistics';
import { Movements } from './Movements/Pages/Movements';
import { Transfers } from './Movements/Pages/Transfers';
import { Deposits } from './Movements/Pages/Deposits';
import { ActiveAccounts } from './Statistics/Pages/ActiveAccounts';

export const AppRouter = () => {

  return (
<>
{isUserAuthenticated() && <Dashboard/>}
<Routes>
      <Route
        path="/dashboard/*"
        element={
          isUserAuthenticated() ? (
            <Dashboard />
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
        path="/*"
        element={
          isUserAuthenticated() ? (
            <Navigate to="/start" replace={true} />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/start"
        element={
          isUserAuthenticated() ? (
            <Start/>
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/stadistics"
        element={
          isUserAuthenticated() ? (
            <Stadistics/>
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/Movements"
        element={
          isUserAuthenticated() ? (
            <Movements/>
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/Movements/transfer"
        element={
          isUserAuthenticated() ? (
            <Transfers/>
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/Movements/deposit"
        element={
          isUserAuthenticated() ? (
            <Deposits/>
          ) : (
            <LoginPage />
          )
        }
      />
    </Routes>
</>
  );
};