import React from "react";

const YoutubeCard = () => {
  return (
    <div>
      {/* YouTube Videos Section */}
      <section className="px-6 py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
            Related YouTube Videos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Video 1 - AI in Education */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">
                AI in Education
              </h3>
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
              <h3 className="text-xl font-semibold mb-4 text-center">
                Blockchain for Academic Integrity
              </h3>
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
              <h3 className="text-xl font-semibold mb-4 text-center">
                Cloud Computing in Universities
              </h3>
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
              <h3 className="text-xl font-semibold mb-4 text-center">
                Data Privacy in E-Learning
              </h3>
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
              <h3 className="text-xl font-semibold mb-4 text-center">
                Smart Campus Solutions
              </h3>
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
              <h3 className="text-xl font-semibold mb-4 text-center">
                AR/VR for Interactive Learning
              </h3>
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
    </div>
  );
};

export default YoutubeCard;
