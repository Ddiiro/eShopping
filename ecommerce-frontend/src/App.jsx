import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage'
import OrderPage from './pages/Order/OrderPage';
import CheckoutPages from './pages/Checkout/CheckoutPages';
import TrackingPage from './pages/Tracking/TrackingPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { createContext } from 'react';
// import { ordersContext } from './store/context';

export const ordersContext = createContext();

function App() {

  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])

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

    const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders?expand=products')
                setOrders(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrders();
  }, [])

  return (
     <ordersContext.Provider value={{cart, orders}}>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/checkout" element={<CheckoutPages />} />
        <Route path="/tracking/:orderId/:productId" element={<TrackingPage />} />

      {/* Wildcard route for 404 page (must be last) */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </ordersContext.Provider>
  )
}

export default App
