import { Link } from "react-router-dom";

function Product({ product }) {
    return (
        <div>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price} €</p>
            <p>{product.categoryName}</p>
            <Link to={`/products/${product.id}`}>Ver Producto</Link>
        </div>
    );
 
}

export default Product;