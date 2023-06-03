import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && nav("/login", { replace: true });
  }, []);
  return (
    <>
      <div class="jumbotron">
        <h3 class="display-5">Welcome!! {user ? user.name : null}</h3>

        <hr class="my-2" />
        <p class="lead">Add, Edit or Delete Your Contacts</p>
        <a class="btn btn-outline-info" href="#" role="button">
          Add Contacts
        </a>
      </div>
    </>
  );
}

export default Home;
