import axios from "axios";

export const onLogin = async (
  email,
  password,
  setUser,
  setIsLoggedIn,
  setError
) => {
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
    const { username, role } = response.data;
    const userDetails = { username, email, role };

    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    setUser(username);
    setIsLoggedIn(true);
  } catch (error) {
    console.error("Login failed:", error);
    setError({ isError: true, message: error.response.data.error });
  }
};
