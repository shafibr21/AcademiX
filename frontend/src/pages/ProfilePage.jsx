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
  const [channels, setChannels] = useState([]);

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

  // Handle navigation to the selected channel
  const handleNavigateToChannel = (channelId) => {
    navigate(`/channels/${channelId}`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="lg:w-1/4 bg-white shadow-lg p-6 border-green-950 rounded-lg">
        <ResearchInterest />
        {user.role === "STUDENT" ? (
          <div className="mt-6">
            <ThesisIdea userId={user._id} />
            <button
              onClick={handlePostThesisIdea}
              className="mt-4 w-full py-2 px-4 bg-black text-white rounded hover:bg-white hover:text-black transition"
            >
              Post Thesis Idea
            </button>
          </div>
        ) : user.role === "FACULTY" ? (
          <div className="mt-6">
            <ThesisRequests userId={user._id} />
          </div>
        ) : null}
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 ">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden ">
          {/* Profile Section */}
          <div className="relative flex justify-center items-center">
            <img
              className="w-60 h-60 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 m-2 shadow-2xl"
              src={user.image}
              alt="Profile"
            />
            <div className="absolute top-4 right-4 bg-black text-white text-sm px-3 py-1 rounded-md shadow-2xl">
              {user.role}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6">
            <h1 className="font-bold text-3xl text-gray-800 text-center mb-4">
              {user.name || "Anonymous"}
            </h1>
            <p className="text-center text-gray-600 italic mb-2">
              Department: {user.department || "Unknown"}
            </p>

            {/* Email & Bio */}
            <div className="space-y-4">
              {/* Centered Email Section */}
              <div className="flex flex-col items-center text-gray-700">
                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>

              {/* Bio Section */}
              <div className="text-gray-700">
                <span className="font-semibold">Bio:</span>
                {isEditingBio ? (
                  <div className="mt-2">
                    <textarea
                      className="border rounded p-2 w-full text-sm"
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                      rows={4}
                    />
                    <div className="flex justify-end space-x-4 mt-2">
                      <button
                        onClick={handleBioSubmit}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingBio(false)}
                        className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    {/* Bio Section */}
                    <div className="border border-neutral-500 rounded p-2 flex-grow bg-white">
                      <p>{user.bio || "No bio available"}</p>
                    </div>

                    {/* Edit Button */}
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleBioEdit}
                        className="py-2 px-4 bg-black text-white rounded hover:bg-white hover:text-black hover:border-slate-950 transition "
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="p-6 border-t flex justify-center">
            <label className="py-2 px-4 bg-black text-white rounded hover:bg-white hover:text-black hover:border-slate-950 transition cursor-pointer">
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
