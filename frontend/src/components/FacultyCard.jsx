import React from "react";

const FacultyCard = ({ faculty }) => (
  <div className="border p-4 rounded shadow-lg w-90 ">
    {/* Faculty Image */}
    <div className="flex justify-center mb-4">
      <img
        src={faculty.userId.image}
        alt={`${faculty.userId.name}'s profile`}
        className="w-25 h-25 rounded-full object-cover"
      />
    </div>

    {/* Faculty Name */}
    <h2 className="text-lg font-bold text-center truncate">
      {faculty.userId.name}
    </h2>

    {/* Bio */}
    <p className="text-sm text-gray-600 mt-2 h-20 overflow-hidden">
      {faculty.userId.bio || "No bio available."}
    </p>

    {/* Department */}
    <p className="text-sm text-gray-600 mt-2 h-8 overflow-hidden">
      {faculty.userId.department || "No department specified."}
    </p>

    {/* Research Interests */}
    <h3 className="text-md font-semibold mt-4">Research Interests:</h3>
    <div className="h-20 overflow-y-auto">
      {faculty.researchInterests.length > 0 ? (
        <ul className="list-disc list-inside">
          {faculty.researchInterests.map((interest, index) => (
            <li key={index} className="text-sm text-gray-700 truncate">
              {interest}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No research interests listed.</p>
      )}
    </div>

    {/* Publications Section (Commented Out)
  <h3 className="text-md font-semibold mt-4">Publications:</h3>
  <div className="h-24 overflow-y-auto">
    {faculty.publications.length > 0 ? (
      <ul className="list-disc list-inside">
        {faculty.publications.map((publication, index) => (
          <li key={index} className="text-sm text-gray-700 truncate">
            <strong>{publication.title}</strong> - {publication.journal} (
            {publication.year})
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-500">No publications listed.</p>
    )}
  </div>
  */}
  </div>
);

export default FacultyCard;
