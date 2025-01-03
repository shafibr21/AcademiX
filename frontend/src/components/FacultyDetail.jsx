import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User, Briefcase, Mail, Phone, Globe, MapPin } from "lucide-react";

const FacultyDetail = () => {
  const { id } = useParams();
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiDomanin = import.meta.env.VITE_API_DOMAIN;
    // Fetch the faculty details using the ID from the URL
    axios
      .get(`${apiDomanin}/api/faculty/getfaculty/${id}`)
      .then((response) => {
        setSelectedFaculty(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching faculty details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading faculty details...</p>;
  }

  if (!selectedFaculty) {
    return <p>Faculty not found!</p>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-screen">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={
                selectedFaculty.userId.image ||
                "https://via.placeholder.com/300"
              }
              alt={`${selectedFaculty.userId.name}'s profile`}
              className="h-48 w-full object-cover md:w-48"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {selectedFaculty.userId.department}
            </div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {selectedFaculty.userId.name}
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">
              {selectedFaculty.userId.bio}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-gray-400" />
                Department
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {selectedFaculty.userId.department}
              </dd>
            </div>
            {selectedFaculty.userId.email && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-gray-400" />
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a
                    href={`mailto:${selectedFaculty.userId.email}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {selectedFaculty.userId.email}
                  </a>
                </dd>
              </div>
            )}
            {selectedFaculty.userId.phone && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-gray-400" />
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedFaculty.userId.phone}
                </dd>
              </div>
            )}
            {selectedFaculty.userId.website && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-gray-400" />
                  Website
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a
                    href={selectedFaculty.userId.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {selectedFaculty.userId.website}
                  </a>
                </dd>
              </div>
            )}
            {selectedFaculty.userId.office && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                  Office
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedFaculty.userId.office}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetail;
