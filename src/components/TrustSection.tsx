
import React from "react";
import { Shield, Lock } from "lucide-react";

const TrustSection: React.FC = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Trust & <span className="text-dopanet-500">Data Protection</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We are committed to maintaining the highest standards of privacy and data security
            </p>
          </div>
          
          <div className="glass-card p-8 relative overflow-hidden reveal">
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 h-40 w-40 bg-dopanet-100 dark:bg-dopanet-900/30 rounded-full mix-blend-multiply filter blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 h-40 w-40 bg-teal-100 dark:bg-teal-900/30 rounded-full mix-blend-multiply filter blur-2xl"></div>
            
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="bg-dopanet-100 dark:bg-dopanet-900/30 p-6 rounded-full">
                  <Shield className="h-12 w-12 text-dopanet-500" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Compliant with Indian DPDP Bill
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Dopanet is fully compliant with India's Digital Personal Data Protection (DPDP) Bill, 
                    ensuring that all data collection and processing follows the strictest legal standards
                    for user privacy and data protection.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                      <Lock className="h-5 w-5 text-dopanet-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Anonymized Targeting
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We never collect or store personally identifiable information. All user data is anonymized
                      and aggregated for targeting purposes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                      <svg className="h-5 w-5 text-dopanet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      No Intrusive Tracking
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Unlike conventional ad networks, we don't use cookies or device fingerprinting to track users
                      across websites.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                      <svg className="h-5 w-5 text-dopanet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Transparent Disclosures
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Users are clearly informed about the ad-supported nature of our free WiFi service before
                      connecting.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                      <svg className="h-5 w-5 text-dopanet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Regular Compliance Audits
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Our platform undergoes regular security and privacy audits to ensure ongoing compliance
                      with evolving regulations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">A note for advertisers</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Our commitment to privacy doesn't limit advertising effectiveness. We've engineered our platform 
                  to deliver highly relevant ads while respecting user privacy, resulting in better engagement rates
                  than invasive targeting methods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
