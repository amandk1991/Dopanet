
import React from "react";

const HeroDeviceMockups = () => {
  return (
    
    <div className="relative w-full max-w-3xl mx-auto h-64 md:h-96 overflow-hidden">
      {/* Laptop Mockup */}
      <div className="absolute right-0 top-4 md:right-16 md:top-0 transform -rotate-6 shadow-xl rounded-lg w-64 md:w-80 z-20">
        <div className="bg-gray-800 rounded-t-lg p-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-900 border-t-0 rounded-b-lg">
          {/* Website Content */}
          <div className="h-40 md:h-48 p-2 relative">
            <div className="bg-white dark:bg-gray-800 h-full w-full rounded overflow-hidden">
              <div className="h-1/4 bg-dopanet-700 dark:bg-dopanet-900 w-full flex items-center justify-center">
                <div className="h-4 bg-white/30 dark:bg-white/20 w-1/2 rounded"></div>
              </div>
              <div className="h-3/4 p-2">
                <div className="flex flex-col space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 w-3/4 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 w-1/2 rounded"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 w-5/6 rounded"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 w-4/6 rounded"></div>
                </div>
              </div>
              
              {/* Banner Ad Area */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-dopanet-100 dark:bg-dopanet-800/70 flex items-center justify-center border-t border-dopanet-200 dark:border-dopanet-700">
                <div className="text-xs text-dopanet-700 dark:text-dopanet-300 font-medium">
                  Banner Ad (5s)
                </div>
                <div className="absolute right-1 top-1 text-[8px] bg-white/80 dark:bg-black/80 px-1 rounded">Ad</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Mockup */}
      <div className="absolute left-0 md:left-16 bottom-0 transform rotate-6 shadow-xl rounded-3xl w-40 md:w-56 z-10">
        <div className="bg-gray-900 rounded-3xl p-2">
          {/* Phone Notch */}
          <div className="w-1/2 h-5 bg-black rounded-full mx-auto mb-1"></div>
          
          {/* Phone Screen */}
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl h-64 md:h-80 relative overflow-hidden">
            {/* App Content */}
            <div className="h-full p-2">
              {/* App Header */}
              <div className="h-6 bg-dopanet-600 dark:bg-dopanet-900 rounded-t-lg flex items-center justify-center">
                <div className="h-2 bg-white/30 w-1/2 rounded"></div>
              </div>
              
              {/* App Content */}
              <div className="mt-2 space-y-2">
                <div className="h-2 bg-gray-300 dark:bg-gray-700 w-5/6 rounded"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-700 w-4/6 rounded"></div>
                <div className="h-10 bg-white dark:bg-gray-800 rounded shadow-sm"></div>
                <div className="h-10 bg-white dark:bg-gray-800 rounded shadow-sm"></div>
              </div>
              
              {/* Video Ad Overlay */}
              <div className="absolute left-4 right-4 top-1/4 h-24 bg-dopanet-100 dark:bg-dopanet-800/70 rounded-md flex items-center justify-center border border-dopanet-200 dark:border-dopanet-700">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-900/80 flex items-center justify-center mb-2">
                    <div className="h-0 w-0 border-l-[10px] border-l-dopanet-500 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                  </div>
                  <div className="text-xs text-dopanet-700 dark:text-dopanet-300 font-medium">
                    Video Ad (10s)
                  </div>
                </div>
                <div className="absolute right-1 top-1 text-[8px] bg-white/80 dark:bg-black/80 px-1 rounded">Ad</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-dopanet-100 dark:bg-dopanet-900/30 rounded-full z-0 opacity-50"></div>
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-dopanet-200 dark:bg-dopanet-800/30 rounded-full z-0 opacity-40"></div>
    </div>
  );
};

export default HeroDeviceMockups;
