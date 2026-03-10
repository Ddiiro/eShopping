import '../Home/HomePage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

function ProductGrid({ product, loadCart }) {
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image"
                    src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    src={`public/assets/images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                ${product.priceCents / 100}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className='added-to-cart'>
                <img src='public/assets/images/icons/checkmark.png' />
                Added to Cart
            </div>
            <button className="add-to-cart-button button-primary"
                onClick={async () => {
                    await axios.post('/api/cart-items', {
                        productId: product.id,
                        quantity: quantity
                    });
                    await loadCart();
                }}
            >
                Add to Cart
            </button>
        </div>
    )

}

export default ProductGrid