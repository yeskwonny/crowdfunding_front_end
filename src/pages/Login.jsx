import { Link } from "react-router-dom";
import LoginFrom from "../components/LoginForm";
import "./Login.css";

function Login() {
  return (
    <>
      <LoginFrom />
      <div className="signup-link">
        <Link to="/signup" className="signup">
          Are you new to MakeCine?
        </Link>
      </div>
    </>
  );
}

export default Login;
