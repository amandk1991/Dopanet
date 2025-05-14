
import React from "react";
import { Wifi, Brain, Target } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Wifi className="h-8 w-8 text-white" />,
      emoji: "📶",
      title: "User Connects to Free WiFi",
      description: "Users connect to our free WiFi service available at cafés, restaurants, malls, and public spaces across India."
    },
    {
      icon: <Brain className="h-8 w-8 text-white" />,
      emoji: "🧠",
      title: "Dopanet Analyzes User Interest",
      description: "Our algorithm anonymously analyzes browsing patterns to identify relevant ad categories without storing personal data."
    },
    {
      icon: <Target className="h-8 w-8 text-white" />,
      emoji: "📢",
      title: "Relevant Business Ads are Shown",
      description: "Targeted ads from local businesses appear on a small portion of the user's screen, creating value for both parties."
    }
  ];

  return (
    <section id="how-it-works" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/95"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            How It <span className="text-dopanet-500">Works</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our simple process connects Indian businesses with their target audience through WiFi advertising
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="reveal" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="feature-card h-full flex flex-col relative overflow-hidden group">
                {/* Step number */}
                <div className="absolute -top-6 -right-6 bg-gray-100 dark:bg-gray-700 h-16 w-16 rounded-full flex items-end justify-start pb-1 pl-1">
                  <span className="text-dopanet-500 text-xl font-bold">0{index + 1}</span>
                </div>
                
                {/* Icon with background */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-dopanet-400 to-teal-600 rounded-full h-16 w-16 flex items-center justify-center animate-pulse-slow"></div>
                  <div className="bg-gradient-to-br from-dopanet-500 to-teal-500 h-16 w-16 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                
                {/* Emoji */}
                <div className="text-4xl mb-4">{step.emoji}</div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">{step.description}</p>
                
                {/* Animated highlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-dopanet-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 glass-card p-6 md:p-8 max-w-4xl mx-auto reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Visualize the Experience</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our non-intrusive ads appear on approximately 20% of the user's screen, positioned strategically to maintain good user experience while maximizing visibility.
              </p>
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  <span className="font-bold">90%+</span> user satisfaction rate
                </p>
              </div>
            </div>
            
            <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="aspect-video rounded-md bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                {/* Mock browser content */}
                <div className="absolute inset-0 p-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                </div>
                
                {/* Ad placement demonstration */}
                <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-r from-dopanet-500 to-teal-500 flex items-center justify-center">
                  <p className="text-xs text-white font-medium">Your Ad Appears Here</p>
                </div>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Example Ad Placement</p>
                <p className="text-xs font-medium text-dopanet-500">20% Screen Space</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Geometric shape decorations */}
      <div className="hidden lg:block absolute top-1/4 left-10 h-64 w-64 bg-dopanet-200 dark:bg-dopanet-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="hidden lg:block absolute bottom-20 right-10 h-40 w-40 bg-teal-200 dark:bg-teal-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
    </section>
  );
};

export default HowItWorks;
