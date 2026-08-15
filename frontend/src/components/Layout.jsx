import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/layout.css";

function Layout() {
   return (
        <div className="layout">
            <Navbar />

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="footer">
                <p>ShopSphere © 2026</p>
            </footer>
        </div>
    );
}

export default Layout