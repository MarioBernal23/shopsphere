import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <footer>
                <h3>FooTER</h3>
            </footer>
        </div>
    )
}

export default Layout