import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./style.css";
import Login from "./components/Login";
import Register from "./components/Register";
import NavBar from "./components/NavBar";

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
}
