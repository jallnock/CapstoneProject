import React from "react";
import { useNavigate } from "react-router-dom";

function Navigations({ token, logout }) {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => navigate("/restaurants")}>Restaurants</button>
        </li>
        {token ? (
          <>
            <li>
              <button onClick={() => navigate("/account")}>Account</button>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={() => navigate("/login")}>Login</button>
            </li>
            <li>
              <button onClick={() => navigate("/register")}>Register</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigations;
