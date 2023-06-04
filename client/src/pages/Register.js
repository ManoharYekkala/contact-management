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
    <div className="container">
      <div className="row">
        <div className="col-md-6" style={{ maxHeight: "100%" }}>
          <div className="card rounded">
            <div className="card-body">
              <h3>Create an Account</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="name"
                    value={credentials.name}
                    onChange={onInputChange}
                    placeholder="Enter your name"
                    required
                  />
                  <label htmlFor="nameInput">Your Name</label>
                </div>
                <div className="form-floating mb-3 mt-3">
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
                  <label htmlFor="emailInput">Email address</label>
                </div>
                <div className="form-floating mb-3 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    id="mobileInput"
                    name="mobile"
                    value={credentials.mobile}
                    onChange={onInputChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                  <label htmlFor="mobileInput">Mobile Number</label>
                </div>
                <div className="form-floating mb-3 mt-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="passwordInput"
                    value={credentials.password}
                    onChange={onInputChange}
                    placeholder="Enter Your Password"
                    required
                  />
                  <label htmlFor="passwordInput">Password</label>
                </div>
                <div className="form-floating mb-3 mt-3">
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={credentials.confirmPassword}
                    id="confirmPassword"
                    onChange={onInputChange}
                    placeholder="Re-enter Your Password"
                    required
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary my-4"
                />
                <p>
                  Already have an account? <Link to="/login">Login now</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src="https://i.ibb.co/W0Nn8G2/register.png"
            alt="register"
            style={{
              width: "90%",
              height: "80%",
              marginLeft: "50px",
              marginTop: "30px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
