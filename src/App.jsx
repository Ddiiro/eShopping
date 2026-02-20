import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage';
import CheckoutPages from './pages/CheckoutPages';
import TrackingPage from './pages/TrackingPage';

function App() {

  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/checkout" element={<CheckoutPages />} />
        <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  )
}

export default App
