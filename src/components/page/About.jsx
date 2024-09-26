import React from 'react';

const Zooinfo = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800">
        <div className="absolute inset-0 opacity-50">
          <img
            className="object-cover w-full h-full"
            src="/images/hero-about.jpg"
            alt="About Hero"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center text-white">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 text-lg">
            Learn more about our mission and the team behind NewZoo.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Who We Are</h2>
            <p className="mt-4 text-lg text-gray-600">
              We are dedicated to providing a safe and enriching environment for animals while educating the public about conservation efforts.
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
                <p className="mt-4 text-gray-600">
                  Our mission is to inspire and educate people about wildlife and conservation, through innovative exhibits and up-close animal experiences.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
                <p className="mt-4 text-gray-600">
                  We aim to be a world leader in the care, education, and conservation of endangered species.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Experiences</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our passionate team is dedicated to providing the best care for our animals and creating an unforgettable experience for our visitors.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover"
                src="/images/team-member-1.jpg"
                alt="Team Member 1"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">John Doe</h3>
              <p className="mt-2 text-base text-gray-600">Head of Animal Care</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover"
                src="/images/team-member-2.jpg"
                alt="Team Member 2"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Jane Smith</h3>
              <p className="mt-2 text-base text-gray-600">Zoo Educator</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover"
                src="/images/team-member-3.jpg"
                alt="Team Member 3"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Michael Brown</h3>
              <p className="mt-2 text-base text-gray-600">Conservation Specialist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-green-600 py-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Plan Your Visit !
          </h2>
          <p className="mt-4 text-lg text-white">
            Whether you're coming by bus, train, or flight, Rajgir Zoo & Nature
            Safari is ready to offer you an unforgettable experience!
          </p>
          <div className="mt-8">
            <a
              href="/"
              className="px-8 py-3 bg-white text-green-600 rounded-md hover:bg-gray-200"
            >
              Book Tickets Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zooinfo;
