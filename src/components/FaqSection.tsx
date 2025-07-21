
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent, 
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FaqSection: React.FC = () => {
  const { toast } = useToast();
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "bot", content: string }[]>([
    {
      role: "bot",
      content: "👋 Hi there! I'm the Dopanet AI assistant. How can I help you with advertising on our WiFi platform today?"
    }
  ]);
  const [inputStep, setInputStep] = useState('initial'); // 'initial', 'budget', 'adType', 'duration', 'campaignDays', 'hitsPerPerson', 'targeting', 'calculating'
  const [campaignDetails, setCampaignDetails] = useState({
    budget: null as number | null,
    adType: null as 'banner' | 'video' | null,
    duration: null as number | null, // in seconds
    campaignDays: null as number | null,
    hitsPerPerson: null as number | null,
    targeting: {
      gender: null as string | null,
      age: null as string | null,
      premises: [] as string[],
      cities: [] as string[], // Assuming city targeting is possible and affects CPM
    },
  });

  // Function to calculate campaign metrics
  const calculateCampaignMetrics = () => {
    const { budget, adType, duration, campaignDays, hitsPerPerson, targeting } = campaignDetails;

    if (budget === null || adType === null || duration === null || campaignDays === null || hitsPerPerson === null) {
      return null; // Not enough information
    }

    const baseCpm = (duration || (adType === 'banner' ? 5 : 10)) * 10; // Use provided duration or min if not set
   let targetingCpmIncrease = 0;
    
    // Calculate targeting CPM increase
    if (targeting.gender && targeting.gender !== 'General') {
      targetingCpmIncrease += adType === 'video' ? 30 : 15;
    }
    if (targeting.age) {
      targetingCpmIncrease += adType === 'video' ? 30 : 15;
    }
    targetingCpmIncrease += (adType === 'video' ? 30 : 15) * targeting.premises.length;
 targetingCpmIncrease += (adType === 'video' ? 30 : 15) * targeting.cities.length;

    const totalCpm = baseCpm + targetingCpmIncrease;
    
    // Calculations based on provided formulas
    const estimatedImpressions = (budget / totalCpm) * 100 * (campaignDays / 30); // Adjusted formula based on days and CPM definition
    const estimatedReach = estimatedImpressions / hitsPerPerson;
    const impressionsPerDay = estimatedImpressions / campaignDays;
    // Assuming 'hits per person per day' is implicitly hitsPerPerson / campaignDays for calculation convenience
    const reachPerDay = estimatedReach / campaignDays; // Assuming reach per day is total reach / campaign days

    return {
      totalCpm: totalCpm.toFixed(2),
      estimatedImpressions: Math.round(estimatedImpressions),
      estimatedReach: Math.round(estimatedReach),
      impressionsPerDay: Math.round(impressionsPerDay),
      reachPerDay: Math.round(reachPerDay),
    };
  };

  // Simple function to recommend plans based on estimated reach (monthly)
  const recommendPlans = (monthlyReach: number) => {
    // Simplified example based on plan structure description
    const recommendations: string[] = [];

    // Example plan data (replace with actual parsing of the full dopanetInfo if needed)
    const plans = [
      { price: 999, reach: 10000, type: 'video' },
      { price: 1499, reach: 15000, type: 'video' },
      { price: 1999, reach: 20000, type: 'video' },
      { price: 2999, reach: 30000, type: 'video' },
      { price: 4999, reach: 50000, type: 'video' },
      { price: 9999, reach: 100000, type: 'video' },
      { price: 19999, reach: 220000, type: 'video' }, // Silver +10%
      { price: 29999, reach: 330000, type: 'video' }, // Silver +10%
      { price: 39999, reach: 440000, type: 'video' }, // Silver +10%
      { price: 49999, reach: 550000, type: 'video' }, // Silver +10%
      { price: 99999, reach: 1150000, type: 'video' }, // Gold +15%
      // ... add more video plans

      { price: 999, reach: 20000, type: 'banner' },
      { price: 1499, reach: 30000, type: 'banner' },
      { price: 1999, reach: 40000, type: 'banner' },
      { price: 2999, reach: 60000, type: 'banner' },
      { price: 4999, reach: 100000, type: 'banner' },
      { price: 9999, reach: 200000, type: 'banner' },
      { price: 19999, reach: 440000, type: 'banner' }, // Silver +10%
      // ... add more banner plans
    ];

    const filteredPlans = plans.filter(plan => plan.type === campaignDetails.adType);

    // Find plans that meet or exceed the monthly reach, sorted by price
    const suitablePlans = filteredPlans
      .filter(plan => plan.reach >= monthlyReach)
      .sort((a, b) => a.price - b.price);

    if (suitablePlans.length > 0) {
      recommendations.push("Based on your estimated monthly reach, here are some potential plans:");
      suitablePlans.slice(0, 3).forEach(plan => { // Recommend top 3 by price
        recommendations.push(`- ₹${plan.price.toLocaleString()} Plan (Offers ~${plan.reach.toLocaleString()} monthly reach)`);
      });
      if (suitablePlans.length > 3) {
        recommendations.push("... and other plans are available with higher reach.");
      }
      recommendations.push("\nVisit our website for the full pricing details.");
    } else {
      recommendations.push("Based on your estimated monthly reach, we recommend reviewing our higher-tier plans or contacting sales for a custom quote.");
    }

    return recommendations.join('\n');
  };


  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { role: "user", content: chatMessage }]);
    const lowerCaseMessage = chatMessage.trim().toLowerCase();
    setChatMessage(""); // Clear the input field immediately

    let botResponse = '';
    let nextStep = inputStep;

    switch (inputStep) {
      case 'initial':
        if (lowerCaseMessage.includes('campaign') || lowerCaseMessage.includes('advertise') || lowerCaseMessage.includes('plan')) {
          botResponse = "Okay, let's plan your campaign. First, what is your approximate budget in INR?";
          nextStep = 'budget';
        } else {
          // Default response for general questions (can be enhanced with a simple AI model if needed)
          botResponse = "Thanks for your message! I can help you plan a campaign. What is your approximate budget?";
          nextStep = 'budget'; // Move to budget step
        }
        break;
      case 'budget':
        const budgetMatch = lowerCaseMessage.match(/(\d+)/);
        if (budgetMatch && budgetMatch[1]) {
          const budget = parseInt(budgetMatch[1], 10);
          setCampaignDetails(prev => ({ ...prev, budget }));
          botResponse = "Great. Now, what type of ad are you interested in? Banner or Video?";
          nextStep = 'adType';
        } else {
          botResponse = "Please provide your budget in numbers (e.g., 'My budget is 5000').";
          nextStep = 'budget'; // Stay on budget step
        }
        break;
      case 'adType':
        if (lowerCaseMessage.includes('banner')) {
          setCampaignDetails(prev => ({ ...prev, adType: 'banner', duration: 5 })); // Default banner duration
          botResponse = "Understood, Banner Ad. How many days will your campaign run (up to 30 days)?";
          nextStep = 'campaignDays';
        } else if (lowerCaseMessage.includes('video')) {
          setCampaignDetails(prev => ({ ...prev, adType: 'video', duration: 10 })); // Default video duration
          botResponse = "Understood, Video Ad. How many days will your campaign run (up to 30 days)?";
          nextStep = 'campaignDays';
        } else {
          botResponse = "Please specify either 'Banner' or 'Video' ad type.";
          nextStep = 'adType'; // Stay on adType step
        }
        break;
      case 'campaignDays':
        const daysMatch = lowerCaseMessage.match(/(\d+)/);
        if (daysMatch && daysMatch[1]) {
          const days = parseInt(daysMatch[1], 10);
          if (days > 0 && days <= 30) {
            setCampaignDetails(prev => ({ ...prev, campaignDays: days }));
            botResponse = "Thanks. On average, how many times should one person see your ad during the campaign?";
            nextStep = 'hitsPerPerson';
          } else {
            botResponse = "Please provide the number of campaign days as a number between 1 and 30.";
            nextStep = 'campaignDays'; // Stay on campaignDays step
          }
        } else {
          botResponse = "Please provide the number of campaign days as a number (e.g., '15 days').";
          nextStep = 'campaignDays'; // Stay on campaignDays step
        }
        break;
      case 'hitsPerPerson':
        const hitsMatch = lowerCaseMessage.match(/(\d+)/);
        if (hitsMatch && hitsMatch[1]) {
          const hits = parseInt(hitsMatch[1], 10);
          if (hits > 0) {
            setCampaignDetails(prev => ({ ...prev, hitsPerPerson: hits }));
            botResponse = "Okay. Do you have any specific targeting preferences (e.g., gender, age group, premise types like cafes or malls, or cities) or should we use general targeting?";
            nextStep = 'targeting';
          } else {
            botResponse = "Please provide a valid number for how many times one person should see your ad.";
            nextStep = 'hitsPerPerson'; // Stay on hitsPerPerson step
          }
        } else {
          botResponse = "Please provide the number of times per person as a number (e.g., '3 times').";
          nextStep = 'hitsPerPerson'; // Stay on hitsPerPerson step
        }
        break;
      case 'targeting':
        // Simplified targeting interpretation - can be expanded
        const targetingUpdates: { gender?: string | null; age?: string | null; premises?: string[]; cities?: string[] } = {};

        if (lowerCaseMessage.includes('male')) targetingUpdates.gender = 'Male';
        if (lowerCaseMessage.includes('female')) targetingUpdates.gender = 'Female';
        if (lowerCaseMessage.includes('other gender')) targetingUpdates.gender = 'Other';

        // Basic age group detection (can be made more robust)
        const ageMatch = lowerCaseMessage.match(/(\d+)-(\d+)\s*age/);
        if (ageMatch && ageMatch[1] && ageMatch[2]) {
          targetingUpdates.age = `${ageMatch[1]}-${ageMatch[2]}`;
        } else if (lowerCaseMessage.includes('age')) {
          targetingUpdates.age = 'Specified'; // Indicate age is specified but needs more detail
        }

        // Basic premise type detection
        const premisesKeywords = ['cafe', 'mall', 'restaurant', 'hostel', 'college'];
        const selectedPremises = premisesKeywords.filter(keyword => lowerCaseMessage.includes(keyword));
        if (selectedPremises.length > 0) {
          targetingUpdates.premises = selectedPremises;
        } else if (lowerCaseMessage.includes('premise')) {
           targetingUpdates.premises = ['Specified']; // Indicate premises are specified but need more detail
        }

        // Basic city detection (needs a predefined list or more advanced NLP)
        const cityKeywords = ['delhi', 'mumbai', 'bangalore', 'kolkata', 'chennai']; // Example cities
        const selectedCities = cityKeywords.filter(keyword => lowerCaseMessage.includes(keyword));
         if (selectedCities.length > 0) {
          targetingUpdates.cities = selectedCities;
        } else if (lowerCaseMessage.includes('city')) {
           targetingUpdates.cities = ['Specified']; // Indicate cities are specified but need more detail
        }

        if (lowerCaseMessage.includes('general') || lowerCaseMessage.includes('broad') || Object.keys(targetingUpdates).length === 0) {
          setCampaignDetails(prev => ({
            ...prev,
            targeting: { gender: null, age: null, premises: [], cities: [] }
          }));
          botResponse = "Okay, using general targeting. Let me calculate your campaign metrics.";
          nextStep = 'calculating';
        } else {
           setCampaignDetails(prev => ({
            ...prev,
            targeting: {
              ...prev.targeting, // Keep existing targeting if not overridden
              ...targetingUpdates
            }
          }));
           // Ask for clarification if targeting is specified but not enough detail
           if (targetingUpdates.age === 'Specified' || targetingUpdates.premises?.includes('Specified') || targetingUpdates.cities?.includes('Specified')) {
              let clarification = "Understood on targeting preferences. Could you please provide more specific details on ";
              const needsClarification = [];
              if (targetingUpdates.age === 'Specified') needsClarification.push('age group');
              if (targetingUpdates.premises?.includes('Specified')) needsClarification.push('premise types');
              if (targetingUpdates.cities?.includes('Specified')) needsClarification.push('cities');
              botResponse = clarification + needsClarification.join(' and ') + "? Otherwise, I can proceed with current details.";
              nextStep = 'targeting'; // Stay on targeting step for refinement
           } else {
               botResponse = "Thanks for the targeting details. Let me calculate your campaign metrics.";
               nextStep = 'calculating';
           }
        }
        break;
      case 'calculating':
        const metrics = calculateCampaignMetrics();

        if (metrics) {
          const monthlyReach = metrics.estimatedReach * (30 / (campaignDetails.campaignDays || 30)); // Estimate monthly reach
          const planRecommendations = recommendPlans(monthlyReach);

          botResponse = `Based on your requirements:\n\n` +
            `- Budget: ₹${campaignDetails.budget?.toLocaleString()}\n` +
            `- Ad Type: ${campaignDetails.adType === 'banner' ? 'Banner Ad' : 'Video Ad'} (${campaignDetails.duration}s)\n` +
            `- Campaign Days: ${campaignDetails.campaignDays}\n` +
            `- Hits Per Person: ${campaignDetails.hitsPerPerson}\n` +
            `- Targeting: ${campaignDetails.targeting.gender ? 'Gender: ' + campaignDetails.targeting.gender + ', ' : ''}${campaignDetails.targeting.age ? 'Age: ' + campaignDetails.targeting.age + ', ' : ''}${campaignDetails.targeting.premises.length > 0 ? 'Premises: ' + campaignDetails.targeting.premises.join(', ') + ', ' : ''}${campaignDetails.targeting.cities.length > 0 ? 'Cities: ' + campaignDetails.targeting.cities.join(', ') : '' || 'General'}\n\n` +
            `Estimated Results:\n\n` +
            `- Estimated CPM: ₹${metrics.totalCpm}\n` +
            `- Estimated Total Impressions: ${metrics.estimatedImpressions.toLocaleString()}\n` +
            `- Estimated Total Reach: ${metrics.estimatedReach.toLocaleString()}\n` +
            `- Estimated Impressions/Day: ${metrics.impressionsPerDay.toLocaleString()}\n` +
            `- Estimated Reach/Day: ${metrics.reachPerDay.toLocaleString()}\n\n` +
             planRecommendations;

          nextStep = 'initial'; // Reset for a new query
          setCampaignDetails({ budget: null, adType: null, duration: null, campaignDays: null, hitsPerPerson: null, targeting: { gender: null, age: null, premises: [], cities: [] } }); // Reset campaign details
        } else {
          botResponse = "I seem to be missing some information to calculate. Could you please re-confirm your campaign details?";
          nextStep = 'initial'; // Reset and ask to start again
           setCampaignDetails({ budget: null, adType: null, duration: null, campaignDays: null, hitsPerPerson: null, targeting: { gender: null, age: null, premises: [], cities: [] } }); // Reset campaign details
        }
        break;
      default:
        botResponse = "I'm not sure how to respond to that. How can I help you with advertising on our platform?";
        nextStep = 'initial'; // Reset to initial state
        break;
    }

    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: "bot", content: botResponse }]);
      setInputStep(nextStep); // Move to the next step
    }, 1000);
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