import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CreateContact from "./CreateContact";
import AllContact from "./AllContact";

function Home() {
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    !user && nav("/login", { replace: true });
  }, []);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-lg-8">
            <div className="jumbotron">
              <h3 className="display-5">Welcome!! {user ? user.name : null}</h3>
              <hr
                className="my-2"
                style={{
                  width: "80%",
                }}
              />
              <p className="lead">Add, Edit or Delete Your Contacts</p>
              {/* <a className="btn btn-outline-info" href="#" role="button">
                Add Contacts
              </a> */}
              <AllContact />
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="create-contact-container"
              style={{ maxWidth: "100%" }}
            >
              <CreateContact />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
