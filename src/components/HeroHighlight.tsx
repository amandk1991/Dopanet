
import React from 'react';

const HeroHighlight: React.FC = () => {
  return (
    <div className="mt-8 mb-12 container mx-auto px-4">
      <div className="bg-gradient-to-r from-dopanet-500/20 to-teal-500/20 p-6 sm:p-8 rounded-lg border-2 border-dopanet-500 border-dashed animate-pulse shadow-lg">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-dopanet-600 dark:text-dopanet-400">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-dopanet-600 to-teal-600 dark:from-dopanet-400 dark:to-teal-400">
            TRY FOR FREE: Get 2 Weeks Free Trial!
          </span>
        </h3>
        <p className="text-center mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium">
          No credit card required • Full access to all features • Cancel anytime
        </p>
        <div className="flex justify-center mt-6">
          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md text-dopanet-600 dark:text-dopanet-400 font-medium animate-bounce">
            Limited Time Offer!
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHighlight;
