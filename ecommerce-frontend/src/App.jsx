import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage';
import CheckoutPages from './pages/CheckoutPages';
import TrackingPage from './pages/TrackingPage';  
import PageNotFound from './components/PageNotFound';
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {

  const [cart, setCart] = useState([])

  useEffect(() => {
    axios.get('/api/cart-items')
    .then((response) => {
        setCart(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
    }, [])

  return (
    <Routes>
        <Route path="/" element={<HomePage carts={cart}/>} />
        <Route path="/orders" element={<OrderPage carts={cart}/>} />
        <Route path="/checkout" element={<CheckoutPages cartItems={cart}/>} />
        <Route path="/tracking" element={<TrackingPage cartItems={cart} />} />

        {/* Wildcard route for 404 page (must be last) */}
        <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
