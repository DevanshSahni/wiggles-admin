import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(localStorage.getItem("auth") && localStorage.getItem("auth")!=="false" ? true:false);
  const navigate = useNavigate(); 

  useEffect(() => {
    localStorage.setItem("auth", loginStatus);
    if(!loginStatus){
      navigate("/login");
    }
  }, [loginStatus]);

  return (
    <AuthContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
