import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import AuthenticationProvider from './context/AuthenticationContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import ProductPage from './pages/ProductPage'
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import OrderDetailPage from './pages/OrderDetailPage'

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  )
}

export default App
