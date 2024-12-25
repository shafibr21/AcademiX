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
    </div>
  );
};

export default FAQ;