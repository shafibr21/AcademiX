import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectCard = ({ idea }) => {
  return (
    <Link
      to={`/projects/${idea._id}`}
      className="border rounded-lg p-4 shadow-md hover:bg-gray-100 transition-colors"
    >
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
            <div key={index}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {link}
              </a>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No links provided.</p>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        <strong>Publication Date:</strong>{" "}
        {new Date(idea.publicationDate).toLocaleDateString()}
      </p>
    </Link>
  );
};

export default ProjectCard;
