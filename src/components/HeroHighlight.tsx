
import React from 'react';

const HeroHighlight: React.FC = () => {
  return (
    <div className="mt-8 mb-12">
      <div className="bg-gradient-to-r from-dopanet-500/20 to-teal-500/20 p-4 sm:p-6 rounded-lg border-2 border-dopanet-500 border-dashed animate-pulse">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-dopanet-600 dark:text-dopanet-400">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-dopanet-600 to-teal-600 dark:from-dopanet-400 dark:to-teal-400">
            TRY FOR FREE: Get 2 Weeks Free Trial!
          </span>
        </h3>
        <p className="text-center mt-2 text-gray-700 dark:text-gray-300">
          No credit card required • Full access to all features • Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default HeroHighlight;
