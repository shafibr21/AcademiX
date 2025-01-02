import React, { useState } from "react";
import FAQ from "../components/FAQ";
import YoutubeCard from "../components/YoutubeCard";
import Hero from "../components/Hero";

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
      <Hero />



      <FAQ />

      {/* Cookie Consent Popup */}
      {/* {showCookiesPopup && (
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
      )} */}
    </div>
  );
};

export default Home;
