import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Contribution = (userId) => {
  const [thesisIdeas, setThesisIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Thesis Ideas</h2>
      {thesisIdeas.length > 0 ? (
        <ul className="list-disc pl-5">
          {thesisIdeas.map((idea) => (
            <li key={idea._id} className="mb-2">
              <div>
                <h3 className="text-lg font-semibold">{idea.title}</h3>
                <p>{idea.abstract}</p>
                <p>
                  <strong>Research Area:</strong> {idea.researchArea}
                </p>
                <p>
                  <strong>Authors:</strong> {idea.authors.join(", ")}
                </p>
                <p>
                  <strong>Status:</strong> {idea.status}
                </p>
                <p>
                  <strong>Publication Date:</strong>{" "}
                  {new Date(idea.publicationDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Links:</strong>{" "}
                  {idea.links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {link}
                    </a>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No thesis ideas available</p>
      )}
    </div>
  );
};

export default Contribution;
