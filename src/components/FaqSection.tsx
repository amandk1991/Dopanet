import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_KEY = "AIzaSyC-fscJDsXpdVpPMKClJQn_BMg4wGpT4hA"; // Replace with your actual API key
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

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
    },
  });

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const newUserMessage = { role: "user" as const, content: chatMessage };
    setChatHistory(prev => [...prev, newUserMessage]);
    setChatMessage(""); // Clear the input field immediately

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': API_KEY,
        },
        body: JSON.stringify({
          contents: chatHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model', // Gemini API expects 'user' or 'model'
            parts: [{ text: msg.content }],
          })).concat([{ role: 'user', parts: [{ text: chatMessage }] }]), // Add the new user message
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response from the AI.";

      setChatHistory(prev => [...prev, { role: "bot" as const, content: botResponse }]);
      // Further logic to handle bot response and update inputStep/campaignDetails

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI assistant.",
        variant: "destructive",
      });
      setChatHistory(prev => [...prev, { role: "bot" as const, content: "Sorry, there was an error processing your request." }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/loose">Frequently Asked Questions</h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about advertising on Dopanet.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-10 py-12 lg:grid-cols-2">
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What types of businesses can advertise on Dopanet?</AccordionTrigger>
                <AccordionContent>
                  Dopanet is suitable for a wide range of businesses, from local shops and restaurants to larger enterprises looking to reach a targeted local audience through our WiFi platform.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does the targeting work?</AccordionTrigger>
                <AccordionContent>
                  Our platform allows for precise targeting based on location, demographics, and interests, ensuring your ads are seen by the most relevant audience connected to our WiFi.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What is the cost of advertising?</AccordionTrigger>
                <AccordionContent>
                  Advertising costs vary depending on your campaign's reach, duration, and targeting options. We offer flexible plans to fit different budgets. Our AI assistant can help you estimate costs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What kind of ad formats are supported?</AccordionTrigger>
                <AccordionContent>
                  We support various ad formats, including banner ads and video ads, designed to be non-intrusive and effective within the WiFi login experience.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex flex-col space-y-1.5 pb-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">AI Advertising Assistant</h3>
                <p className="text-sm text-muted-foreground">Chat with our AI to get help with your advertising campaign.</p>
              </div>
              <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg p-3 max-w-[70%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground text-muted'}`}>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center pt-4">
                <Input
                  placeholder="Type your message..."
                  className="flex-1 mr-2"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                 <Button type="submit" onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" /> Send
                </Button>
              </div>
               {/* Input steps based on AI interaction */}
               {inputStep === 'budget' && (
                <div className="pt-4">
                  <Input type="number" placeholder="Enter your budget" />
                </div>
               )}
                {inputStep === 'adType' && (
                 <div className="pt-4">
                   <Select>
                     <SelectTrigger>
                       <SelectValue placeholder="Select ad type" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="banner">Banner</SelectItem>
                       <SelectItem value="video">Video</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;