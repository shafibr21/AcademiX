import { createContext, useState, useEffect } from "react";
const SupervisorContext = createContext();

const SupervisorProvider = ({ children }) => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Function to update filters from the UI
  const updateFilters = (filters) => {
    setSearchTerm(filters.searchTerm || "");
    setSelectedDepartment(filters.department || "");
    setSelectedTags(filters.tags || []);
  };

  // Function to fetch faculties based on current filters
  const fetchFaculties = async () => {
    setLoading(true);

    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;
      const params = new URLSearchParams();
      if (searchTerm) params.append("searchTerm", searchTerm);
      if (selectedDepartment) params.append("department", selectedDepartment);
      if (selectedTags.length > 0)
        params.append("tags", selectedTags.join(","));

      const response = await fetch(
        `${apiDomain}/api/faculty/getfaculty?${params.toString()}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();

      if (result) {
        setFilteredFaculties(result);
      } else {
        console.error("Failed to fetch faculties");
      }
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch faculties whenever filters change
  useEffect(() => {
    fetchFaculties();
  }, [selectedDepartment, selectedTags]);

  return (
    <SupervisorContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedDepartment,
        setSelectedDepartment,
        selectedTags,
        setSelectedTags,
        filteredFaculties,
        updateFilters,
        loading,
        fetchFaculties,
        showSearch,
        setShowSearch,
      }}
    >
      {children}
    </SupervisorContext.Provider>
  );
};
export { SupervisorContext, SupervisorProvider };
