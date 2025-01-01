import React, { useEffect, useState } from "react";
import axios from "axios";

const ThesisRequests = () => {
  const [thesisRequests, setThesisRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchThesisRequests = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;
        const response = await axios.get(
          `${apiDomain}/api/faculty/thesisrequests`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setThesisRequests(response.data.thesisRequests);
      } catch (error) {
        console.error("Error fetching thesis requests:", error);
        setError("Failed to load thesis requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchThesisRequests();
  }, []);

  if (loading) return <div>Loading thesis requests...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Thesis Idea Requests</h1>
      {thesisRequests.length > 0 ? (
        <ul>
          {thesisRequests.map((thesis) => (
            <li
              key={thesis._id}
              className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm"
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
