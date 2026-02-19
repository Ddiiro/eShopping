import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrderPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
