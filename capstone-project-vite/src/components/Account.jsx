import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "./api";

function Account() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUser(data.user);
      } catch (error) {
        console.error("Cannot load user", error);
        setError("Unable to load account");
      }
    };
    getUser();
  }, []);
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Loading your account...</p>;

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
    </div>
  );
}

export default Account;
