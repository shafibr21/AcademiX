import { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";

const ResearchInterest = () => {
  const [researchInterests, setResearchInterests] = useState([]);
  const [isEditingInterest, setIsEditingInterest] = useState(false);
  const [newResearchInterest, setNewResearchInterest] = useState("");

  const fetchResearchInterests = async () => {
    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;
      const response = await axios.get(`${apiDomain}/api/user/research`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setResearchInterests(response.data.researchInterests);
    } catch (error) {
      console.error("Error fetching research interests:", error);
    }
  };

  const updateResearchInterest = async (interest) => {
    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN; // Assuming the token is stored in localStorage

      const response = await axios.put(
        `${apiDomain}/api/user/researchUpdate`,
        { interests: interest }, // Send as an array
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      alert(
        response.data.message || "Research interests updated successfully!"
      );
      setIsEditingInterest(false);
    } catch (error) {
      console.error("Error updating research interests:", error);
      alert(error || "Failed to update research interests. Please try again.");
      await fetchResearchInterests();
    }
  };

  const addResearchInterest = async () => {
    // merge the new research interests with the existing ones
    const updatedInterests = newResearchInterest
      .split(",")
      .map((interest) => interest.trim());
    setResearchInterests(researchInterests.concat(updatedInterests));

    // Update the research interests
    await updateResearchInterest(researchInterests.concat(updatedInterests));
  };

  const deleteResearchInterest = async (Interest) => {
    const updatedInterests = researchInterests.filter(
      (interest) => interest !== Interest
    );
    setResearchInterests(updatedInterests);

    // Update the research interests
    await updateResearchInterest(updatedInterests);
  };

  useEffect(() => {
    fetchResearchInterests();
  }, []);

  return (
    <>
      <div className="flex items-center justify-around mb-2">
        <h2 className="text-xl font-bold bg-red-50">Research Interests</h2>
        <img
          onClick={() => setIsEditingInterest(true)}
          src={assets.edit_icon}
          className="w-5 cursor-pointer"
          alt="Edit"
        />
      </div>
      <div>
        {researchInterests.map((interest) => (
          <div key={interest} className="flex items-center space-x-2">
            <span>{interest}</span>
            <img
              onClick={() => deleteResearchInterest(interest)}
              src={assets.cross_icon}
              className="w-4 cursor-pointer"
              alt="Delete"
            />
          </div>
        ))}
      </div>
      {isEditingInterest && (
        <div className="flex flex-col">
          <textarea
            className="border rounded p-2 w-full text-sm"
            value={newResearchInterest}
            onChange={(e) => setNewResearchInterest(e.target.value)}
          />
          <button
            onClick={addResearchInterest}
            className="mt-2 bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700 transition-colors"
          >
            Submit
          </button>
        </div>
      )}
      <hr />
    </>
  );
};

export default ResearchInterest;
