import React from "react";

function Hero() {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-xl px-4 z-50">
      <div className="bg-[#1a261a] rounded-lg shadow-md p-4 flex items-start gap-4">
        {/* Icon */}
        <div>
          <i className="bx bx-bolt text-3xl p-2 rounded-full bg-[#1cb754] text-white"></i>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <h2 className="text-white text-lg font-bold">Rate Limit Reached</h2>
          <p className="text-gray-300 text-sm">
            You've made too many requests in a short period. Please wait a moment.
          </p>
          <p className="text-gray-400 text-xs">
            Try again in a few seconds for the best experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
