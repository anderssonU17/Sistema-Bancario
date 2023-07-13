import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isUserAuthenticated } from './auth/helpers/LoginHelper';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './auth/pages/LoginPage';
import { UserPage } from './user/pages/UserPage';
import { Start } from './Start/Pages/Start';
import { ActiveAccounts } from './Statistics/Pages/ActiveAccounts';
import { FavoritesPage } from './favorites/pages/FavoritesPage';

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
            <Navigate to="/dashboard" replace={true} />
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
      path='/stats'
      element={
        isUserAuthenticated() ? (
          <ActiveAccounts/>
        ) : (
          <LoginPage/>
        )
      }
      />

    <Route
      path='/favorites'
      element={
        isUserAuthenticated() ? (
          <FavoritesPage/>
        ) : (
          <LoginPage/>
        )
      }
      />
      <Route
        path="/login"
        element={isUserAuthenticated() ? <Navigate to="/dashboard" replace={true} /> : <LoginPage />}
      />
      <Route path="/" element={<Navigate to="/dashboard" replace={true} />} />
    </Routes>
</>
  );
};