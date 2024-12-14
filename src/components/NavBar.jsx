import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import "./NavBar.css";

function NavBar() {
  const { auth, setAuth } = useAuth();
  // console.log(auth.token);
  function handleLogout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_id");
    setAuth({ token: null });
  }
  return (
    <div>
      <nav className="nav-bar">
        <Link to="/" className="home">
          MakeCine
        </Link>
        <div className="sub-cat">
          <Link to="/project">Start a project</Link>
          {auth.token ? (
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Sign in</Link>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
