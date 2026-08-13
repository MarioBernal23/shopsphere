import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/productService";

function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function loadProduct() {
            const product = await productService.getProductById(id);
            setProduct(product);
        }
        loadProduct();
    }, [id]);

    if (!product) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price} €</p>
            <p>{product.categoryName}</p>
            <p>Stock: {product.stock}</p>
        </div>
    );
}

export default ProductDetailPage;