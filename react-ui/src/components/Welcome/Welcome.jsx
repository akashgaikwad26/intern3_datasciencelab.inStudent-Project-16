import { parse } from "utils/parse";
import "./welcome.css";

export function Welcome() {
  const { username } = parse(localStorage.getItem("userDetails"));
  return (
    <div className="welcome">
      <span className="emoji">👋</span>
      <h1>Welcome, {username}</h1>
    </div>
  );
}
