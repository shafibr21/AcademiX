import React from "react";
import { useNavigate } from "react-router-dom";

const ChannelCard = ({ channel }) => {
  const navigate = useNavigate();
  const { _id, thesisId, studentId, createdAt } = channel;

  return (
    <div
      className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md bg-white cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/channels/${_id}`)} // Navigate to ChannelDetails
    >
      {/* Thesis Information */}
      <h3 className="text-lg font-bold mb-2">{thesisId?.title}</h3>
      <p className="text-gray-600 mb-2">{thesisId?.abstract}</p>
      <p className="text-sm text-gray-500">
        <strong>Authors:</strong> {thesisId?.authors.join(", ")}
      </p>

      {/* Student Information */}
      <div className="mt-4">
        <p className="text-sm text-gray-700">
          <strong>Student Name:</strong> {studentId?.name}
        </p>
      </div>

      {/* Metadata */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          <strong>Channel Created:</strong>{" "}
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ChannelCard;
