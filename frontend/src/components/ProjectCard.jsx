import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectCard = ({ idea }) => {
  return (
    <Link
      to={`/projects/${idea._id}`}
      className="block border rounded-lg shadow-md hover:bg-gray-100 transition-colors"
    >
      <div className="p-4">
        <p
          className={`${
            idea.status === "Approved"
              ? "bg-green-400"
              : idea.status === "Pending Changes"
              ? "bg-orange-300"
              : "bg-red-600"
          } border-rounded-lg p-2`}
        >
          {idea.status}
        </p>
        <h2 className="text-lg font-semibold">{idea.title}</h2>
        <p className="text-sm text-gray-600">
          <strong>Research Area:</strong> {idea.researchArea}
        </p>
        <p className="text-sm mt-2">{idea.abstract}</p>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Authors:</strong> {idea.authors.join(", ")}
        </p>
        <div className="mt-2">
          <strong>Links:</strong>
          {idea.links.length > 0 ? (
            idea.links.map((link, index) => (
              <div
                key={index}
                className="w-full h-10 flex items-center justify-center border rounded bg-gray-100"
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-center truncate"
                >
                  {link}
                </a>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No links provided.</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
