import { useState } from "react";
import "../styles/category.css"

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
        <div className="category">
            <h3>{category.name}</h3>

            <div className="category-actions">
                <button
                    className="category-edit"
                    onClick={() => setEditing(true)}
                >
                    Edit
                </button>

                <button
                    className="category-delete"
                    onClick={() => onDelete(category.id)}
                >
                    Delete
                </button>
            </div>

            {
                editing && (
                    <form onSubmit={handleSubmit}>

                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                        <button type="submit">
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </button>

                    </form>
                )
            }
        </div>
    );
}

export default Category;