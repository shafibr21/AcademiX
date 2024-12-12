import React, { createContext, useState, useEffect } from "react";
import { faculty } from "../assets/assets";
import { toast } from "react-toastify";

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [facultyData, setFacultyData] = useState([]);

  const getFacultyData = () => {
    try {
      setFacultyData(faculty);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load faculty data.");
    }
  };

  useEffect(() => {
    getFacultyData();
  }, []);

  const value = {
    faculty: facultyData,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
