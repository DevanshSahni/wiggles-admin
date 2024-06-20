import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const ProtectedRoute = ({children}) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loginStatus) {
      toast.error("Kindly login first.");
      navigate("/login");
    }
  }, [auth.loginStatus, navigate]);

  return auth.loginStatus ? children : <Loader />;
};

export default ProtectedRoute;
