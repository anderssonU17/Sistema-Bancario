import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isUserAuthenticated } from './auth/helpers/LoginHelper';
import { Dashboard } from './components/Dashboard';
import { Start } from './Start/Pages/Start';


export const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Dashboard/>}/> */}
      <Route path='/*' element={<Start/>}/>
    </Routes>
  );
};
