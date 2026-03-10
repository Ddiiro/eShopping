import React, { use } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../Home/HomePage.css'
import Header from '../../components/Header'
import ProductGrid from './ProductGrid'
import { useContext } from 'react';
import { ordersContext } from '../../App';

function HomePage() {
    const { cart, loadCart } = useContext(ordersContext);
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products')
                setProducts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProducts();
    }, [])
    return (
        <div>
            <Header cartItems={cart} />
            <div className="home-page">
                <div className="products-grid">
                    {
                        products.map((product) => {
                            return (
                                <ProductGrid key={product.id} product={product} loadCart={loadCart} />
                            )
                        })}
                    <div />
                </div>
            </div>
        </div>
    )
}

export default HomePage