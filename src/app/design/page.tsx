import React from "react";

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚧 Under Construction 🚧
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We're working hard to bring you something amazing. Please check back
          later.
        </p>
        <div className="flex items-center space-x-4 justify-center">
          <a
            href="/"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
