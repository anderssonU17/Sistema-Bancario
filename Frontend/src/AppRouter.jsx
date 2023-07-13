import React from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { isUserAuthenticated } from './auth/helpers/LoginHelper';
import { Dashboard } from './components/Dashboard';
import { Start } from './Start/Pages/Start';

import { LoginPage } from './auth/pages/LoginPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/start' element={<Start/>}/>
      <Route path='/' element={<LoginPage/>}/>
      <Route
        path='/dashboard'
        element={isUserAuthenticated() ? (
          <>
            <Dashboard />
            <Outlet /> {/* Rutas hijas del dashboard */}
          </>
        ) : (
          <Navigate to="/"/>
        )}
      />
    </Routes>
  );
};
