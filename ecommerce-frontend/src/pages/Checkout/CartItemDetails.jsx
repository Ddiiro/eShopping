import axios from 'axios';
import { useState } from 'react';
import { formatCurrency } from '../../utils/currency';
import { useContext } from 'react';
import { ordersContext } from '../../App';

function CartItemDetails({ cartItem, fetchPaymentSummary }) {
    const { loadCart } = useContext(ordersContext);
    const [isUpdatingCartItem, setIsUpdatingCartItem] = useState(false);
    const [quantityInput, setQuantityInput] = useState(0);

    const handleDeleteCartItem = async (cartItemId) => {
        try {
            await axios.delete(`/api/cart-items/${cartItemId}`)
        } catch (error) {
            console.log(error)
        }

        await fetchPaymentSummary();
        await loadCart();
    }

    const handleQuantityInputChange = (quantity) => {
        setIsUpdatingCartItem(true);
        setQuantityInput(quantity);
    }

    const handleInputChange = (e) => {
        setQuantityInput(e.target.value);
    }

    const updateCartDetails = async (productId, quantityInput) => {
        if (quantityInput > 0) {
            try {
                await axios.put(`/api/cart-items/${productId}`, {
                    quantity: Number(quantityInput)
                });
            } catch (error) {
                console.log(error);
            } finally {
                setIsUpdatingCartItem(false);
            }

            await loadCart();
            await fetchPaymentSummary();
        }
    }
    return (
        <div>
            <div class="cart-item-details">
                <div class="product-name">
                    {cartItem.product.name}
                </div>
                <div class="product-price">
                    {formatCurrency(cartItem.product.priceCents)}
                </div>
                <div class="product-quantity">
                    {
                        isUpdatingCartItem ? (
                            <input type="number" class="quantity-input" defaultValue={quantityInput} onChange={(e) => handleInputChange(e)} />
                        ) : (
                            <span>
                                Quantity: <span class="quantity-label">{cartItem.quantity}</span>
                            </span>)
                    }

                </div>
                <div class="update-cart-item">
                    {
                        isUpdatingCartItem ? (
                            <button className=" button-update-cart"
                                onClick={() => updateCartDetails(cartItem.productId, quantityInput)}
                            >
                                Update Cart Item
                            </button>
                        ) : (
                            <>
                                <button className=" button-update-cart"
                                    onClick={() => handleQuantityInputChange(cartItem.quantity)}
                                >
                                    Edit CartnItem
                                </button>
                                <button className="button-danger"
                                    onClick={() => handleDeleteCartItem(cartItem.productId)}
                                >
                                    Delete Cart Item
                                </button>
                            </>)
                    }

                </div>
            </div>
        </div>
    )
}

export default CartItemDetails