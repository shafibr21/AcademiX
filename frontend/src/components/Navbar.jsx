import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src="" className="w-36" alt="Logo" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-500" : ""
            }`
          }
        >
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/faculty"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-500" : ""
            }`
          }
        >
          <p>Faculty</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-500" : ""
            }`
          }
        >
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-500" : ""
            }`
          }
        >
          <p>Projects</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <Link to="/login">
        <img src="" className="w-5 cursor-pointer" alt="Login Icon" />
      </Link>
    </div>
  );
};

export default Navbar;
