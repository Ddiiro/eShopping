import React, { use } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../Home/HomePage.css'
import Header from '../../components/Header'
import ProductGrid from './ProductGrid'
import { useContext } from 'react';
import { ordersContext } from '../../App';

function HomePage() {
    const { cart, loadCart, products } = useContext(ordersContext);

    useEffect(() => {
        // fetchProducts();
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