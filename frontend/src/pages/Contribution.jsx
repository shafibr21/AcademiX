import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
const Contribution = () => {
  const [contributions, setContributions] = useState([]);
  const [isEditContribution, setIsEditContribution] = useState(false);
  const [newContribution, setNewContribution] = useState({
    title: "",
    abstract: "",
    authors: "",
    publicationDate: "",
    url: "",
    studentId: "",
  });

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;
      const response = await axios.get(`${apiDomain}/api/contributions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setContributions(response.data.contributions);
    } catch (error) {
      console.error("Error fetching contributions:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContribution((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddContribution = async (e) => {
    e.preventDefault();
    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;
      const response = await axios.post(
        `${apiDomain}/api/student/contributions/add`,
        newContribution,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setContributions((prev) => [...prev, response.data]);
      setNewContribution({
        title: "",
        abstract: "",
        authors: "",
        publicationDate: "",
        url: "",
        studentId: "",
      });
    } catch (error) {
      console.error("Error adding contribution:", error);
    }
  };

  return (
    <div>
      <hr />
      <h2 className="bg-red-50 text-xl font-bold">Contributions</h2>
      <form onSubmit={handleAddContribution}>
        <img
          src={assets.contribution_icon}
          alt=""
          onClick={setIsEditContribution(true)}
        />
        <input
          type="text"
          name="title"
          value={newContribution.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="abstract"
          value={newContribution.abstract}
          onChange={handleInputChange}
          placeholder="Abstract"
        />
        <input
          type="text"
          name="authors"
          value={newContribution.authors}
          onChange={handleInputChange}
          placeholder="Authors"
          required
        />
        <input
          type="date"
          name="publicationDate"
          value={newContribution.publicationDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="url"
          value={newContribution.url}
          onChange={handleInputChange}
          placeholder="URL"
        />
        <input
          type="text"
          name="studentId"
          value={newContribution.studentId}
          onChange={handleInputChange}
          placeholder="Student ID"
          required
        />
        <button type="submit">Add Contribution</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Abstract</th>
            <th>Authors</th>
            <th>Publication Date</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((contribution, index) => (
            <tr key={index}>
              <td>{contribution.title}</td>
              <td>{contribution.abstract}</td>
              <td>{contribution.authors.join(", ")}</td>
              <td>
                {new Date(contribution.publicationDate).toLocaleDateString()}
              </td>
              <td>{contribution.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contribution;
