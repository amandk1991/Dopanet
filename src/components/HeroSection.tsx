
import React from "react";
import { Button } from "@/components/ui/button";
import { Wifi, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="hero-gradient min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-dopanet-900/60 to-black/60 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Symbol/icon */}
            <div className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Wifi className="h-8 w-8 text-white" />
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-1 rounded-full">
                <span className="text-white text-sm font-medium">India's WiFi Ad Platform</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Advertise Where <br />
              <span className="text-teal-300">Attention Lives</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white opacity-90 max-w-lg animate-fade-in" style={{ animationDelay: "0.6s" }}>
              Use Dopanet's free WiFi display ads to target thousands of users across India—right on their screens.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <Button 
                size="lg" 
                className="bg-white text-dopanet-600 hover:bg-teal-50 hover:text-dopanet-700 rounded-full px-8 text-base font-medium"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start Advertising in India
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent text-white border-white hover:bg-white hover:text-dopanet-600 rounded-full px-8 text-base font-medium"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                How it Works
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center animate-fade-in-right" style={{ animationDelay: "1s" }}>
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-dopanet-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float" style={{ animationDelay: "1.5s" }}></div>
              
              {/* New device mockup showing ads */}
              <div className="glass-card p-4 relative flex">
                {/* Mobile device mockup */}
                <div className="relative mr-5 shadow-xl">
                  <div className="w-[180px] bg-gray-800 rounded-[24px] p-2 shadow-lg">
                    <div className="bg-black rounded-[18px] overflow-hidden">
                      <div className="w-full h-[350px] relative">
                        <div className="absolute top-0 left-0 w-full h-12 bg-gray-900 flex justify-center items-center">
                          <div className="w-20 h-5 bg-black rounded-full"></div>
                        </div>
                        
                        {/* Main screen content */}
                        <div className="w-full h-full pt-12 bg-white">
                          <div className="h-full w-full relative flex flex-col">
                            <div className="flex-1 p-2">
                              <div className="w-full h-20 bg-gray-100 rounded-lg mb-2"></div>
                              <div className="w-full h-20 bg-gray-100 rounded-lg mb-2"></div>
                              <div className="w-full h-20 bg-gray-100 rounded-lg"></div>
                            </div>
                            
                            {/* Ad overlay at bottom */}
                            <div className="h-24 bg-gradient-to-r from-dopanet-500 to-teal-500 p-3 flex items-center">
                              <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 flex items-center justify-center text-2xl">
                                🛍️
                              </div>
                              <div className="ml-3 text-white">
                                <div className="text-xs font-bold">SPECIAL OFFER</div>
                                <div className="text-sm">20% off all new arrivals!</div>
                                <div className="text-xs mt-1 bg-white text-dopanet-600 rounded-full px-2 py-0.5 inline-block">Shop Now</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Laptop device mockup */}
                <div className="relative shadow-xl">
                  <div className="w-[320px] bg-gray-800 rounded-lg p-2 pt-1 shadow-lg">
                    <div className="w-full h-4 mb-1 flex justify-center items-center">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                    <div className="bg-black rounded overflow-hidden">
                      <div className="w-full h-[200px] relative">
                        {/* Laptop screen content */}
                        <div className="w-full h-full bg-white">
                          <div className="h-full w-full relative flex flex-col">
                            <div className="h-8 bg-gray-200 flex items-center px-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              </div>
                            </div>
                            
                            <div className="flex-1 p-2 flex">
                              {/* Main content */}
                              <div className="flex-1">
                                <div className="w-full h-4 bg-gray-100 rounded mb-2"></div>
                                <div className="w-full h-4 bg-gray-100 rounded mb-2"></div>
                                <div className="w-3/4 h-4 bg-gray-100 rounded"></div>
                              </div>
                              
                              {/* Ad overlay on side */}
                              <div className="w-24 bg-gradient-to-b from-dopanet-500 to-teal-500 rounded p-2 flex flex-col items-center">
                                <div className="w-full h-14 bg-white rounded flex items-center justify-center text-2xl">
                                  🍕
                                </div>
                                <div className="text-white text-xs mt-2 text-center font-medium">Get 50% off first order!</div>
                                <div className="mt-2 bg-white text-dopanet-600 rounded-full px-2 py-1 text-[10px] font-bold">Order Now</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[350px] h-4 bg-gray-800 mt-1 mx-auto rounded-b-xl"></div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 glass-card p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium">2,500+ Active WiFi Zones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Geometric shapes */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-dopanet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute top-32 -right-16 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
    </section>
  );
};

export default HeroSection;
