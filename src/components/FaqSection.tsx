
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FaqSection: React.FC = () => {
  const { toast } = useToast();
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: "user" | "bot", content: string}[]>([
    {
      role: "bot",
      content: "👋 Hi there! I'm the Dopanet AI assistant. How can I help you with advertising on our WiFi platform today?"
    }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { role: "user", content: chatMessage }]);
    
    // Simulate bot response
    setTimeout(() => {
      let response = "Thanks for your message! Our team will get back to you shortly.";
      
      // Simple keyword matching for demo purposes
      if (chatMessage.toLowerCase().includes("cost") || chatMessage.toLowerCase().includes("price")) {
        response = "Our pricing starts at ₹500 for local campaigns. You can use our budget calculator to estimate costs for your specific needs.";
      } else if (chatMessage.toLowerCase().includes("target") || chatMessage.toLowerCase().includes("audience")) {
        response = "You can target users by location, demographics, interests, and browsing patterns. Our platform delivers ads to users in specific areas like cafés, malls, and public spaces.";
      } else if (chatMessage.toLowerCase().includes("start") || chatMessage.toLowerCase().includes("begin")) {
        response = "To get started, click the 'Book a Demo' button and fill out the form. Our team will contact you within 24 hours to set up your account and guide you through creating your first campaign.";
      }
      
      setChatHistory(prev => [...prev, { role: "bot", content: response }]);
    }, 1000);
    
    setChatMessage("");
  };

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I register as an advertiser?",
          answer: "You can register by filling out the contact form on our website or by clicking the 'Start Advertising' button. Our team will reach out to set up your account within 24 hours."
        },
        {
          question: "Is there a minimum ad spend?",
          answer: "Yes, our minimum campaign budget starts at ₹500. This ensures that your ads receive significant exposure and generate meaningful results."
        },
        {
          question: "What types of ads can I display?",
          answer: "We support banner ads, video ads, and interactive rich media formats. All ads are designed to be non-intrusive while maintaining high visibility."
        }
      ]
    },
    {
      category: "Data & Privacy",
      questions: [
        {
          question: "Is Dopanet data usage compliant in India?",
          answer: "Yes, Dopanet is fully compliant with India's Digital Personal Data Protection (DPDP) Bill. We adhere to strict privacy standards to protect both user and advertiser data."
        },
        {
          question: "Do users know their data is used?",
          answer: "Absolutely. Users are clearly informed that the free WiFi service is ad-supported before they connect. We maintain transparency about how anonymized data is used for ad targeting."
        },
        {
          question: "What user data do you collect?",
          answer: "We collect anonymous browsing patterns and general location data. We never collect or store personally identifiable information such as names, phone numbers, or email addresses."
        }
      ]
    },
    {
      category: "Performance",
      questions: [
        {
          question: "How can I track ad performance?",
          answer: "All advertisers get access to our real-time analytics dashboard where you can track impressions, clicks, engagement rates, and estimated conversion metrics."
        },
        {
          question: "What's the average engagement rate?",
          answer: "Our platform achieves an average click-through rate of 6.2%, significantly higher than the industry standard of 0.5-1% for traditional digital ads."
        },
        {
          question: "Can I make changes to my campaign after it launches?",
          answer: "Yes, you can modify your campaign settings, targeting criteria, and creative assets at any time through our advertiser portal. Changes typically take effect within 15 minutes."
        }
      ]
    }
  ];

  return (
    <section id="faqs" className="section-padding bg-gray-50 dark:bg-gray-900/50 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Frequently <span className="text-dopanet-500">Asked Questions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Have questions about advertising with Dopanet? Get answers or chat with our AI assistant
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="glass-card p-6 md:p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Chat with our AI Assistant
              </h3>
              
              <div className="flex-grow overflow-y-auto mb-4 bg-white dark:bg-gray-800/50 rounded-lg p-4 shadow-inner h-96">
                <div className="space-y-4">
                  {chatHistory.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.role === 'user' 
                            ? 'bg-dopanet-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type your question here..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage} className="bg-dopanet-500 hover:bg-dopanet-600">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="reveal">
            <div className="glass-card p-6 md:p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Common Questions
              </h3>
              
              <div className="space-y-6">
                {faqs.map((category, i) => (
                  <div key={i} className="space-y-4">
                    <h4 className="text-lg font-semibold text-dopanet-500">
                      {category.category}
                    </h4>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, j) => (
                        <AccordionItem key={j} value={`item-${i}-${j}`} className="border-b border-gray-200 dark:border-gray-700">
                          <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white hover:text-dopanet-500 dark:hover:text-dopanet-400">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 dark:text-gray-300">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
