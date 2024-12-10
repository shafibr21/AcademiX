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
            Welcome to the Thesis Platform
          </h1>
          <p
            className="text-xl font-light mb-10 max-w-xl"
            style={{
              textShadow: "3px 3px 8px rgba(0, 0, 0, 0.8)",
            }}
          >
            <i>Empowering Academic Excellence, One Thesis at a Time.</i>
          </p>
        </div>
      </div>

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



