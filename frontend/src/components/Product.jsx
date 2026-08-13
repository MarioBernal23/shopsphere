function Product({ product }) {
    return (
        <div>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price} €</p>
            <p>{product.categoryName}</p>
        </div>
    );
 
}

export default Product;