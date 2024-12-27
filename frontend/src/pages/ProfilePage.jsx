import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditingInterest, setIsEditingInterest] = useState(false);
  const [message, setMessage] = useState("");
  const [newResearchInterest, setNewResearchInterest] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const handlesubLink = () => {
    setDropdown(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;
        const response = await axios.get(`${apiDomain}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUser(response.data.user);
        setMessage("Profile updated successfully");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error updating profile");
      }
    };

    fetchUserData();
  }, []);

  const handleBioEdit = () => {
    setIsEditingBio(true);
    setNewBio(user.bio || "");
  };
  // Handle bio submit
  const handleBioSubmit = async () => {
    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;

      // Send userId along with the bio for the update request
      const response = await axios.put(
        `${apiDomain}/api/user/update`,
        { bio: newBio },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setUser((prev) => ({ ...prev, bio: newBio }));
      setIsEditingBio(false);
      alert(response.data.message || "Bio updated successfully!");
    } catch (error) {
      console.error("Error updating bio:", error);
      alert("Failed to update bio. Please try again.");
    }
  };
  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;
      const response = await axios.put(
        `${apiDomain}/api/user/imgupload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser((prev) => ({ ...prev, image: response.data.imageUrl }));
      alert(response.data.message || "Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  // Fetch the research interests
  useEffect(() => {
    const fetchResearchInterests = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;
        const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

        const response = await fetch(`${apiDomain}/api/user/research`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch research interests");
        }

        setResearchInterests(data.researchInterests);
      } catch (error) {
        console.error("Error fetching research interests:", error);
      }
    };

    fetchResearchInterests();
  }, []);

  // Update the research interests
  const handleResearchInterestEdit = () => {
    setIsEditingInterest(true);
    setNewResearchInterest(
      user.researchInterests ? user.researchInterests.join(", ") : ""
    );
  };

  const handleResearchInterestSubmit = async () => {
    try {
      const updatedInterests = newResearchInterest
        .split(",")
        .map((interest) => interest.trim());
      const result = await updateResearchInterest(updatedInterests);

      // Update the state with the new research interests
      setResearchInterests(result.researchInterests);

      // Reset the editing state
      setIsEditingInterest(false);
    } catch (error) {
      console.error("Failed to update research interests:", error);
      // Optionally, show an error message to the user
    }
  };

  const updateResearchInterest = async (interests) => {
    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

      const response = await fetch(`${apiDomain}/api/user/researchUpdate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ interests }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update research interests");
      }

      return data;
    } catch (error) {
      console.error("Error updating research interests:", error);
      throw error;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6">
        {user.role === "STUDENT" && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Research Interests</h2>
              <img
                onClick={handleResearchInterestEdit}
                src={assets.edit_icon}
                className="w-6 cursor-pointer"
                alt="Edit"
              />
              {isEditingInterest ? (
                <div className="flex flex-col">
                  <textarea
                    className="border rounded p-2 w-full text-sm"
                    value={newResearchInterest}
                    onChange={(e) => setNewResearchInterest(e.target.value)}
                  />
                  <button
                    onClick={handleResearchInterestSubmit}
                    className="mt-2 bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <ul className="list-disc pl-5">
                  {user.researchInterests &&
                  user.researchInterests.length > 0 ? (
                    user.researchInterests.map((interest, index) => (
                      <li key={index}>{interest}</li>
                    ))
                  ) : (
                    <li>No research interests available</li>
                  )}
                </ul>
              )}
            </div>
            <hr />
            <div className="flex items-center justify-between mt-4 mb-2">
              <h2 className="text-xl font-bold">Contributions</h2>
              <Link to="/contribution" className="ml-10">
                <img
                  src={assets.contribution_icon}
                  className="w-7"
                  alt="Logo"
                />
              </Link>
            </div>
            <p>{user.contributions || "No contributions available"}</p>
          </div>
        )}
        {user.role === "FACULTY" && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Research Interests</h2>
              <img
                onClick={() => setDropdown(!dropdown)}
                src={assets.edit_icon}
                className="w-5 cursor-pointer"
                alt="Profile"
              />
            </div>
            <p>{user.researchInterests || "No research interests available"}</p>
            <hr />
            <div className="flex items-center justify-between mt-4 mb-2">
              <h2 className="text-xl font-bold">Publications</h2>
              <Link to="/contribution" className="ml-10">
                <img
                  src={assets.contribution_icon}
                  className="w-7"
                  alt="Logo"
                />
              </Link>
            </div>
            <p>{user.publications || "No publications available"}</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-3xl rounded-lg overflow-hidden shadow-lg bg-white">
          {/* Profile Image and Role Badge */}
          <div className="relative">
            <img
              className="w-full h-64 object-cover rounded-t-lg"
              src={user.image}
              alt="Profile"
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-md shadow-md">
              {user.role}
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-8">
            <h1 className="font-bold text-4xl text-gray-800 mb-4 text-center">
              {user.name}
            </h1>
            <p className="text-gray-600 text-center text-lg mb-6 italic">
              {user.department}
            </p>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold mr-2">Email:</span>
                {user.email}
              </p>
              <div className="text-gray-700 text-lg">
                <span className="font-semibold mr-2">Bio:</span>
                {isEditingBio ? (
                  <div className="flex flex-col">
                    <textarea
                      className="border rounded p-2 w-full text-sm"
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                    />
                    <button
                      onClick={handleBioSubmit}
                      className="mt-2 bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{user.bio || "No bio available"}</span>
                    <button
                      onClick={handleBioEdit}
                      className="ml-2 bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex justify-center space-x-4 mt-6">
            <label className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors cursor-pointer">
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
