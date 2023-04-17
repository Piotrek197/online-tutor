import { Link, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import axios from "./axios";

const LinkPage = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const onSignOut = async () => {
    try {
      await axios("/logout", { withCredentials: true });
      setAuth({ username: "", password: "", accessToken: "", roles: [] });
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <h1>Link Page</h1>
      <div className="public-routes" style={{ margin: "1rem" }}>
        <h2>Public Routes</h2>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
      </div>
      <div className="private-routes" style={{ margin: "1rem" }}>
        <h2>Private Routes</h2>
        <Link to="/">Home</Link>
        <br />
        <Link to="/admin">Admin</Link>
      </div>
      <button onClick={onSignOut}>Sign Out</button>
    </section>
  );
};

export default LinkPage;
