import { Link } from "react-router-dom";
import "../styles/admin-page.css"

function AdminPage() {
    return (
        <div className="admin-page">
            <h2>Admin Panel</h2>

            <Link to="/admin/users">Manage users</Link>

            <Link to="/admin/products">Manage products</Link>

            <Link to="/admin/categories">Manage categories</Link>
        </div>
    )
}

export default AdminPage