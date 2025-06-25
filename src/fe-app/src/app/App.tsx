import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from '../features/auth/AuthPage';
import ProductPage from '../features/product/ProductPage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App