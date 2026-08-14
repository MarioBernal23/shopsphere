import { Link } from "react-router-dom";

function Order ({ order }) {
    return (
        <div>
            <h3>Pedido #{order.id}</h3>
            <p>Total: {order.total} €</p>
            <p>Estado: {order.status}</p>
            <p>Fecha: {order.createdAt}</p>
            <Link to={`/orders/${order.id}`}>Ver mas detalles</Link>
        </div>
    )
}

export default Order