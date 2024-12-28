import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;
        const response = await axios.get(
          `${apiDomain}/api/user/allThesisIdeas/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setProject(response.data.project);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project details:", error);
        setError("Failed to fetch project details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>No project found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-700 mb-4">{project.abstract}</p>
      <div className="mb-4">
        <strong>Authors:</strong> {project.authors.join(", ")}
      </div>
      <div className="mb-4">
        <strong>Publication Date:</strong>{" "}
        {new Date(project.publicationDate).toLocaleDateString()}
      </div>
      <div className="mb-4">
        <strong>Links:</strong>
        {project.links.length > 0 ? (
          project.links.map((link, index) => (
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
    </div>
  );
};

export default ProjectDetails;
