import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FacultyDetail = () => {
  const { id } = useParams();
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiDomanin = import.meta.env.VITE_API_DOMAIN;
    // Fetch the faculty details using the ID from the URL
    axios
      .get(`${apiDomanin}/api/faculty/getfaculty/${id}`)
      .then((response) => {
        setSelectedFaculty(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching faculty details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading faculty details...</p>;
  }

  if (!selectedFaculty) {
    return <p>Faculty not found!</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Faculty Image */}
      <div className="flex justify-center mb-4">
        <img
          src={
            selectedFaculty.userId.image || "https://via.placeholder.com/150"
          }
          alt={`${selectedFaculty.userId.name}'s profile`}
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>

      {/* Faculty Name and Bio */}
      <h1 className="text-3xl font-bold text-blue-500 mb-4">
        {selectedFaculty.userId.name}
      </h1>
      <p className="text-lg text-gray-700 mb-4">{selectedFaculty.userId.bio}</p>
      <p className="text-lg text-gray-700 mb-4">
        {selectedFaculty.userId.department}
      </p>
    </div>
  );
};

export default FacultyDetail;
