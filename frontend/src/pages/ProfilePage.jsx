import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { use } from "react";
import ResearchInterest from "../components/ResearchInterest";
import Publication from "../components/Publication";
import ThesisIdea from "./ThesisIdea";
import ThesisRequests from "./ThesisRequest";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditingInterest, setIsEditingInterest] = useState(false);
  const [message, setMessage] = useState("");
  const [newResearchInterest, setNewResearchInterest] = useState("");
  const [researchInterests, setResearchInterests] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  const handlesubLink = () => {
    setDropdown(false);
  };

  const navigate = useNavigate();

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

  const handlePostThesisIdea = () => {
    navigate("/post-thesis-idea");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6">
        <ResearchInterest />
        {user.role === "STUDENT" ? (
          <div className="justify-between mt-4 mb-2">
            <ThesisIdea userId={user._id} />
            <button
              onClick={handlePostThesisIdea}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700 transition-colors"
            >
              Post Thesis Idea
            </button>
          </div>
        ) : user.role === "FACULTY" ? (
          <div>
            <ThesisRequests userId={user._id} />
          </div>
        ) : null}
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
