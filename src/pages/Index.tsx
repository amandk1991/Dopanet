
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustSection from "@/components/TrustSection";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BudgetCalculator from "@/components/BudgetCalculator";
import { Button } from "@/components/ui/button";
import HeroDeviceMockups from "@/components/HeroDeviceMockups";
import HeroHighlight from "@/components/HeroHighlight";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  useEffect(() => {
    // Check for user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    // Fix number inputs to allow increase with mouse wheel
    const fixNumberInputs = () => {
      document.querySelectorAll('input[type="number"]').forEach((input) => {
        input.addEventListener('wheel', function(e: WheelEvent) {
          // Prevent default only when input is focused
          if (document.activeElement === input) {
            e.preventDefault();
            
            const delta = Math.sign(e.deltaY) * -1;
            const inputElement = input as HTMLInputElement;
            const currentValue = parseFloat(inputElement.value) || 0;
            const step = parseFloat(inputElement.step) || 1;
            
            // Calculate new value
            let newValue = currentValue + (delta * step);
            
            // Handle min and max values
            const min = inputElement.min !== "" ? parseFloat(inputElement.min) : 0; // Default min to 0
            const max = inputElement.max !== "" ? parseFloat(inputElement.max) : null;
            
            // Ensure value is not negative
            newValue = Math.max(newValue, min);
            
            // Enforce maximum value of 30 for campaign days
            if (inputElement.id === "campaignDays" || inputElement.name === "campaignDays") {
              newValue = Math.min(newValue, 30);
            } else if (max !== null) {
              newValue = Math.min(newValue, max);
            }
            
            // Update input value
            inputElement.value = String(newValue);
            
            // Trigger input event for React state updates
            const inputEvent = new Event('input', { bubbles: true });
            inputElement.dispatchEvent(inputEvent);
            
            // Also trigger change event for React form handlers
            const changeEvent = new Event('change', { bubbles: true });
            inputElement.dispatchEvent(changeEvent);
          }
        });
      });
    };
    
    fixNumberInputs();
    
    // Re-apply fix when DOM changes (for dynamically added inputs)
    const observer2 = new MutationObserver(fixNumberInputs);
    observer2.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      observer2.disconnect();
    };
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newValue;
    });
  };

  return (
    <ScrollArea className="h-screen w-full">
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <HeroSection customComponent={<HeroDeviceMockups />} />
        <HeroHighlight />
        <AboutSection />
        <HowItWorks />
        <WhyChooseUs />
        <TrustSection />
        <FaqSection />
        <ContactForm />
        <Footer toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        
        {/* Floating calculator button */}
        <div className="fixed bottom-6 right-6 z-40">
          <Button 
            onClick={() => setCalculatorOpen(true)}
            className="bg-dopanet-500 hover:bg-dopanet-600 text-white shadow-lg rounded-full px-6 py-6 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>Budget Calculator</span>
          </Button>
        </div>
        
        <BudgetCalculator isOpen={calculatorOpen} setIsOpen={setCalculatorOpen} />
      </div>
    </ScrollArea>
  );
};

export default Index;
