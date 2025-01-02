import React from "react";

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center p-6">
      {/* Main Title */}
      <h1 className="text-4xl font-semibold text-white mb-8 hover:text-gray-400 transition-all duration-300">
        About Us
      </h1>

      {/* Mission Section */}
      <section className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg mb-10 hover:shadow-2xl transition-all duration-300">
        <h2 className="text-2xl font-semibold text-white mb-4 hover:text-gray-400 transition-colors duration-300">
          Our Mission
        </h2>
        <p className="text-lg text-gray-300">
          We are here to make your thesis planning more efficient, organized,
          and aligned with academic requirements. This platform is incredibly
          useful for PhD candidates and researchers to manage complex academic
          projects.
        </p>
      </section>

      {/* Contact Section */}
      <section className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
        <h2 className="text-2xl font-semibold text-white mb-4 hover:text-gray-400 transition-colors duration-300">
          Contact Us
        </h2>
        <p className="text-lg text-gray-300">
          For any inquiries, feedback, or assistance, email us at{" "}
          <a
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
            href="mailto:academix.24.bd@gmail.com"
          >
            academix.24.bd@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default About;
