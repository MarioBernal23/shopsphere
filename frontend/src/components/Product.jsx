import { Link } from "react-router-dom";
import "../styles/product.css"

function Product({ product }) {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-category">{product.categoryName}</p>
            <p className="product-price">{product.price} €</p>
            <Link to={`/products/${product.id}`}>View Product</Link>
        </div>
    );
 
}

export default Product;