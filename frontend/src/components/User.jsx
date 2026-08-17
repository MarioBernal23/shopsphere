import { useState } from "react";
import "../styles/user.css"

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
        <div className="user">
            <div className="user-info">
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
            </div>

            <p className="user-role">Role: {user.role}</p>

            <div className="user-actions">
                <button
                    className="user-edit"
                    onClick={() => setEditing(true)}
                >
                    Edit
                </button>

                <button
                    className="user-delete"
                    onClick={() => onDelete(user.id)}
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

                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="New password"
                        />

                        <select
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>

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

export default User;