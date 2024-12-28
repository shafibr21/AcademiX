import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";

const Projects = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {thesisIdeas.map((idea) => (
        <ProjectCard key={idea._id} idea={idea} />
      ))}
    </div>
  );
};

export default Projects;
