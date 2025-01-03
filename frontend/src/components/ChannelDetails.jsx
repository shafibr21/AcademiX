import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

      // Prepare FormData for message and document upload
      const formData = new FormData();
      formData.append("content", newMessage);
      if (file) {
        formData.append("document", file); // Append selected file
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

      // Add the new message to the messages state
      setMessages([...messages, response.data.message]);
      setNewMessage(""); // Clear the message input
      setFile(null); // Clear the file input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Communication Channel</h1>
      <div className="mb-6">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="mb-4 border-b pb-2">
              <strong>{msg.sender.name}:</strong>{" "}
              {msg.content && <p>{msg.content}</p>}
              {msg.document && (
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
      <input
        type="file"
        className="mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={sendMessage}
        disabled={!newMessage && !file} // Disable button if no message or file
      >
        Send
      </button>
    </div>
  );
};

export default ChannelDetails;
