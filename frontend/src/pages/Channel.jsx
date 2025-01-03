import React, { useEffect, useState } from "react";
import axios from "axios";
import ChannelCard from "../components/ChannelCard";
import { useParams } from "react-router-dom";
import Title from "../components/Titile";

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
    <div className="min-h-screen ">
      <div className="text-center text-2xl pt-5 border-t">
        <Title text1={"Ongoing"} text2={"Thesis"} />
      </div>
      {channels.length > 0 ? (
        channels.map((channel) => (
          <div className="flex justify-center " key={channel._id}>
            <ChannelCard key={channel._id} channel={channel} />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No channels available.</p>
      )}
    </div>
  );
};

export default Channel;
