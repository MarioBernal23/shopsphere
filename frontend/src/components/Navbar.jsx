import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav>
            <div><Link to="/"><h2>ShopSphere</h2></Link></div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    )
}

export default Navbar