import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative text-center text-white">
        {/* Background Image */}
        <img
          src={assets.portese} // Ensure the correct image path
          alt="Portese"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm" // Adds blur effect
        />
        
        {/* Text Content */}
        <div className="relative z-10 bg-black bg-opacity-50 py-20">
          <h2 className="text-4xl font-bold mb-4">Welcome to the Thesis Platform</h2>
          <p className="text-lg">
            Connect with faculties, share your interests, and collaborate on academic projects.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Artificial Intelligence and Machine Learning</h3>
            <p>
              Students and faculties can create profiles, showcasing their interests and academic
              achievements.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Biotechnology and Bioengineering</h3>
            <p>
              Students can submit thesis requests, and faculties have the authority to approve or
              reject them.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Collaborative Environment</h3>
            <p>
              Foster collaboration between students and faculties to enhance the quality of
              research.
            </p>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Hero;
      {/* Background Section
      <div
        className="relative min-h-screen bg-blue-600 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/image.png')" }}
      >
        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 opacity-75"></div> */}

        {/* Content */}
        {/* <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center text-white"> */}
          {/* Banner Text with Enhanced Shadow */}
          {/* <h1
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
      </div> */}
      {/* Header Section
      <header className="bg-blue-700 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Thesis Platform</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header> */}
