import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import AuthenticationProvider from './context/AuthenticationContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  )
}

export default App
