import { Link } from "react-router-dom";

function AdminPage() {
    return (
        <div>
            <h2>Panel de administración</h2>

            <Link to="/admin/users">Gestionar usuarios</Link>

            <Link to="/admin/products">Gestionar productos</Link>

            <Link to="/admin/categories">Gestionar categorias</Link>
        </div>
    )
}

export default AdminPage