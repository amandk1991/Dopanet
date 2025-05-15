
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  customComponent?: ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ customComponent }) => {
  return (
    <section id="hero" className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Background design elements */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-300 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-300 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-green-300 blur-2xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
          <div className="text-center md:text-left w-full md:w-1/2 reveal fade-right">
            <div className="inline-block mb-4 px-4 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">India's First WiFi Ad Network</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Advertise Where <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Attention Lives</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl md:mx-0 mx-auto">
              Use Dopanet's free WiFi display ads to target thousands of users across India—right when they're most engaged on their screens.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="text-base sm:text-lg px-6 py-6 sm:px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
              >
                Start Advertising in India
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-base sm:text-lg px-6 py-6 sm:px-8 border-2 hover:bg-blue-50 dark:hover:bg-gray-800"
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
              <div className="text-center p-3">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">5000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Hotspots</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">12M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Users</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">97%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">View Rate</div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 reveal fade-left">
            {customComponent}
          </div>
        </div>
      </div>
      
      {/* Curved wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto">
          <path 
            fill="currentColor" 
            className="text-white dark:text-gray-900"
            d="M0,64L48,58.7C96,53,192,43,288,42.7C384,43,480,53,576,58.7C672,64,768,64,864,61.3C960,59,1056,53,1152,42.7C1248,32,1344,16,1392,8L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
