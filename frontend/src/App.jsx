import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Faculty from "./pages/Faculty";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import FacultyDetail from "./components/FacultyDetail";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "./components/SearchBar";
import SignUp from "./pages/SignUp";
import ProfilePage from "./pages/ProfilePage";
import Contribution from "./pages/Contribution";
import ProjectDetails from "./components/ProjectDetails";
import PostThesisIdea from "./pages/PostThesisIdea";

const App = () => {
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/login" && location.pathname !== "/signup";
  return (
    <div>
      <ToastContainer />
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faculty/:id" element={<FacultyDetail />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contribution" element={<Contribution />} />
        <Route path="/post-thesis-idea" element={<PostThesisIdea />} />
      </Routes>
    </div>
  );
};

export default App;
