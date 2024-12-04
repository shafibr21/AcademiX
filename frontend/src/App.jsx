import { useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
