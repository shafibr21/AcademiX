import React from "react";

const Hero = () => {
  return (
    <div>
      {/* Background Section */}
      <div
        className="relative min-h-screen bg-blue-600 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/image.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 opacity-75"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center text-white">
          {/* Banner Text with Enhanced Shadow */}
          <h1
            className="text-6xl font-extrabold mb-6"
            style={{
              textShadow: "4px 4px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
            Welcome to AcademiX
          </h1>
          <p
            className="text-xl font-light mb-10 max-w-xl"
            style={{
              textShadow: "3px 3px 10px rgba(0, 0, 0, 0.8)", // Stronger shadow for tagline
            }}
          >
            <i>Empowering Academic Excellence, One Thesis at a Time.</i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
