import { useState } from "react";

function User({ user, onDelete, onUpdate }) {

    const [editing, setEditing] = useState(false);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        onUpdate(user.id, {
            name,
            email,
            role,
            password
        });

        setEditing(false);
    }

    return (
        <div>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Rol: {user.role}</p>

            <button onClick={() => setEditing(true)}>
                Editar
            </button>

            <button onClick={() => onDelete(user.id)}>
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
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Nueva contraseña"
                        />

                        <select
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
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

export default User;