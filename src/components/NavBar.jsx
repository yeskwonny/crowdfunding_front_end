import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/project">Project</Link>
        <Link to="/login">Sign in</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
