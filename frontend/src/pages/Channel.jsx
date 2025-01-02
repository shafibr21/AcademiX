import React, { useEffect, useState } from "react";
import axios from "axios";
import ChannelCard from "../components/ChannelCard";
import { useParams } from "react-router-dom";

const Channel = () => {
  const [user, setUser] = useState(null);
  const [channels, setChannels] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;
        const response = await axios.get(
          `${apiDomain}/api/channels/getChannel`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        console.log(response.data.channels);
        setChannels(response.data.channels);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Channels</h2>
      {channels.length > 0 ? (
        channels.map((channel) => (
          <ChannelCard key={channel._id} channel={channel} />
        ))
      ) : (
        <p className="text-gray-500">No channels available.</p>
      )}
    </div>
  );
};

export default Channel;
