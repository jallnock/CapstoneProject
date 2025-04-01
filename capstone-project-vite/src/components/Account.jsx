import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "./api";

function Account() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchCurrentUser();
        console.log("FULL API RESPONSE:", data);
        setUser(data);
      } catch (error) {
        console.error("Cannot load user", error);
        setError("Unable to load account");
      }
    };
    getUser();
  }, []);

  if (error)
    return (
      <p style={{ color: "red", padding: "2rem", textAlign: "center" }}>
        {error}
      </p>
    );

  if (!user)
    return (
      <p style={{ padding: "2rem", textAlign: "center" }}>
        Loading your account...
      </p>
    );

  return (
    <div className="page-content">
      <div className="container">
        <div className="account-card">
          <h2>Welcome, {user.username || "Guest"}!</h2>
          <p>
            <strong>Email:</strong> {user.email || "Not provided"}
          </p>
          <p>
            <strong>Name:</strong> {user.name || "Not available"}
          </p>

          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
