import { Link } from "react-router-dom";
import "../styles/home.css";

function HomePage() {
  return (
    <div className="home">
      <h1>ShopSphere</h1>
      <p>Everything you need, all in one place.</p>
      <p>Discover our products</p>
      <Link className="home-button" to="/products">View products</Link>
    </div>
  );
}

export default HomePage
