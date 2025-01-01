import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ThesisRequests = ({ userId }) => {
  const [thesisRequests, setThesisRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThesisRequests = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;

        if (!apiDomain || !userId) {
          throw new Error("Missing API domain or user ID.");
        }

        const response = await axios.get(
          `${apiDomain}/api/faculty/thesisrequests/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        setThesisRequests(response.data.thesisRequests);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThesisRequests();
  }, [userId]);

  if (loading) return <div>Loading thesis requests...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Thesis Idea Requests</h1>
      {thesisRequests.length > 0 ? (
        <ul>
          {thesisRequests.map((thesis) => (
            <li
              key={thesis._id}
              onClick={() => navigate(`/thesis-review/${thesis._id}`)}
              className="cursor-pointer mb-4 p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
            >
              <h2 className="text-xl font-semibold">{thesis.title}</h2>
              <p className="mt-2 text-gray-600">{thesis.abstract}</p>
              <p className="mt-2 text-sm text-gray-500">
                Authors: {thesis.authors.join(", ")}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Research Area: {thesis.researchArea}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Requested by: {thesis.studentId?.name} (
                {thesis.studentId?.email})
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No thesis requests found.</p>
      )}
    </div>
  );
};

export default ThesisRequests;
