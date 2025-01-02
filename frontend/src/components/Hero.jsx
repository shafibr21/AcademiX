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
        
          {/* Feature 4 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Robotics and Automation</h3>
            <a href="https://www.twi-global.com/technical-knowledge/faqs/what-is-industrial-automation-and-robotics" target="_blank" rel="noopener noreferrer">
              <img
                src={assets.robo} // Replace with the actual image URL
                alt=" Robotics and Automation"
                className="w-full mt-4 rounded-lg"
              />
            </a>
          </div>
          {/* Feature 1 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Artificial Intelligence and Machine Learning</h3>
            <a href="https://cloud.google.com/learn/artificial-intelligence-vs-machine-learning" target="_blank" rel="noopener noreferrer">
              <img
                src={assets.ml} // Replace with the actual image URL
                alt="Artificial Intelligence and Machine Learning"
                className="w-full mt-4 rounded-lg"
              />
            </a>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">
            Augmented and Virtual Reality
            </h3>
            <a href="https://www.splunk.com/en_us/blog/learn/ar-vr.html" target="_blank" rel="noopener noreferrer">
              <img
                src={assets.download} // Replace with the actual image URL
                alt="Augmented and Virtual Reality"
                className="w-full mt-4 rounded-lg"
              />
            </a>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Blockchain and Cryptocurrencies</h3>
            <a href="https://www.coursera.org/articles/blockchain-cryptocurrency" target="_blank" rel="noopener noreferrer">
              <img
                src={assets.block} // Replace with the actual image URL
                alt="Blockchain and Cryptocurrencies"
                className="w-full mt-4 rounded-lg"
              />
            </a>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Biotechnology and Bioengineering</h3>
            <a href="https://analyticalsciencejournals.onlinelibrary.wiley.com/journal/10970290" target="_blank" rel="noopener noreferrer">
              <img
                src={assets.bio} // Replace with the actual image URL
                alt="Biotechnology and Bioengineering"
                className="w-full mt-4 rounded-lg"
              />
            </a>
          </div>
          {/* Feature 6 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Neuroscience and Cognitive Studies</h3>
            <a href="https://www.remedypublications.com/journal-of-neuroscience-cognitive-studies-home.php" target="_blank" rel="noopener noreferrer">
              <img
                src={assets.neuro} // Replace with the actual image URL
                alt="Neuroscience and Cognitive Studies"
                className="w-full mt-4 rounded-lg"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
