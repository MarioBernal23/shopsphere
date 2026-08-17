import { useState } from "react";
import { useEffect } from "react";
import orderService from "../services/orderService";
import Order from "../components/Order"
import "../styles/order-page.css"

function OrderPage() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function loadOrders() {
            const orders = await orderService.getOrders();
            setOrders(orders)
        }
        loadOrders()
    },[])

    return (
        <div className="order-page">
            <h2>My orders</h2>
            {
                orders.map(order => (
                    <Order
                        key={order.id}
                        order={order}
                    />
                ))
            }
        </div>
    );
}

export default OrderPage