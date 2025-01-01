import React, { useEffect, useState } from "react";
import axios from "axios";

const ThesisRequests = ({ userId }) => {
  const [thesisRequests, setThesisRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchThesisRequests = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;

        // Debugging API domain and userId
        console.log("API Domain:", apiDomain);
        console.log("User ID:", userId);

        // Ensure required variables are present
        if (!apiDomain) {
          throw new Error(
            "API domain is not defined in environment variables."
          );
        }
        if (!userId) {
          throw new Error("User ID is not provided.");
        }

        const response = await axios.get(
          `${apiDomain}/api/faculty/thesisrequests/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        // Debugging response data
        console.log("Thesis Requests Response:", response.data);

        setThesisRequests(response.data.thesisRequests);
      } catch (error) {
        console.error("Error fetching thesis requests:", error);

        // Enhanced error handling
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          setError(error.response.data.message || "An error occurred.");
        } else {
          setError(error.message || "An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchThesisRequests();
  }, [userId]); // Ensure this dependency is properly set

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
