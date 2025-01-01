import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Channel = () => {
  const { channelId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const apiDomain = import.meta.env.VITE_API_DOMAIN;

        const response = await axios.get(
          `${apiDomain}/api/channels/${channelId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [channelId]);

  const sendMessage = async () => {
    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;

      const response = await axios.post(
        `${apiDomain}/api/channels/${channelId}/messages`,
        { senderId: localStorage.getItem("userId"), content: newMessage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setMessages([...messages, response.data.message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Communication Channel</h1>
      <div className="mb-6">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2">
            <strong>{msg.sender.name}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2"
        rows="3"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      ></textarea>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default Channel;
