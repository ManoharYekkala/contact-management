import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContextToast from "../context/ContextToast";
import AuthContext from "../context/AuthContext";

function Navbar({ title = "Contactium" }) {
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ContextToast);
  const nav = useNavigate();
  return (
    <nav
      className="navbar navbar-expand-lg bg-primary"
      style={{ height: "60px" }}
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to="/" style={{ textDecoration: "none" }}>
          <a className="navbar-brand">{title}</a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item ">
                  <Link to="/createcontact" style={{ textDecoration: "none" }}>
                    <a className="nav-link ">Add Contact</a>
                  </Link>
                </li>
                <li className="nav-item " style={{ marginLeft: "16px" }}>
                  <button
                    className="btn d-flex align-items-center btn-dark ml-3"
                    onClick={() => {
                      setUser(null);
                      toast.success("Logged Out successfully ");
                      localStorage.clear();
                      nav("/login", { replace: true });
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <a className="nav-link">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <a className="nav-link">Register</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
