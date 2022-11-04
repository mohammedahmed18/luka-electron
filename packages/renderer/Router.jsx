import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoginForm from './components/loginForm'
const Router = () => {
   return (
      <Routes>
         <Route path="/" element={<LoginForm />} />
         <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
   )
}

export default Router
