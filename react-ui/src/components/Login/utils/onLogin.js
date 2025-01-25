import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState({ isError: false, message: "" });

  const navigate = useNavigate();

  const onLogin = async (email, password) => {
    try {
      if (email.trim() === "" || password.trim() === "") {
        setError({ isError: true, message: "Email and password are required" });
        return;
      }

      const response = await axios.post("http://localhost:8000/users/login", {
        email,
        password,
      });

      console.log("response:", response);
      const { username, role, user_id } = response.data;
      const userDetails = { username, email, role, id: user_id };

      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      // setUser(username);
      // setIsLoggedIn(true);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError({ isError: true, message: "Invalid email or password" });
    }
  };

  return { onLogin, error };
};
