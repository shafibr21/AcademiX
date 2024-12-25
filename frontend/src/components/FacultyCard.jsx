import React from "react";

const FacultyCard = ({ faculty }) => (
  <div className="border p-4 rounded shadow-lg">
    {/* Faculty Image */}
    <div className="flex justify-center mb-4">
      <img
        src={faculty.userId.image || "https://via.placeholder.com/150"}
        alt={`${faculty.userId.name}'s profile`}
        className="w-24 h-24 rounded-full object-cover"
      />
    </div>
    <h2 className="text-lg font-bold">{faculty.userId.name}</h2>
    <p className="text-sm text-gray-600 mt-2">{faculty.userId.bio}</p>
    <p className="text-sm text-gray-600 mt-2">{faculty.userId.department}</p>

    {/* Display Research Interests */}
    <h3 className="text-md font-semibold mt-4">Research Interests:</h3>
    {faculty.researchInterests.length > 0 ? (
      <ul className="list-disc list-inside">
        {faculty.researchInterests.map((interest, index) => (
          <li key={index} className="text-sm text-gray-700">
            {interest}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-500">No research interests listed.</p>
    )}

    {/* Display Publications */}
    <h3 className="text-md font-semibold mt-4">Publications:</h3>
    {faculty.publications.length > 0 ? (
      <ul className="list-disc list-inside">
        {faculty.publications.map((publication, index) => (
          <li key={index} className="text-sm text-gray-700">
            <strong>{publication.title}</strong> - {publication.journal} (
            {publication.year})
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-500">No publications listed.</p>
    )}
  </div>
);

export default FacultyCard;
