import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Welcome } from "../Welcome/Welcome";
import { LoginForm } from "./LoginForm";
import { fetchRelevantData } from "./utils/fetchRelevantData";

export function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     fetchRelevantData();
  //   }
  // }, [isLoggedIn]);

  // if (!isLoggedIn) {
  //   return (
  //     <div className="App">
  //       <LoginForm
  //         setIsLoggedIn={setIsLoggedIn}
  //         setUser={setUser}
  //       />
  //     </div>
  //   );
  // }

  // return (
  //   <div className="login">
  //     <Welcome user={user} />
  //   </div>
  // );

  return (
    <div className="App">
      <LoginForm
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
    </div>
  );
}
