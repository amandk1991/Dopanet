
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  customComponent?: ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ customComponent }) => {
  return (
    <section id="hero" className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
          <div className="text-center md:text-left w-full md:w-1/2 reveal fade-right">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                WiFi Display Ad Network
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Connect With <span className="text-dopanet-500 relative">
                Millions
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-dopanet-300/50 dark:text-dopanet-700/50" viewBox="0 0 100 15" preserveAspectRatio="none">
                  <path d="M0,5 Q40,15 80,5 T160,5" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span> of Users Daily
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl md:mx-0 mx-auto">
              Target travelers, shoppers, and commuters with engaging WiFi display ads across India's most populated hotspots—right when they connect.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="text-base sm:text-lg px-6 py-6 sm:px-8 bg-dopanet-500 hover:bg-dopanet-600 text-white shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
              >
                Start Advertising Campaign
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-base sm:text-lg px-6 py-6 sm:px-8 shadow-sm border-2 transition-all duration-300 hover:translate-y-[-2px]"
              >
                View Ad Plans
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">JD</div>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">MR</div>
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">AS</div>
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">TK</div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Trusted by <span className="font-medium">2,500+</span> businesses across India
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 reveal fade-left relative">
            {customComponent ? customComponent : (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border dark:border-gray-800">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-dopanet-500/20 rounded-full"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full"></div>
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs font-medium text-gray-500">CafeConnect WiFi</div>
                    </div>
                  </div>
                  <div className="bg-dopanet-50 dark:bg-dopanet-900/30 p-6 rounded-lg border border-dopanet-100 dark:border-dopanet-800">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-dopanet-500 text-white rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                          <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                          <line x1="12" y1="20" x2="12.01" y2="20"></line>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Connect to Free WiFi</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Watch a 5-second ad to access high-speed internet</p>
                    </div>
                    <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Your Ad Here</div>
                        <div className="text-xs text-gray-400">Ad • 0:05</div>
                      </div>
                      <div className="relative h-32 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Your Brand Advertisement</span>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded">
                          Skip in 5s
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
