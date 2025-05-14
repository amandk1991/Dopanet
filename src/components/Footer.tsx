
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Wifi } from "lucide-react";

interface FooterProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 left-1/4 h-40 w-40 bg-dopanet-100 dark:bg-dopanet-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 h-40 w-40 bg-teal-100 dark:bg-teal-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Wifi className="h-8 w-8 text-dopanet-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Dopanet</span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              India's leading WiFi advertising platform, connecting businesses with users through innovative screen-space advertising.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-dopanet-500 dark:text-gray-400 dark:hover:text-dopanet-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 6c-.66.31-1.35.53-2.08.62.75-.45 1.32-1.16 1.58-2-.7.42-1.47.72-2.29.88-.65-.7-1.58-1.14-2.61-1.14-1.98 0-3.57 1.6-3.57 3.57 0 .28.03.55.09.82-2.97-.15-5.6-1.57-7.36-3.73-.31.53-.49 1.15-.49 1.8 0 1.24.63 2.33 1.59 2.97-.59-.02-1.14-.18-1.62-.44v.04c0 1.73 1.23 3.17 2.86 3.5-.3.08-.61.13-.94.13-.22 0-.44-.02-.65-.07.46 1.42 1.78 2.45 3.34 2.48-1.22.95-2.76 1.52-4.44 1.52-.29 0-.58-.02-.85-.05 1.58 1.01 3.46 1.6 5.48 1.6 6.58 0 10.18-5.46 10.18-10.18 0-.16 0-.31-.01-.46.7-.51 1.3-1.14 1.79-1.86z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-dopanet-500 dark:text-gray-400 dark:hover:text-dopanet-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm-1.12 18h-2.25v-7.5h2.25V18zm-1.12-8.25c-.74 0-1.35-.6-1.35-1.35s.61-1.35 1.35-1.35c.75 0 1.35.6 1.35 1.35s-.6 1.35-1.35 1.35zM18 18h-2.25v-4.5c0-.675-.338-1.35-1.35-1.35s-1.35.675-1.35 1.35V18h-2.25v-7.5h2.25v.9c.45-.675 1.35-1.125 2.25-1.125C16.5 10.275 18 11.4 18 13.5V18z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-dopanet-500 dark:text-gray-400 dark:hover:text-dopanet-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.727 16.873c-.185.307-.593.576-1.182.576H7.455c-.59 0-1.015-.269-1.182-.576-.185-.354-.185-1.1-.185-1.7v-4.8c0-.523 0-1.168.146-1.522.184-.307.591-.577 1.18-.577h9.092c.59 0 1.015.27 1.182.577.184.354.184 1.1.184 1.7v4.8c.039.523.039 1.269-.145 1.523zm-3.273-8.35l-3.818 2.626-3.818-2.627V7.1l3.818 2.626L14.454 7.1v1.423z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-dopanet-500 dark:text-gray-400 dark:hover:text-dopanet-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.082 15.555c-.17.339-.516.571-.88.583-2.329.076-4.66.076-6.989 0-.364-.011-.71-.243-.88-.583-.526-1.056-.526-3.555 0-4.61.17-.34.516-.572.88-.584 2.329-.075 4.66-.075 6.989 0 .364.012.71.244.88.584.526 1.055.526 3.554 0 4.61zm-1.082-2.31v-1.99l-3.999-2.5v5l3.999-2.51z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                <a href="#about" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">Our Team</a>
              </li>
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">Press</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">Support</a>
              </li>
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">Documentation</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">GDPR Compliance</a>
              </li>
              <li>
                <a href="#" className="hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">DPDP Bill Compliance</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Dopanet. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300"
              >
                {isDarkMode ? (
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <span className="text-xs">Light Mode</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Moon className="h-4 w-4" />
                    <span className="text-xs">Dark Mode</span>
                  </div>
                )}
              </Button>
              <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">
                Sitemap
              </a>
              <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:text-dopanet-500 dark:hover:text-dopanet-400 transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
