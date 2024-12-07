import React from "react";

const FacultyCard = ({ faculty }) => (
  <div className="border p-4 rounded shadow-lg">
    <h2 className="text-lg font-bold">{faculty.name}</h2>
    <p className="text-sm text-gray-600">
      Fields of Interest: {faculty.fieldOfInterest.join(", ")}
    </p>
    <h3 className="text-md font-semibold mt-2">Current Work:</h3>
    <p>{faculty.currentWork}</p>
    <h3 className="text-md font-semibold mt-2">Past Releases:</h3>
    <ul>
      {faculty.pastReleases.map((release, index) => (
        <li key={index}>
          <strong>{release.title}</strong> - {release.publication} (
          {release.year})
        </li>
      ))}
    </ul>
  </div>
);

export default FacultyCard;
