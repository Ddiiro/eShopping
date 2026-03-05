import Header from '../../components/Header'
import OrdersGrid from './OrdersGrid';
import { useContext } from 'react';
import { ordersContext } from '../../App';

function OrderPage() {
    const cart = useContext(ordersContext);  
    return (
        <div>
            <Header cartItems={cart}/>
            <OrdersGrid />

        </div>
    )
}

export default OrderPage