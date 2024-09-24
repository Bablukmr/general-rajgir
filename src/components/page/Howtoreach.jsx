import React from "react";
import { FaBus, FaTrain, FaPlane } from "react-icons/fa";
import { Slide, Zoom } from "react-awesome-reveal";

function Howtoreach() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-72"
        style={{ backgroundImage: 'url("/images/rajgir-safari.jpg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <h1 className="text-4xl font-bold text-white">
            How to Reach Rajgir Zoo & Nature Safari
          </h1>
        </div>
      </div>

      {/* How to Reach Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Ways to Reach Rajgir Zoo & Nature Safari
        </h2>

        {/* Bus */}
        <Slide direction="left">
          <div className="flex items-center space-x-6 bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="p-4 bg-green-500 rounded-full">
              <FaBus className="text-white text-4xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">By Bus</h3>
              <p className="mt-2 text-gray-600">
                Rajgir is well-connected by roadways. Regular bus services are
                available from major cities like Patna, Gaya, and Nalanda. You
                can easily catch state-run buses or private buses heading
                towards Rajgir. The bus stand is located at a convenient
                distance from Rajgir Zoo and Nature Safari.
              </p>
            </div>
          </div>
        </Slide>

        {/* Train */}
        <Slide direction="right">
          <div className="flex items-center space-x-6 bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="p-4 bg-blue-500 rounded-full">
              <FaTrain className="text-white text-4xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">By Train</h3>
              <p className="mt-2 text-gray-600">
                The nearest railway station to Rajgir Zoo and Nature Safari is
                Rajgir Railway Station, which is about 5 km away. Rajgir is
                well-connected by train to major cities like Patna, Gaya, and
                Kolkata. From the railway station, you can easily hire a taxi or
                take a local bus to reach the zoo.
              </p>
            </div>
          </div>
        </Slide>

        {/* Flight */}
        <Zoom>
          <div className="flex items-center space-x-6 bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="p-4 bg-red-500 rounded-full">
              <FaPlane className="text-white text-4xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">By Flight</h3>
              <p className="mt-2 text-gray-600">
                The nearest airport is the Jay Prakash Narayan International
                Airport in Patna, about 100 km from Rajgir. From the airport,
                you can hire a taxi or use state transport to reach Rajgir. The
                drive from Patna to Rajgir takes approximately 2 to 3 hours.
              </p>
            </div>
          </div>
        </Zoom>

        {/* Map Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Location on Map
          </h3>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19371.20537980913!2d85.41638767640069!3d24.99849769239698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2e590dcf3d997%3A0x29130801dafb8128!2sRAJGIR%20WILDLIFE%20SAFARI!5e1!3m2!1sen!2sin!4v1727162814319!5m2!1sen!2sin"
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
              className="border-0 rounded-lg shadow-lg"
              title="Rajgir Zoo & Nature Safari Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-green-600 py-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Plan Your Visit Today!
          </h2>
          <p className="mt-4 text-lg text-white">
            Whether you're coming by bus, train, or flight, Rajgir Zoo & Nature
            Safari is ready to offer you an unforgettable experience!
          </p>
          <div className="mt-8">
            <a
              href="/book-tickets"
              className="px-8 py-3 bg-white text-green-600 rounded-md hover:bg-gray-200"
            >
              Book Tickets Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Howtoreach;
