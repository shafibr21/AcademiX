import React, { useState } from "react";

const Home = () => {
  // State to control cookie popup visibility
  const [showCookiesPopup, setShowCookiesPopup] = useState(true);

  // Handle button clicks
  const handleAcceptCookies = () => {
    setShowCookiesPopup(false); // Hide popup when cookies are accepted
  };

  const handleDeclineCookies = () => {
    setShowCookiesPopup(false); // Hide popup when cookies are declined
  };

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


      {/* YouTube Videos Section */}
      <section className="px-6 py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Related YouTube Videos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Video 1 - AI in Education */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">AI in Education</h3>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dkKpxJ5_4Hk" // Replace with relevant video URL
                title="AI in Education"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video 2 - Blockchain for Academic Integrity */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">Blockchain for Academic Integrity</h3>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/Z1aYVYt5Grg" // Replace with relevant video URL
                title="Blockchain for Academic Integrity"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video 3 - Cloud Computing in Universities */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">Cloud Computing in Universities</h3>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/2u8EwL75y-s" // Replace with relevant video URL
                title="Cloud Computing in Universities"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video 4 - Data Privacy in E-Learning */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">Data Privacy in E-Learning</h3>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/n6N2rXuyjbg" // Replace with relevant video URL
                title="Data Privacy in E-Learning"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video 5 - Smart Campus Solutions */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">Smart Campus Solutions</h3>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/75ak07xa8P8" // Replace with relevant video URL
                title="Smart Campus Solutions"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video 6 - AR/VR for Interactive Learning */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">AR/VR for Interactive Learning</h3>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/5gDNeKwUv5s" // Replace with relevant video URL
                title="AR/VR for Interactive Learning"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faq" className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {/* Question 1 */}
            <details className="bg-white shadow-md rounded-lg p-6 group">
              <summary className="font-semibold cursor-pointer text-lg flex justify-between items-center">
                <span>How do I submit my thesis on this platform?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                You can submit your thesis by creating an account, logging in,
                and navigating to the "Upload Thesis" section in your dashboard.
              </p>
            </details>

            {/* Question 2 */}
            <details className="bg-white shadow-md rounded-lg p-6 group">
              <summary className="font-semibold cursor-pointer text-lg flex justify-between items-center">
                <span>Can I collaborate with others on a thesis?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes, the platform offers collaboration features to work with
                your peers or advisors seamlessly.
              </p>
            </details>

            {/* Question 3 */}
            <details className="bg-white shadow-md rounded-lg p-6 group">
              <summary className="font-semibold cursor-pointer text-lg flex justify-between items-center">
                <span>Is my data secure on this platform?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Absolutely! We use industry-standard encryption and secure
                servers to protect your data and ensure privacy.
              </p>
            </details>

            {/* Question 4 */}
            <details className="bg-white shadow-md rounded-lg p-6 group">
              <summary className="font-semibold cursor-pointer text-lg flex justify-between items-center">
                <span>Are there any fees for using this platform?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The platform offers both free and premium plans. Premium plans
                provide advanced features like extended storage and real-time
                collaboration tools.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Cookie Consent Popup */}
      {showCookiesPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
            <p className="text-base text-gray-800 mb-6 leading-relaxed">
              This website stores cookies on your computer. These cookies are
              used to collect information about how you interact with our
              website and allow us to remember you. For more information, see
              our Privacy Policy.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAcceptCookies}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Accept
              </button>
              <button
                onClick={handleDeclineCookies}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

