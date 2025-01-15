import axios from "axios";

export const onLogin = async (email, password, setUser, setIsLoggedIn) => {
  try {
    const response = await axios.post("http://localhost:8000/users/login", {
      email,
      password,
    });

    console.log("response:", response);
    const { username, role } = response.data;
    const userDetails = { username, email, role };

    // localStorage.setItem("token", token);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(username);
    setIsLoggedIn(true);
  } catch (error) {
    console.error("Login failed:", error);
  }
};
