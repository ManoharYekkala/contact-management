import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import ContextToast from "../context/ContextToast";

function Register() {
  const { toast } = useContext(ContextToast);
  const { registerUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("Please fill all the required fields");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords are not matching, Please check");
      return;
    }
    const userCreds = { ...credentials, confirmPassword: undefined };
    registerUser(userCreds);
  };

  return (
    <div>
      <h3>Create a account</h3>
      {/* <ToastContainer autoClose={2000} /> */}

      <form onSubmit={handleSubmit}>
        <div class="form-floating mb-3 mt-3">
          <input
            type="text"
            class="form-control"
            id="nameInput"
            name="name"
            value={credentials.name}
            onChange={onInputChange}
            placeholder="Enter your name"
            required
          />
          <label for="nameInput">Your Name</label>
        </div>
        <div class="form-floating mb-3 mt-3">
          <input
            type="email"
            class="form-control"
            id="emailInput"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onInputChange}
            placeholder="Enter Your Email"
            required
          />
          <label for="emailInput">Email address</label>
          {/* <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
        </div>
        <div class="form-floating mb-3 mt-3">
          <input
            type="text"
            class="form-control"
            id="mobileInput"
            name="mobile"
            value={credentials.mobile}
            onChange={onInputChange}
            placeholder="Enter your mobile number"
            required
          />
          <label for="mobileInput">Mobile Number</label>
        </div>
        <div class="form-floating mb-3 mt-3">
          <input
            type="password"
            class="form-control"
            name="password"
            id="passwordInput"
            value={credentials.password}
            onChange={onInputChange}
            placeholder="Enter Your Password"
            required
          />
          <label for="passwordInput">Password</label>
        </div>
        <div class="form-floating mb-3 mt-3">
          <input
            type="password"
            class="form-control"
            name="confirmPassword"
            value={credentials.confirmPassword}
            id="confirmPassword"
            onChange={onInputChange}
            placeholder="Re-enter Your Password"
            required
          />
          <label for="confirmPassword">Confirm Password</label>
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary my-4"
        ></input>
        <p>
          Already have an account? <Link to="/login">Login now</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
