import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import "../styles/login.css";
import { toast } from "react-toastify";
import { postData } from "../utils/api";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if(auth.loginStatus){
      navigate("/dashboard");
    }
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      return toast.warn("All fields are required!");
    }

    try {
      const response = await postData("login", {
        username,
        password,
      });
      if (response.status === 200) {
        auth.setLoginStatus('true');
        navigate("/dashboard");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="loginWrapper">
      <h1 className="logoHeading">Wiggles</h1>
      <div className="loginContainer">
        <h1>Admin Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="usernameContainer">
            <input
              type="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </div>
          <div className="pwdContainer">
            <input
              type={isRevealPwd ? "text" : "password"}
              name="pwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <IconContext.Provider value={{ className: "revealPwd" }}>
              <span onClick={() => setIsRevealPwd(!isRevealPwd)}>
                {isRevealPwd ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </IconContext.Provider>
          </div>
          <div className="secondaryLogin">
            <button className="btn" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
