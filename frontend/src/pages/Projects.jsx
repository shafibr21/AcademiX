import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Project = () => {
  const [thesisIdeas, setThesisIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThesisIdeas = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;
        const response = await axios.get(
          `${apiDomain}/api/user/allThesisIdeas`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setThesisIdeas(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching thesis ideas:", error);
        setError("Failed to fetch thesis ideas. Please try again later.");
        setLoading(false);
      }
    };

    fetchThesisIdeas();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Thesis Ideas</h1>
      {thesisIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {thesisIdeas.map((idea) => (
            <Link
              key={idea._id}
              to={`/projects/${idea._id}`}
              className="border rounded-lg p-4 shadow-md hover:bg-gray-100 transition-colors"
            >
              <h2 className="text-lg font-semibold">{idea.title}</h2>
              <p className="text-sm text-gray-600">
                <strong>Research Area:</strong> {idea.researchArea}
              </p>
              <p className="text-sm mt-2">{idea.abstract}</p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Authors:</strong> {idea.authors.join(", ")}
              </p>
              <div className="mt-2">
                <strong>Links:</strong>
                {idea.links.length > 0 ? (
                  idea.links.map((link, index) => (
                    <div key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {link}
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No links provided.</p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                <strong>Publication Date:</strong>{" "}
                {new Date(idea.publicationDate).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p>No thesis ideas available.</p>
      )}
    </div>
  );
};

export default Project;
