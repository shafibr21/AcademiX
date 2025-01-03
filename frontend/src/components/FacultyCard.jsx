import React from "react";
import { User, Briefcase, BookOpen, GraduationCap } from "lucide-react";

const FacultyCard = ({ faculty }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
    <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
        <img
          src={faculty.userId.image}
          alt={`${faculty.userId.name}'s profile`}
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />
      </div>
    </div>
    <div className="pt-14 px-6 pb-6">
      <h2 className="text-xl font-bold text-center text-gray-800 truncate">
        {faculty.userId.name}
      </h2>
      <div className="mt-4 flex items-center text-sm text-gray-600">
        <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
        <p className="truncate">
          {faculty.userId.department || "No department specified."}
        </p>
      </div>
      <div className="mt-4 flex items-start">
        <User className="w-4 h-4 mr-2 flex-shrink-0 mt-1 text-gray-400" />
        <p className="text-sm text-gray-600 line-clamp-3">
          {faculty.userId.bio || "No bio available."}
        </p>
      </div>
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-800 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
          Research Interests
        </h3>
        <div className="mt-2 max-h-32 overflow-y-auto">
          {faculty.researchInterests.length > 0 ? (
            <ul className="space-y-1">
              {faculty.researchInterests.map((interest, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-600"
                >
                  <GraduationCap className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="truncate">{interest}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No research interests listed.
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default FacultyCard;
