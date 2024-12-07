import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FacultyCard from "../components/FacultyCard";
import { faculty } from "../assets/assets";

const Faculty = () => {
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    setFacultyData(faculty);
  }, []);

  if (facultyData.length === 0) {
    return <p>Loading faculty data...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">
        Faculty Directory
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyData.map((faculty) => (
          <Link to={`/faculty/${faculty.id}`} key={faculty.id}>
            <FacultyCard faculty={faculty} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
