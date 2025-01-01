import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Contribution = ({ userId }) => {
  const [thesisIdeas, setThesisIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThesisIdeas = async () => {
      try {
        // Ensure userId is treated as a string
        const stringUserId = String(userId);
        console.log("Fetching thesis ideas for userId:", userId);
        const apiDomain = import.meta.env.VITE_API_DOMAIN;
        const response = await axios.get(
          `${apiDomain}/api/student/getThesisideas/student/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setThesisIdeas(response.data.data);
      } catch (error) {
        console.error("Error fetching thesis ideas:", error);
        setError(
          error.response?.data?.message || "Failed to fetch thesis ideas."
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchThesisIdeas();
  }, [userId]);

  const handleCardClick = (ideaId) => {
    // Navigate to a detailed view or perform an action
    navigate(`/projects/${ideaId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Thesis Ideas
      </h2>
      <div className="space-y-4">
        {thesisIdeas.map((idea) => (
          <div
            key={idea._id}
            className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer"
            onClick={() => handleCardClick(idea._id)}
          >
            {/* Thumbnail Placeholder */}
            <div className="w-24 h-24 bg-blue-100 rounded-md flex-shrink-0 flex items-center justify-center text-blue-500 font-bold text-xl">
              {idea.title[0]}
            </div>

            {/* Card Details */}
            <div className="ml-4 flex-grow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {idea.title}
              </h3>
              <div className="text-gray-700 mb-1">
                <span className="font-semibold">Research Area: </span>
                {idea.researchArea}
              </div>
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">Authors: </span>
                {idea.authors.slice(0, 2).join(", ")}
                {idea.authors.length > 2 && " and others"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contribution;
