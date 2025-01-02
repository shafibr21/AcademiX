import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { SupervisorContext } from "../context/SearchContext";
import SearchBar from "./SearchBar";
const SubLink = ({ link, handleClick, desc }) => {
  return (
    <Link
      to={link}
      onClick={handleClick}
      className="cursor-pointer hover:text-black"
    >
      <p>{desc}</p>
    </Link>
  );
};
const Navbar = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = () => {
    // Remove the authentication token
    localStorage.removeItem("authToken");

    // Redirect to the login page
    navigate("/login");
  };
  const handlesubLink = () => {
    setDropdown(false);
  };
  const { setShowSearch, showSearch } = useContext(SupervisorContext);

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
                ? "border-black text-black"
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
        {(location.pathname === "/faculty" ||
          location.pathname === "/projects") && (
          <img
            onClick={() => setShowSearch(!showSearch)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />
        )}

        {authToken ? (
          <div className="group relative">
            <img
              onClick={() => setDropdown(!dropdown)}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="Profile"
            />
            <div
              className={`absolute dropdown-menu right-0 pt-4 z-50 ${
                dropdown ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <SubLink
                  link="/profile"
                  handleClick={handlesubLink}
                  desc="Profile"
                />
                <SubLink
                  link="/channels/"
                  handleClick={handlesubLink}
                  desc="Channel"
                />
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
            className="py-2 px-4 bg-black text-white rounded hover:bg-white hover:text-black transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
