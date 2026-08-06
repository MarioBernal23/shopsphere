import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthenticationContext } from "../context/AuthenticationContext"
import { useNavigate } from "react-router-dom";

function Navbar() {

    const { authenticated, logout } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout()
        navigate("/")
    }
    return (
        <nav>
            <div><Link to="/"><h2>ShopSphere</h2></Link></div>
            <div>
                <Link to="/">Home</Link>
                {
                    authenticated ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar