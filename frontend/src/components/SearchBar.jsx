import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { SupervisorContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { searchTerm, setSearchTerm, setShowSearch, fetchFaculties } =
    useContext(SupervisorContext);
  const [filteredResults, setFilteredResults] = useState([]);

  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="absolute top-full mt-2 w-full">
        <div className="border-t border-b bg-gray-50 text-center">
          <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <input
              type="text"
              placeholder="Search for faculty, fields, or papers"
              className="flex-1 outline-none bg-inherit text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              className="w-4"
              src={assets.search_icon}
              alt=""
              onClick={fetchFaculties}
            />
          </div>
          <img
            onClick={() => setShowSearch(false)}
            src={assets.cross_icon}
            className="inline w-3 cursor-pointer"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
