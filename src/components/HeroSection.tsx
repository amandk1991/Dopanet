
import React from "react";
import { Button } from "@/components/ui/button";
import { Wifi, ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="hero-gradient min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10"></div>
      
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
              
              <div className="glass-card p-6 relative">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500"
                  alt="User enjoying Dopanet free WiFi"
                  className="rounded-lg shadow-lg w-full max-w-md"
                />
                
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
