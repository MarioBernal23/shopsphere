import { useState } from "react";

function ProductAdmin({ product, categories, onDelete, onUpdate }) {

    const [editing, setEditing] = useState(false);

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [image, setImage] = useState(product.image);
    const [stock, setStock] = useState(product.stock);
    const [categoryId, setCategoryId] = useState(product.categoryId);

    function handleSubmit(event) {
        event.preventDefault();

        onUpdate(product.id, {
            name,
            description,
            price,
            image,
            stock,
            category: {
                id: Number(categoryId)
            }
        });

        setEditing(false);
    }

    return (
        <div>
            <h3>{product.name}</h3>
            <p>Descripción: {product.description}</p>
            <p>Precio: {product.price} €</p>
            <p>Stock: {product.stock}</p>
            <p>Categoría: {product.categoryName}</p>

            <button onClick={() => setEditing(true)}>
                Editar
            </button>

            <button onClick={() => onDelete(product.id)}>
                Eliminar
            </button>

            {
                editing && (
                    <form onSubmit={handleSubmit}>

                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                        <input
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />

                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />

                        <input
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                        />

                        <input
                            type="number"
                            value={stock}
                            onChange={(event) => setStock(event.target.value)}
                        />

                        <select
                            value={categoryId}
                            onChange={(event) => setCategoryId(event.target.value)}
                        >
                            {
                                categories.map(category => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>

                        <button type="submit">
                            Guardar
                        </button>

                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                        >
                            Cancelar
                        </button>

                    </form>
                )
            }
        </div>
    );
}

export default ProductAdmin;