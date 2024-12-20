import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 mx-auto">
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={user.image}
          alt="Profile"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md shadow-md">
          {user.role}
        </div>
      </div>
      <div className="px-4 py-6">
        <h2 className="font-bold text-2xl text-gray-800 mb-2 text-center">
          {user.name}
        </h2>
        <p className="text-gray-600 text-center text-sm mb-4 italic">
          {user.department}
        </p>
        <div className="space-y-2">
          <p className="flex items-center text-gray-700 text-sm">
            <span className="font-semibold mr-2">Email:</span>
            {user.email}
          </p>
          <p className="flex items-center text-gray-700 text-sm">
            <span className="font-semibold mr-2">Bio:</span>
            {user.bio || "No bio available"}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
