import { useState } from "react";
import { useEffect } from "react";
import cartService from "../services/cartService";
import CartItem from "../components/CartItem";

function CartPage() {

    const [cart, setCart] = useState(null)

    useEffect(() => {
        async function loadCart() {
            const cart = await cartService.getCart();
            setCart(cart);
        }

        loadCart();
    }, []);

    if (!cart) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h2>Mi carrito</h2>

            <p>ID del Carrito: {cart.id}</p> 
            <h3>Productos</h3>

            {
                cart.items.map(item => (
                    <CartItem 
                        key={item.productId}
                        item={item}
                    />
                ))
            }

        <h3>Total: {cart.total} €</h3>

        </div>
    );
}

export default CartPage;