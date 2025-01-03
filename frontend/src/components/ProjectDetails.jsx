import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Users, LinkIcon, User } from "lucide-react";

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
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {project.title}
        </h1>

        <div className="mb-6 text-gray-600 leading-relaxed">
          {project.abstract}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoCard
            icon={<Users className="w-5 h-5 text-blue-500" />}
            title="Authors"
          >
            {project.authors.join(", ")}
          </InfoCard>

          <InfoCard
            icon={<User className="w-5 h-5 text-purple-500" />}
            title="Faculty"
          >
            {project.facultyId?.userId?.name || "Not available"}
          </InfoCard>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <LinkIcon className="w-5 h-5 mr-2 text-indigo-500" />
            Related Links
          </h2>
          {project.links.length > 0 ? (
            <div className="space-y-3">
              {project.links.map((link, index) => (
                <LinkCard key={index} href={link} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No links provided.</p>
          )}
        </div>
      </div>
    </div>
  );
};

function InfoCard({ icon, title, children }) {
  return (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
      {icon}
      <div>
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <p className="text-gray-600">{children}</p>
      </div>
    </div>
  );
}

function LinkCard({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out"
    >
      <div className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
        <LinkIcon className="w-4 h-4" />
        <span className="text-sm font-medium truncate">{href}</span>
      </div>
    </a>
  );
}

export default ProjectDetails;
