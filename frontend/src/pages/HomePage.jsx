import { Link } from "react-router-dom";
import { useContext } from "react"
import { AuthenticationContext } from "../context/AuthenticationContext"
import "../styles/home.css";

function HomePage() {

  const { authenticated } = useContext(AuthenticationContext);

  return (
    <div className="home">
      <h1>ShopSphere</h1>
      <p>Everything you need, all in one place.</p>
      <p>Discover our products</p>
      
      {authenticated ? (
        <Link className="home-button" to="/products">
            View products
        </Link>
      ) : (
        <Link className="home-button" to="/login">
            Sign in
        </Link>
      )}
    </div>
  );
}

export default HomePage
