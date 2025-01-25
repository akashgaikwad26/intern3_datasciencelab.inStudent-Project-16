import { parse } from "utils/parse";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import UsersDashboard from "./UsersDashboard/UsersDashboard";

export function Dashboards() {
  const userDetails = parse(localStorage.getItem("userDetails"));
  const { id, role, username } = userDetails;

  if (role === "manager" || role === "admin") {
    return (
      <AdminDashboard
        username={username}
        userId={id}
      />
    );
  }

  return (
    <UsersDashboard
      username={username}
      userId={id}
    />
  );
}
