import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthenticationContext } from "../context/AuthenticationContext"

function Navbar() {

    const { authenticated } = useContext(AuthenticationContext);
    
    return (
        <nav>
            <div><Link to="/"><h2>ShopSphere</h2></Link></div>
            <div>
                <Link to="/">Home</Link>
                {
                    authenticated ? (
                        <Link to ="/">Logout</Link>
                    ) : (
                        <Link to="/login">Login</Link>
                    )
                }

            </div>
        </nav>
    )
}

export default Navbar