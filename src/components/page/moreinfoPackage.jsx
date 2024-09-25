import React from "react";

function MoreinfoPackage() {
  return (
    <div className="min-h-screen md:px-[200px] bg-gray-50 py-8">
     
        {/* Hero Image */}
        <div className="mb-8">
          <img
            src="/images/safari-hero.jpg"
            alt="Safari Adventure"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Package Options */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Most Popular Packages</h2>

        {/* Integrated Safari Package */}
        <div className="bg-green-100 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-green-700">Integrated Safari</h3>
          <p className="text-lg text-gray-800 font-semibold">₹1800 Per Adults</p>
          <ul className="list-disc ml-6 mt-4 text-gray-700">
            <li>Safari Experience</li>
            <li>Herbivore Safari</li>
            <li>Tiger Safari</li>
            <li>Forest Safari</li>
            <li>Wildlife Observation</li>
            <li>Aviary</li>
          </ul>
        </div>

        {/* Zoo Safari Package */}
        <div className="bg-blue-100 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-blue-700">Zoo Safari</h3>
          <p className="text-lg text-gray-800 font-semibold">₹700 Per Adults</p>
          <ul className="list-disc ml-6 mt-4 text-gray-700">
            <li>Zoo Experience</li>
            <li>Animal Shows</li>
          </ul>
        </div>

        {/* Nature Safari Package */}
        <div className="bg-yellow-100 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-yellow-700">Nature Safari</h3>
          <p className="text-lg text-gray-800 font-semibold">₹850 Per Adults</p>
          <ul className="list-disc ml-6 mt-4 text-gray-700">
            <li>Nature Exploration</li>
            <li>Bird Watching</li>
          </ul>
        </div>

       
     

    </div>
  );
}

export default MoreinfoPackage;
