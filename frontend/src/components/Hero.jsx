import React from "react";
import { assets } from "../assets/assets";
import Title from "./Titile";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row ">
        {/** Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="text-[#414141]">
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg md:text-base">
                Streamline Your Research
              </p>
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            </div>
            <div className="text-center text-8xl pt-5 border-t">
              <Title text1={"Academi_"} text2={"X"} />
            </div>
            <div className="flex justify-end items-center gap-2">
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
              <p className="font-bold text-lg md:text-base">
                Simplify Collaborate Succeed
              </p>
            </div>
          </div>
        </div>
        {/** Hero Right Side */}
        <img className="w-full sm:w-1/2" src={assets.portese} alt="" />
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Create Profiles</h3>
            <p>
              Students and faculties can create profiles, showcasing their
              interests and academic achievements.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Thesis Requests</h3>
            <p>
              Students can submit thesis requests, and faculties have the
              authority to approve or reject them.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">
              Collaborative Environment
            </h3>
            <p>
              Foster collaboration between students and faculties to enhance the
              quality of research.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
{
  /* Background Section
      <div
        className="relative min-h-screen bg-blue-600 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/image.png')" }}
      >
        {/* Overlay */
}
{
  /* <div className="absolute inset-0 bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 opacity-75"></div> */
}

{
  /* Content */
}
{
  /* <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center text-white"> */
}
{
  /* Banner Text with Enhanced Shadow */
}
{
  /* <h1
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
      </div> */
}
{
  /* Header Section
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
      </header> */
}
