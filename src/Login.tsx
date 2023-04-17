import { useState, useRef, useEffect, FormEvent, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth";

import "./scss/Register.scss";
const Login = () => {
  const [username, setUsername] = useState("Piotrek123");
  const [password, setPassword] = useState("piotrek123");
  const [errMsg, setErrMsg] = useState("");
  const userRef = useRef<HTMLInputElement>(null);
  const { setAuth, setPersist, persist } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const PASSWORD_REGEX = /.{1,20}/; ///^[a-zA-Z0-9]{4,20}/;
  const USERNAME_REGEX = /.{1,20}/; ///^[a-zA-Z0-9]{4,20}/;
  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  const handlePersistCheckbox = () => {
    setPersist(prev => !prev);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!PASSWORD_REGEX.test(password) || !USERNAME_REGEX.test(username)) return;

    try {
      console.log(username, password);
      const response = await fetch("http://localhost:3500/user/auth", {
        method: "POST",
        mode: "cors",
        // cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) throw new Error("Cannot sign in.");
      const data = await response.json();
      console.log(data);

      const accessToken = data?.accessToken;
      const roles = [100, 300];

      setAuth({ username, password, accessToken, roles });

      setUsername("");
      setPassword("");
      setErrMsg("");
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        setErrMsg(err.message);
      } else {
        console.log("Login failed");
      }
    }
    // console.log("Form submitted!");
  };

  return (
    <section className="register-form-wrapper">
      <form onSubmit={handleSubmit} className="register-form">
        <span className={`errorMessage ${errMsg ? "active" : ""}`}>{errMsg}</span>
        <h2>Sign in</h2>
        <div className="input-element">
          <input
            type="text"
            id="user-input"
            ref={userRef}
            onChange={e => setUsername(e.target.value)}
            required
            placeholder="Username"
            autoComplete="off"
            value={username}
          />
        </div>
        <div className="input-element">
          <input
            type="password"
            id="password-input"
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>
        <button>Sign In</button>
        <input type="checkbox" id="persist" onChange={handlePersistCheckbox} checked={persist} />
        <label htmlFor="persist">Trust this browser</label>
      </form>
      <p>
        Don't have account? <Link to="/register">register here</Link>
      </p>
    </section>
  );
};

export default Login;
