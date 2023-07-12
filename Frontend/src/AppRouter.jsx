import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isUserAuthenticated } from './auth/helpers/LoginHelper';
import { Dashboard } from './components/Dashboard';


export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
    </Routes>
  );
};
