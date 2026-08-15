import { useState } from "react";

function Category({ category, onDelete, onUpdate }) {

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(category.name);

    function handleSubmit(event) {
        event.preventDefault();

        onUpdate(category.id, {
            name
        });

        setEditing(false);
    }

    return (
        <div>
            <h3>{category.name}</h3>

            <button onClick={() => setEditing(true)}>
                Editar
            </button>

            <button onClick={() => onDelete(category.id)}>
                Eliminar
            </button>

            {
                editing && (
                    <form onSubmit={handleSubmit}>

                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

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

export default Category;