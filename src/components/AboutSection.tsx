
import React from "react";
import { Wifi, Users, BarChart } from "lucide-react";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            About <span className="text-dopanet-500">Dopanet</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Connecting businesses with their target audience through India's most innovative free WiFi platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6 reveal">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Free WiFi that Benefits Everyone
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-dopanet-100 dark:bg-dopanet-900/30 p-3 rounded-lg">
                    <Wifi className="h-6 w-6 text-dopanet-500" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    For Users
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Users enjoy completely free, high-speed WiFi in public spaces across India. 
                    In exchange, they view non-intrusive, relevant advertisements on a small portion of their screen.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-dopanet-100 dark:bg-dopanet-900/30 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-dopanet-500" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    For Businesses
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Businesses gain access to a captive audience actively using the internet. 
                    Our platform delivers hyper-targeted ads based on location, demographics, and browsing patterns.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-dopanet-100 dark:bg-dopanet-900/30 p-3 rounded-lg">
                    <BarChart className="h-6 w-6 text-dopanet-500" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    For WiFi Hosts
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Cafés, malls, and public spaces that host our WiFi earn passive revenue through ad shares, 
                    while attracting more customers with free internet access.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 reveal">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-dopanet-200 dark:bg-dopanet-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              
              <div className="glass-card relative">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" 
                  alt="Dopanet user experience" 
                  className="rounded-xl shadow-lg w-full"
                />
                
                <div className="absolute top-4 right-4 glass-card p-4 max-w-xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <p className="text-xs font-medium">Ad Display Example</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-md p-2 border border-gray-200 dark:border-gray-700">
                    <div className="h-12 w-full bg-gradient-to-r from-dopanet-100 to-teal-100 dark:from-dopanet-900 dark:to-teal-900 rounded flex items-center justify-center">
                      <p className="text-xs text-dopanet-600 dark:text-dopanet-300 font-medium">Your Ad Here</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  <span className="text-dopanet-500 font-bold">60%</span> higher engagement than traditional ads
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Geometric shape decorations */}
      <div className="hidden lg:block absolute top-1/3 right-0 h-64 w-64 bg-teal-300 dark:bg-teal-900/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="hidden lg:block absolute bottom-10 left-10 h-32 w-32 bg-dopanet-300 dark:bg-dopanet-900/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
    </section>
  );
};

export default AboutSection;
