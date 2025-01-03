import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Titile from "./Titile";

const ChannelDetails = () => {
  const { channelId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
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

      const formData = new FormData();
      formData.append("content", newMessage);
      if (file) {
        formData.append("document", file);
      }

      const response = await axios.post(
        `${apiDomain}/api/channels/${channelId}/send-messages`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessages([...messages, response.data.message]);
      setNewMessage("");
      setFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border">
      <div className="text-center text-2xl pt-5 border-t">
        <Titile text1={"Communication"} text2={"Channel"} />
      </div>
      <div className="mb-6">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="mb-4 border-b pb-2">
              <div className="flex items-center space-x-4">
                <strong>{msg.sender.name}</strong>
                <span className="text-gray-500 text-sm">
                  {formatDate(msg.timestamp)}
                </span>
              </div>
              {msg.content && (
                <p className="my-2 border rounded-full px-3 py-2">
                  {msg.content}
                </p>
              )}
              {msg.document && (
                <div>
                  <p>
                    <a
                      href={msg.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline"
                    >
                      File
                    </a>
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
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
        disabled={!newMessage && !file}
      >
        Send
      </button>
      <input
        type="file"
        className="mb-4 ml-6"
        onChange={(e) => setFile(e.target.files[0])}
      />
    </div>
  );
};

export default ChannelDetails;
