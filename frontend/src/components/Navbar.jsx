import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthenticationContext } from "../context/AuthenticationContext"
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
function Navbar() {

    const { authenticated, role, logout } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout()
        navigate("/")
    }
    return (
        <nav className="navbar">
            <div><Link to="/"><h2>ShopSphere</h2></Link></div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {
                    authenticated ? (
                        <div className="navbar-actions">
                            <Link to="/products">Products</Link>
                            <Link to="/cart">My Cart</Link>
                            <Link to="/orders">My Orders</Link>
                             {
                                role === "ADMIN" && (
                                    <Link to="/admin">Admin</Link>
                                )
                            }
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <Link to="/login">Login</Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar