import React from "react";
import { useParams } from "react-router-dom";
import { faculty } from "../assets/assets";

const FacultyDetail = () => {
  const { id } = useParams();
  const selectedFaculty = faculty.find((f) => f.id === parseInt(id));

  if (!selectedFaculty) {
    return <p>Faculty not found!</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">
        {selectedFaculty.name}
      </h1>
      <p className="text-lg text-gray-700">
        <strong>Fields of Interest:</strong>{" "}
        {selectedFaculty.fieldOfInterest.join(", ")}
      </p>
      <h2 className="text-2xl font-semibold mt-4">Current Work</h2>
      <p>{selectedFaculty.currentWork}</p>
      <h2 className="text-2xl font-semibold mt-4">Past Releases</h2>
      <ul>
        {selectedFaculty.pastReleases.map((release, index) => (
          <li key={index} className="mt-2">
            <strong>{release.title}</strong> - {release.publication} (
            {release.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyDetail;
