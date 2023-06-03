import React, { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContextToast = createContext();

export const ToastContextProvider = ({ children }) => {
  return (
    <ContextToast.Provider value={{ toast }}>
      <ToastContainer autoClose={2000} />
      {children}
    </ContextToast.Provider>
  );
};

export default ContextToast;
