import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage'
import OrderPage from './pages/Order/OrderPage';
import CheckoutPages from './pages/Checkout/CheckoutPages';
import TrackingPage from './pages/Tracking/TrackingPage';  
import PageNotFound from './pages/PageNotFound/PageNotFound';
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {

  const [cart, setCart] = useState([])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCart();
  }, [])

  return (
    <Routes>
        <Route path="/" element={<HomePage carts={cart}/>} />
        <Route path="/orders" element={<OrderPage carts={cart}/>} />
        <Route path="/checkout" element={<CheckoutPages carts={cart}/>} />
        <Route path="/tracking/:orderId/:productId" element={<TrackingPage carts={cart} />} />

        {/* Wildcard route for 404 page (must be last) */}
        <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
