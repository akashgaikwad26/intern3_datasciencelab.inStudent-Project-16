import { useEffect, useState } from "react";
import { Welcome } from "../Welcome";
import { LoginForm } from "./LoginForm";
import { fetchRelevantData } from "./utils/fetchRelevantData";

export function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchRelevantData();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <LoginForm
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
    );
  }

  return (
    <div className="login">
      <Welcome user={user} />
    </div>
  );
}
