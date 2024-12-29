import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";

const Contribution = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [thesisIdeas, setThesisIdeas] = useState([]);

  useEffect(() => {
    const fetchThesisIdeas = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;
        const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage

        const response = await fetch(
          `${apiDomain}/api/student/getThesisideas?studentId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch thesis ideas");
        }

        setThesisIdeas(data.thesisIdeas);
      } catch (error) {
        console.error("Error fetching thesis ideas:", error);
      }
    };

    fetchThesisIdeas();
  }, [user]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Thesis Ideas</h2>
      {thesisIdeas.length > 0 ? (
        <ul className="list-disc pl-5">
          {thesisIdeas.map((idea) => (
            <li key={idea._id} className="mb-2">
              <Link
                to={`/projects/${idea._id}`}
                className="text-blue-500 hover:underline"
              >
                {idea.title}
              </Link>
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
