import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import FacultyCard from "../components/FacultyCard";
import { SupervisorContext } from "../context/SearchContext";
import SearchBar from "../components/SearchBar";
import AdvancedFilter from "../components/AdvancedFilter";

const Faculty = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    filteredFaculties,
    updateFilters,
    loading,
    showSearch,
  } = useContext(SupervisorContext);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setSelectedDepartment(value);
    } else if (name === "research") {
      setSearchTerm(value);
    }
  };

  // Update filters in context
  useEffect(() => {
    updateFilters({
      department: selectedDepartment,
      tags: searchTerm ? [searchTerm] : [],
    });
  }, [selectedDepartment]);

  if (loading) {
    return <p>Loading faculty data...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showSearch && <SearchBar />}
      <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">
        Faculty Directory
      </h1>
      <div className="flex justify-between items-center mt-2 relative">
        <AdvancedFilter>
          <div className="flex flex-col justify-center p-5 ">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                id="department"
                value={selectedDepartment}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 rounded-lg bg-[hsl(220,15%,95%)] text-black focus:outline-none focus:ring-2 border border-[hsl(0,0,85%)]"
              >
                <option value="Computer Science & Engineering">
                  Computer Science & Engineering
                </option>
                <option value="Electrical & Electronics Engineering">
                  Electrical & Electronics Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Bachelor in Bussiness Administration">
                  Bachelor in Bussiness Administration
                </option>
                <option value="Economics">Economics</option>
                <option value="Biologofy & Chemistry ">
                  Biologofy & Chemistry{" "}
                </option>
                <option value="Biomedical Engineering">
                  Biomedical Engineering
                </option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Interests
              </label>
              <input
                type="text"
                name="research"
                value={searchTerm}
                onChange={handleFilterChange}
                placeholder="Search research interests..."
                className="w-full px-4 py-3 rounded-lg bg-[hsl(220,15%,95%)] text-black focus:outline-none focus:ring-2 border border-[hsl(0,0,85%)]"
              />
            </div>
          </div>
        </AdvancedFilter>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculties.map((faculty) => (
          <Link to={`/faculty/${faculty._id}`} key={faculty._id}>
            <FacultyCard faculty={faculty} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
