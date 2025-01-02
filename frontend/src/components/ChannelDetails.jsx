import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Title from "./Titile";

const ChannelDetails = () => {
  const { channelId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError("Failed to load messages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [channelId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN;
      const response = await axios.post(
        `${apiDomain}/api/channels/${channelId}/send-messages`,
        { content: newMessage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setMessages((prevMessages) => [...prevMessages, response.data.message]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center text-2xl pt-5 border-t">
        <Title text1={"Communication"} text2={"Channel"} />
      </div>
      <div className="mb-6 overflow-y-auto max-h-96">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="mb-2 border-b pb-2">
              <strong>{msg.sender?.name || "Unknown"}:</strong> {msg.content}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No messages yet. Start the conversation!
          </p>
        )}
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

export default ChannelDetails;
