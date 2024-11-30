import { Link } from "react-router-dom";
import LoginFrom from "../components/LoginForm";

function Login() {
  return (
    <div>
      <LoginFrom />
      <Link to="/signup" className="signup">
        Are you new to MakeCine?
      </Link>
    </div>
  );
}

export default Login;
