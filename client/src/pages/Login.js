import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import ContextToast from "../context/ContextToast";

function Login() {
  const { toast } = useContext(ContextToast);
  const { loginUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error("Please fill all the required fields");
      return;
    }
    // toast.success(`${credentials.email} logged in successfully`);
    loginUser(credentials);
  };
  return (
    <div>
      {/* <ToastContainer autoClose={2000} /> */}
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onInputChange}
            placeholder="Enter Your Email"
            required
          />
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            id="passwordInput"
            onChange={onInputChange}
            placeholder="Enter Your Password"
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary my-4"
        ></input>
        <p>
          Don't have an account? <Link to="/register">Create account?</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
