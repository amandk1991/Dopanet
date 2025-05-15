
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  customComponent?: ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ customComponent }) => {
  return (
    <section id="hero" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
          <div className="text-center md:text-left w-full md:w-1/2 reveal fade-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Advertise Where <span className="text-dopanet-500">Attention Lives</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl md:mx-0 mx-auto">
              Use Dopanet's free WiFi display ads to target thousands of users across India—right on their screens.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="text-base sm:text-lg px-6 py-6 sm:px-8 bg-dopanet-500 hover:bg-dopanet-600 text-white"
              >
                Start Advertising in India
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-base sm:text-lg px-6 py-6 sm:px-8"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 reveal fade-left">
            {customComponent}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
