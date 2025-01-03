import React from "react";
import { useNavigate } from "react-router-dom";
import { Book, User, Calendar, ArrowRight } from "lucide-react";

const ChannelCard = ({ channel }) => {
  const navigate = useNavigate();
  const { _id, thesisId, studentId, createdAt } = channel;

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer w-[800px] m-5 "
      onClick={() => navigate(`/channels/${_id}`)}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Book className="h-6 w-6 text-indigo-500 mr-2" />
          <h3 className="text-xl font-bold text-gray-900 truncate">
            {thesisId.title}
          </h3>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{thesisId.abstract}</p>
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
          <User className="h-4 w-4 mr-1" />
          <span className="mr-2 font-medium">Authors:</span>
          <span>{thesisId.authors.join(", ")}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <User className="h-4 w-4 mr-1" />
          <span className="mr-2 font-medium">Student:</span>
          <span>{studentId.name}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-2 font-medium">Created:</span>
          <span>{new Date(createdAt).toLocaleString()}</span>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View Channel Details
          </span>
          <ArrowRight className="h-5 w-5 text-indigo-500" />
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
