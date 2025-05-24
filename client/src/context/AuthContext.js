import React, { createContext, useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ContextToast from "./ContextToast";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { toast } = useContext(ContextToast);
  const nav = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  let [error, setError] = useState(null);

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const isUserLoggedIn = async () => {
    try {
      const res = await fetch(`${process.env.HOST}/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          setTimeout(() => {
            nav("/", { replace: true });
          }, 500);
        } else {
          nav(location.pathname ? location.pathname : "/");
        }
        setUser(result);
      } else {
        nav("/login", { replace: true });
      }
    } catch (error) {}
  };

  //login
  const loginUser = async (userData) => {
    try {
      const res = await fetch(`${process.env.HOST}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      // console.log(result);
      if (!result.error) {
        // console.log(result);
        localStorage.setItem("token", result.token);
        setUser(result.user);
        toast.success(`${result.user.name} successfully logged in`);
        nav("/", { replace: true });
      } else {
        // console.log(result.error);
        // setError(result.error);
        // error = result.error;
        // toast.error(error);
        // error = null;
        // setError(null);
        toast.error(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //register
  const registerUser = async (userData) => {
    try {
      const res = await fetch(`${process.env.HOST}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success("Successfully registered, Login into you account");
        nav("/login", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>
      {/* <ToastContainer autoClose={2000} /> */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
