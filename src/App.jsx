import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage';
import CheckoutPages from './pages/CheckoutPages';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/checkout" element={<CheckoutPages />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
