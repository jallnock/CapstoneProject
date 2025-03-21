import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import RestaurantDetails from "./components/RestaurantDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import RestaurantsList from "./components/RestaurantList";
import Account from "./components/Account";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <NavBar token={token} logout={logout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/account" element={<Account />} />
        <Route path="/restaurants" element={<RestaurantsList />} />
      </Routes>
    </Router>
  );
}

export default App;
