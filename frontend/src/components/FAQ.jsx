import React from "react";

const FAQ = () => {
  return (
    <div>
      {/* FAQ Section */}
      <section id="faq" className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Question 1 */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="font-bold text-base text-gray-700 mb-2">
                How do I submit my thesis on this platform?
              </h3>
              <p className="text-sm text-gray-600">
                You can submit your thesis by creating an account, logging in, and navigating to the "Upload Thesis" section in your dashboard.
              </p>
            </div>

            {/* Question 2 */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="font-bold text-base text-gray-700 mb-2">
                Can I collaborate with others on a thesis?
              </h3>
              <p className="text-sm text-gray-600">
                Yes, the platform offers collaboration features to work with your peers or advisors seamlessly.
              </p>
            </div>

            {/* Question 3 */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="font-bold text-base text-gray-700 mb-2">
                Is my data secure on this platform?
              </h3>
              <p className="text-sm text-gray-600">
                Absolutely! We use industry-standard encryption and secure servers to protect your data and ensure privacy.
              </p>
            </div>

            {/* Question 4 */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="font-bold text-base text-gray-700 mb-2">
                Are there any fees for using this platform?
              </h3>
              <p className="text-sm text-gray-600">
                The platform offers both free and premium plans. Premium plans provide advanced features like extended storage and real-time collaboration tools.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
