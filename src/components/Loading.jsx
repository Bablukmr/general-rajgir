import React from "react";

function Loadings() {
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white shadow-sm rounded-lg p-6 max-w-sm w-full">
        <div className="animate-pulse flex space-x-4">
          <div className="bg-gray-300 h-12 w-12 rounded-full"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="bg-gray-300 h-4 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-300 h-4 rounded col-span-2"></div>
                <div className="bg-gray-300 h-4 rounded col-span-1"></div>
              </div>
              <div className="bg-gray-300 h-4 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loadings;
