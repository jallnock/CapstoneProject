import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import RestaurantDetails from "./components/RestaurantDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import RestaurantsList from "./components/RestaurantList";
import Account from "./components/Account";
import AddRestaurantForm from "./components/AddNewRestaurantForm";
import "./App.css";

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
        <Route
          path="/"
          element={token ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/restaurant/:id"
          element={token ? <RestaurantDetails /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route
          path="/account"
          element={token ? <Account /> : <Navigate to="/login" />}
        />
        <Route
          path="/restaurants"
          element={token ? <RestaurantsList /> : <Navigate to="/login" />}
        />
        <Route path="/add-restaurant" element={<AddRestaurantForm />} />
      </Routes>
    </Router>
  );
}

export default App;
