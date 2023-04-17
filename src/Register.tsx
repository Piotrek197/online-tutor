import { useState, useEffect, ChangeEvent, useRef, FormEvent } from "react";
import { Link } from "react-router-dom";
import "./scss/Register.scss";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const PASSWORD_REGEX: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const PASSWORD_REGEX = /^./;
    const USERNAME_REGEX = /^[a-zA-Z0-9]{4,20}$/;
    const pwd = PASSWORD_REGEX.test(password);
    const user = USERNAME_REGEX.test(username);

    if (!pwd || !user) return;

    try {
      const response = await fetch("http://localhost:3500/user/register", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) throw new Error("Cannot register new user");
      setUsername("");
      setEmail("");
      setPassword("");
      setErrMsg("");
      console.log(`User ${username} successfuly created!`);
    } catch (err) {
      if (err instanceof Error) {
        setErrMsg(err.message);
        console.log(err.message);
      } else console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (usernameInputRef.current) usernameInputRef.current.focus();
  }, []);

  return (
    <div className="register-form-wrapper">
      <form className="register-form" onSubmit={e => handleSubmit(e)}>
        <div className={`errorMessage ${errMsg ? "active" : ""}`}>Error: {errMsg}</div>
        <h2>Register Form</h2>
        <div className="input-element">
          <input
            type="text"
            id="username"
            placeholder="Username"
            autoComplete="off"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            ref={usernameInputRef}
          />
        </div>
        <div className="input-element">
          <input
            type="email"
            id="email"
            placeholder="email"
            autoComplete="off"
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input-element">
          <input
            type="password"
            id="password"
            placeholder="password"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>
        Already have account? <Link to="/login">sign in here</Link>
      </p>
    </div>
  );
};

export default Register;
