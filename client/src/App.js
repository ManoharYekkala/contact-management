import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ContextToast";
import CreateContact from "./pages/CreateContact";

function App() {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createcontact" element={<CreateContact />} />
          </Switch>
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
}

export default App;