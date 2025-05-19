import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendFormDataEmail } from "@/components/ui/form";

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    budget: "",
    message: "",
    phoneNumber: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Updated implementation to use the utility function
      await sendFormDataEmail({
        from_name: formData.name,
        name: formData.name,
        email: formData.email,
        business_name: formData.businessName,
        "Phone Number": formData.phoneNumber || "Not provided",
        budget: formData.budget,
        message: formData.message,
        industry: "Demo Request",
        subcategory: "Partner Inquiry",
        adType: "Demo Request",
        planType: "Demo Request",
        location: "Not specified",
        duration: "Demo",
        "campaign repeats": "N/A",
        impressions: "N/A",
        reach: "N/A",
        impressionsPerDay: "N/A",
        reachPerDay: "N/A",
      });

      toast({
        title: "Demo request submitted successfully!",
        description: "We'll contact you soon about your demo.",
      });
      
      setFormData({
        name: "",
        email: "",
        businessName: "",
        budget: "",
        message: "",
        phoneNumber: ""
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error submitting form",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/95"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Partner with <span className="text-dopanet-500">Dopanet</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ready to reach new customers? Book a free demo or contact us for more information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute -top-20 -left-20 h-40 w-40 bg-dopanet-100 dark:bg-dopanet-900/30 rounded-full mix-blend-multiply filter blur-2xl"></div>
              
              <ScrollArea className="h-[600px] md:h-auto">
                <div className="relative p-1">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Book a Free Demo (₹0)
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          placeholder="Your Business"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="+91 9876543210"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="budget">Approximate Budget (in ₹)</Label>
                      <Input
                        id="budget"
                        name="budget"
                        placeholder="5000"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your business and advertising goals..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-dopanet-500 to-teal-500 hover:from-dopanet-600 hover:to-teal-600 text-white"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Book Your Free Demo"}
                    </Button>
                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>
          
          <div className="space-y-8 reveal">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Why Partner With Dopanet?
            </h3>
            
            <div className="space-y-6">
              <div className="feature-card">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-dopanet-100 dark:bg-dopanet-900/30 p-3 rounded-full">
                    <svg className="h-6 w-6 text-dopanet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    Connect with Local Audiences
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Reach potential customers when they're near your business and most likely to visit. Our platform connects
                  you with users in your locality who are actively online.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-dopanet-100 dark:bg-dopanet-900/30 p-3 rounded-full">
                    <svg className="h-6 w-6 text-dopanet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    Cost-Effective Advertising
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Our platform offers higher engagement rates at a fraction of the cost of traditional advertising. 
                  Start with a budget as low as ₹500 and scale as you see results.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-dopanet-100 dark:bg-dopanet-900/30 p-3 rounded-full">
                    <svg className="h-6 w-6 text-dopanet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    Real-Time Analytics
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Track your campaign performance with our detailed analytics dashboard. 
                  Monitor impressions, clicks, and conversions in real-time to optimize your ROI.
                </p>
              </div>
            </div>
            
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  From Our Advertisers
                </h4>
              </div>
              
              <blockquote className="italic text-gray-600 dark:text-gray-300 mb-4">
                "Since advertising with Dopanet, we've seen a 32% increase in foot traffic to our café. 
                The targeting options allow us to reach customers when they're just a short walk away."
              </blockquote>
              
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Priya Sharma</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Café Sunshine, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
