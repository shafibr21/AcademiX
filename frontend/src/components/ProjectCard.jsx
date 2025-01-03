import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ExternalLink, Users, BookOpen, Tag } from "lucide-react";

const ProjectCard = ({ idea }) => {
  const statusColors = {
    Approved: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
  };
  console.log(idea);

  return (
    <Link
      to={`/projects/${idea._id}`}
      className="block overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              statusColors[idea.status]
            }`}
          >
            {idea.status}
          </span>
          <span className="text-sm text-gray-500">{idea._id}</span>
        </div>
        <h2 className="mt-4 text-xl font-bold text-gray-900">{idea.title}</h2>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Tag className="mr-2 h-4 w-4" />
          <span>{idea.researchArea}</span>
        </div>
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
          {idea.abstract}
        </p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Users className="mr-2 h-4 w-4" />
          <span>{idea.authors.join(", ")}</span>
        </div>
        {idea.links.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm font-medium text-gray-700">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Related Links</span>
            </div>
            {idea.links.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center rounded-lg bg-gray-50 px-3 py-2 text-sm text-blue-600 hover:bg-gray-100"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                <span className="truncate">{new URL(link).hostname}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProjectCard;
