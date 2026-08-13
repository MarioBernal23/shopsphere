
function CartItem({ item }) {
    return(
        <div>
            <h3>{item.productName}</h3>
            <p>Precio: {item.price} €</p>
            <p>Cantidad: {item.quantity}</p>
            <p>Subtotal: {item.subtotal} €</p>
        </div>
    )
}

export default CartItem;