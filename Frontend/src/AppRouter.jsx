import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isUserAuthenticated } from './auth/helpers/LoginHelper';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './auth/pages/LoginPage';


export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route
        path='/dashboard'
        element={isUserAuthenticated() ? <Dashboard/> : <Navigate to="/"/>}
      />
      
    </Routes>
  );
};
