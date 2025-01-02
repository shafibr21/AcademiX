import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostThesisIdea = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [links, setLinks] = useState("");
  const [researchArea, setResearchArea] = useState("");
  const [message, setMessage] = useState("");
  const [facultyId, setFacultyId] = useState(""); // Selected faculty ID
  const [faculties, setFaculties] = useState([]); // Faculty list
  const navigate = useNavigate();

  // Fetch faculty list on component mount
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;
        const response = await axios.get(
          `${apiDomain}/api/faculty/getfaculty`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        console.log("Faculties fetched:", response.data);
        setFaculties(response.data || []); // Directly set the data since API returns the list
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };
    fetchFaculties();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newThesisIdea = {
      title,
      abstract,
      authors: authors.split(",").map((author) => author.trim()),
      publicationDate,
      links: links.split(",").map((link) => link.trim()),
      researchArea,
      facultyId,
    };

    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;
      const response = await axios.post(
        `${apiDomain}/api/student/postThesisidea`,
        newThesisIdea,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Thesis idea posted:", response.data);
      setMessage("Thesis idea posted successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error posting thesis idea:", error);
      setMessage("Failed to post thesis idea. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Post Thesis Idea</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Abstract */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Abstract
          </label>
          <textarea
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Authors */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Authors
          </label>
          <input
            type="text"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Separate authors with commas"
            required
          />
        </div>
        {/* Publication Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Publication Date
          </label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Links */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Links
          </label>
          <input
            type="text"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Separate links with commas"
          />
        </div>
        {/* Research Area */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Research Area
          </label>
          <input
            type="text"
            value={researchArea}
            onChange={(e) => setResearchArea(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Faculty Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Faculty
          </label>
          <select
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Faculty</option>
            {faculties.map((faculty) => (
              <option key={faculty._id} value={faculty._id}>
                {faculty.userId.name} (
                {faculty.userId.researchInterests?.join(", ") ||
                  "No interests listed"}
                )
              </option>
            ))}
          </select>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-black text-white font-medium rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
};

export default PostThesisIdea;
