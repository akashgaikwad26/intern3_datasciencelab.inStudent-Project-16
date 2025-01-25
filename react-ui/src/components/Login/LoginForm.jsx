import { collab_icon } from "assets/images/ExportImages";
import { useState } from "react";
import "./login.css";
import { useLogin } from "./utils/onLogin";

export function LoginForm({ setUser, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    // onLogin(email, password, setUser, setIsLoggedIn, setError);
    onLogin(email, password);
  };

  return (
    <div className="login-form">
      <header className="login-header">
        <img
          src={collab_icon}
          alt="Collaboration Icon"
          className="collab-icon"
        />

        <h2>Login to Collabration</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            className="input"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="input"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>{error.isError && <p className="error">{error.message}</p>}</div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
