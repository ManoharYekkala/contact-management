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
        <h1 class="display-4">Welcome!! {user ? user.name : <></>}</h1>
        <p class="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr class="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <a class="btn btn-outline-info" href="#" role="button">
          Learn more
        </a>
      </div>
    </>
  );
}

export default Home;
