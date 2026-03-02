import React, { use } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../pages/styles/HomePage.css'
import Header from '../components/Header'
import ProductGrid from './ProductGrid'

function HomePage({ carts }) {
    let cartItems = carts
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products')
        .then((response) => {
            setProducts(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
  return (
    <div>
        <Header cartItems={cartItems} />
        <ProductGrid products={products} />
    </div>
  )
}

export default HomePage