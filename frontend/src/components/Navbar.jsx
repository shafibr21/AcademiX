import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    // Remove the authentication token
    localStorage.removeItem("authToken");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Left side div */}
      <Link to="/" className="ml-10">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      {/* Middle side div */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 border-2 p-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-gray-300 text-gray-700"
            }`
          }
        >
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/faculty"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 border-2 p-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-gray-300 text-gray-700"
            }`
          }
        >
          <p>Faculty</p>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 border-2 p-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-gray-300 text-gray-700"
            }`
          }
        >
          <p>About</p>
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 border-2 p-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-gray-300 text-gray-700"
            }`
          }
        >
          <p>Projects</p>
        </NavLink>
      </ul>

      {/* Right side div */}
      <div className="flex items-center gap-6 mr-10">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {authToken ? (
          <div className="group relative">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="Profile"
            />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <Link to="/profile" className="cursor-pointer hover:text-black">
                  <p>My Profile</p>
                </Link>
                <Link to="/thesis" className="cursor-pointer hover:text-black">
                  <p>Thesis</p>
                </Link>
                <Link
                  to="/progress"
                  className="cursor-pointer hover:text-black"
                >
                  <p>Progress</p>
                </Link>
                <p
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
