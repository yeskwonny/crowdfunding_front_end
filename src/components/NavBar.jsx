import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";

function NavBar() {
  return (
    <div>
      <nav className="nav-bar">
        <Link to="/" className="home">
          MakeCine
        </Link>
        <div className="sub-cat">
          <Link to="/project">Start a project</Link>
          <Link to="/login">Sign in</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
