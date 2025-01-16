import "./welcome.css";

export function Welcome({ user }) {
  return (
    <div className="welcome">
      <span className="emoji">👋</span>
      <h1>Welcome, {user}</h1>
    </div>
  );
}
