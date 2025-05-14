
import React from "react";
import { Target, BarChart, Lock, ShoppingBag } from "lucide-react";

const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: <Target className="h-8 w-8 text-dopanet-500" />,
      emoji: "🎯",
      title: "Targeted Local Ads",
      description: "Reach potential customers when they're near your business. Serve ads based on location, demographics, and interests."
    },
    {
      icon: <BarChart className="h-8 w-8 text-dopanet-500" />,
      emoji: "📊",
      title: "Transparent Analytics",
      description: "Access real-time performance data. Monitor impressions, engagement rates, and ROI through our easy-to-understand dashboard."
    },
    {
      icon: <Lock className="h-8 w-8 text-dopanet-500" />,
      emoji: "🔐",
      title: "Data Privacy Compliant",
      description: "GDPR and Indian DPDP Bill compliant. We never collect or share personal user information."
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-dopanet-500" />,
      emoji: "🛒",
      title: "Boost Local Business",
      description: "Connect with customers within walking distance of your store. Offer timely promotions to drive foot traffic."
    }
  ];

  return (
    <section id="why-us" className="section-padding bg-gray-50 dark:bg-gray-900/50 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Why Advertise <span className="text-dopanet-500">With Us</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Discover how Dopanet helps Indian businesses connect with potential customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="reveal" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="feature-card h-full flex flex-col group">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="mb-4 bg-dopanet-100 dark:bg-dopanet-900/30 p-4 rounded-2xl">
                    {benefit.icon}
                  </div>
                  <div className="text-4xl mb-2">{benefit.emoji}</div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white text-center">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {benefit.description}
                </p>
                
                <div className="mt-4 h-1 w-0 bg-gradient-to-r from-dopanet-500 to-teal-500 group-hover:w-full transition-all duration-500 mx-auto rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 glass-card p-6 md:p-8 max-w-4xl mx-auto reveal">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                The Indian Advantage
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                India's rapidly growing internet user base presents an unprecedented opportunity for advertisers. 
                With Dopanet, you can:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                    <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Target the <span className="font-medium">750+ million</span> internet users in India
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                    <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Connect with <span className="font-medium">local consumers</span> in your neighborhood
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                    <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Pay less</span> than traditional advertising with higher conversion
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="md:col-span-5 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-dopanet-500/20 to-teal-500/20 rounded-xl blur"></div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 relative">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Avg. Click Rate</span>
                      <span className="font-bold text-dopanet-500">6.2%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-dopanet-500 to-teal-500 rounded-full" style={{ width: "62%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Conversion Rate</span>
                      <span className="font-bold text-dopanet-500">3.8%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-dopanet-500 to-teal-500 rounded-full" style={{ width: "38%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Daily Active Users</span>
                      <span className="font-bold text-dopanet-500">280K+</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-dopanet-500 to-teal-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative shapes */}
      <div className="hidden lg:block absolute top-20 right-20 w-40 h-40 bg-dopanet-100 dark:bg-dopanet-900/30 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
      <div className="hidden lg:block absolute bottom-40 left-10 w-32 h-32 bg-teal-100 dark:bg-teal-900/30 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
    </section>
  );
};

export default WhyChooseUs;
