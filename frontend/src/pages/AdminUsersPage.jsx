import { useEffect, useState } from "react";
import userService from "../services/userService";
import User from "../components/User";
import "../styles/admin-users-page.css"

function AdminUsersPage() {

    const [users, setUsers] = useState([]);
    const [creating, setCreating] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");

    useEffect(() => {
        async function loadUsers() {
            const users = await userService.getUsers();
            setUsers(users);
        }

        loadUsers();
    }, []);

    async function handleCreate(event) {
        event.preventDefault();

        await userService.createUser({
            name,
            email,
            password,
            role
        });

        const users = await userService.getUsers();
        setUsers(users);

        setName("");
        setEmail("");
        setPassword("");
        setRole("USER");
        setCreating(false);
    }

    async function handleDelete(userId) {
        await userService.deleteUser(userId);

        const users = await userService.getUsers();
        setUsers(users);
    }

    async function handleUpdate(userId, userData) {
        await userService.updateUser(userId, userData);

        const users = await userService.getUsers();
        setUsers(users);
    }

    return (
        <div className="admin-users-page">
            <h2>Manage Users</h2>

            <button onClick={() => setCreating(true)}>
                Create user
            </button>
            {
            creating && (
                <form onSubmit={handleCreate}>

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <select
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>

                    <button type="submit">
                        Create
                    </button>

                    <button
                        type="button"
                        onClick={() => setCreating(false)}
                    >
                        Cancel
                    </button>

                </form>
            )
        }
            {
                users.map(user => (
                    <User
                        key={user.id}
                        user={user}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))
            }
        </div>
    );
}

export default AdminUsersPage;