import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, setShowSearch, faculty } =
    useContext(SearchContext);
  const [filteredResults, setFilteredResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (search.trim() !== "") {
      const results = faculty.filter((member) => {
        const nameMatch = member.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const fieldMatch = member.fieldOfInterest.some((field) =>
          field.toLowerCase().includes(search.toLowerCase())
        );
        const paperMatch = member.pastReleases.some((release) =>
          release.title.toLowerCase().includes(search.toLowerCase())
        );
        return nameMatch || fieldMatch || paperMatch;
      });
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [search, faculty]);

  return (
    <div className="relative">
      <div className="absolute top-full mt-2 w-full">
        <div className="border-t border-b bg-gray-50 text-center">
          <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <input
              type="text"
              placeholder="Search for faculty, fields, or papers"
              className="flex-1 outline-none bg-inherit text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <img className="w-4" src={assets.search_icon} alt="" />
          </div>
          <img
            onClick={() => setShowSearch(false)}
            src={assets.cross_icon}
            className="inline w-3 cursor-pointer"
            alt=""
          />
        </div>
        {filteredResults.length > 0 && (
          <div className="bg-white border border-gray-200 rounded shadow-md max-h-64 overflow-y-auto cursor-pointer">
            {filteredResults.map((member) => (
              <div
                onClick={() => navigate(`/faculty/${member.id}`)}
                key={member.id}
                className="p-3 border-b last:border-0 hover:bg-gray-500"
              >
                <h3 className="font-bold">{member.name}</h3>
                <p>
                  <span className="font-semibold">Fields:</span>{" "}
                  {member.fieldOfInterest.join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Papers:</span>{" "}
                  {member.pastReleases
                    .map((release) => release.title)
                    .join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
        {filteredResults.length === 0 && search.trim() && (
          <p className="p-3 text-sm text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
