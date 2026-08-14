import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderService from "../services/orderService";
import Product from "../components/Product";

function OrderDetailPage() {
    const { id } = useParams();

    const [order, setOrder] = useState(null)

    useEffect(() => {
        async function loadOrder() {
            const order = await orderService.getOrderById(id);
            setOrder(order);
        }

        loadOrder();
    }, [id]);

    if (!order) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h2>Pedido #{order.id}</h2>

            <p>Estado: {order.status}</p>
            <p>Fecha: {order.createdAt}</p>

            <h3>Productos</h3>

            {
                  order.items.map(item => ( 
                    <div key={item.productId}> 
                        <h4>{item.productName}</h4> 
                        <p>Precio: {item.price} €</p> 
                        <p>Cantidad: {item.quantity}</p> 
                        <p>Subtotal: {item.subtotal} €</p> 
                    </div> 
                ))
            }

            <h3>Total: {order.total} €</h3>
        </div>
    );
}

export default OrderDetailPage;
