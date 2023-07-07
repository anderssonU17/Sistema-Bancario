import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './auth/pages/LoginPage'

export const AppRouter = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<LoginPage />} />
 
   </Routes>
   </>
  )
}
