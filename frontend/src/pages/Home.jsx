import React from "react";

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-blue-500 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/image.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">

        {/* Banner Text */}
        <h1 className="text-5xl font-bold mb-6">
          Welcome to the Thesis Platform
        </h1>
        <p className="text-lg mb-8">
        <i>Empowering Academic Excellence, One Thesis at a Time....</i>
        </p>

        {/* Cookie Consent Modal */}
        <div className="bg-white p-4 rounded-lg shadow-lg text-center max-w-md mx-auto">
          <p className="text-sm text-gray-700 mb-4">
            This website stores cookies on your computer. These cookies are
            used to collect information about how you interact with our website
            and allow us to remember you.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
              Accept
            </button>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

