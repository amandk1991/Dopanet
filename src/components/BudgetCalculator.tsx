
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PlanSelector, { Plan } from "./PlanSelector";

interface BudgetCalculatorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ isOpen, setIsOpen }) => {
  const { toast } = useToast();
  const [planSelectorOpen, setPlanSelectorOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    adType: "banner", // "banner" or "video"
    duration: 5, // seconds
    industry: "",
    subCategory: "",
    state: "",
    cities: [] as string[],
    gender: "all", // "all", "male", "female", "others"
    ageGroup: "all", // "all", "custom"
    premises: [] as string[], // "hostel", "college", "cafe", "mall"
    budget: 5000, // in INR
    hitsPerPerson: 3,
    days: 30, // campaign duration in days (default to 30 for plans)
    hitsPerPersonPerDay: 1
  });

  // New plan-related state
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isCustomPlan, setIsCustomPlan] = useState(true);
  
  // Calculated values
  const [calculatedValues, setCalculatedValues] = useState({
    cpm: 0, // Cost Per Mille (1000 impressions)
    baseReach: 0,
    bonusReach: 0,
    totalImpressions: 0,
    totalReach: 0,
    impressionsPerDay: 0,
    reachPerDay: 0
  });
  
  // Data for form options
  const industries = [
    "Retail", "Food & Beverage", "Education", "Technology", 
    "Healthcare", "Real Estate", "Entertainment", "Financial Services"
  ];
  
  const subCategories: Record<string, string[]> = {
    "Retail": ["Clothing", "Electronics", "Home Goods", "Beauty"],
    "Food & Beverage": ["Restaurants", "Cafés", "Food Delivery", "Bakeries"],
    "Education": ["Colleges", "Training Centers", "Online Courses", "Coaching"],
    "Technology": ["Software", "Hardware", "Services", "Mobile Apps"],
    "Healthcare": ["Hospitals", "Clinics", "Pharmacies", "Wellness"],
    "Real Estate": ["Residential", "Commercial", "Agents", "Rentals"],
    "Entertainment": ["Movies", "Music", "Events", "Gaming"],
    "Financial Services": ["Banking", "Insurance", "Investments", "Loans"]
  };
  
  const states = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "West Bengal"];
  
  const cities: Record<string, string[]> = {
    "Delhi": ["New Delhi", "Noida", "Gurgaon", "Faridabad"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"]
  };
  
  const premises = [
    { id: "hostel", label: "Hostels" },
    { id: "college", label: "Colleges" },
    { id: "cafe", label: "Cafés" },
    { id: "mall", label: "Malls" },
    { id: "restaurant", label: "Restaurants" }
  ];

  // Calculate CPM based on selections
  const calculateCPM = () => {
    // If a plan is selected, use fixed CPM based on ad type
    if (selectedPlan && !isCustomPlan) {
      return formData.adType === "banner" ? 50 : 100;
    }
    
    let baseCPM = formData.duration * 10;
    
    // Extra cost for each city
    const cityIncrement = formData.adType === "banner" ? 15 : 30;
    const citiesAdded = formData.cities.length > 0 ? formData.cities.length - 1 : 0;
    baseCPM += citiesAdded * cityIncrement;
    
    // Gender targeting (excluding "All")
    if (formData.gender !== "all") {
      baseCPM += formData.adType === "banner" ? 15 : 30;
    }
    
    // Age targeting (excluding "All")
    if (formData.ageGroup !== "all") {
      baseCPM += formData.adType === "banner" ? 15 : 30;
    }
    
    // Premises targeting
    baseCPM += formData.premises.length * (formData.adType === "banner" ? 15 : 30);
    
    return baseCPM;
  };

  // Calculate impressions and reach
  const calculateImpressions = (cpm: number) => {
    const impressions = formData.budget * (100 / formData.duration) * (100 / cpm);
    return Math.round(impressions);
  };
  
  const calculateReach = (impressions: number) => {
    const baseReach = Math.round(impressions / formData.hitsPerPerson);
    
    // Apply plan bonus if applicable
    if (selectedPlan && !isCustomPlan) {
      const bonusReach = Math.round(baseReach * selectedPlan.bonus);
      return baseReach + bonusReach;
    }
    
    return baseReach;
  };
  
  const calculateBaseReach = (impressions: number) => {
    return Math.round(impressions / formData.hitsPerPerson);
  };
  
  const calculateBonusReach = (baseReach: number) => {
    if (selectedPlan && !isCustomPlan) {
      return Math.round(baseReach * selectedPlan.bonus);
    }
    return 0;
  };
  
  const calculateImpressionsPerDay = (totalImpressions: number) => {
    return Math.round(totalImpressions / formData.days);
  };
  
  const calculateReachPerDay = (totalReach: number) => {
    return Math.round(totalReach / formData.days);
  };

  // Handle plan selection
  const handlePlanSelection = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsCustomPlan(false);
    
    // Update form data based on plan
    setFormData(prev => ({
      ...prev,
      adType: plan.tier === "basic" || plan.tier === "silver" || plan.tier === "gold" || plan.tier === "platinum" 
        ? (plan.reachInMonth > 200000 ? "banner" : "video") 
        : prev.adType,
      duration: plan.reachInMonth > 200000 ? 5 : 10, // 5 for banner, 10 for video
      budget: plan.price,
      days: 30 // Plans are 30-day packages
    }));
    
    setPlanSelectorOpen(false);
    
    toast({
      title: `${plan.label} Plan Selected`,
      description: `${plan.tier !== "basic" ? `You've received a ${plan.bonus * 100}% reach bonus!` : 'Plan applied successfully'}`,
    });
  };

  // Update calculated values when form data changes
  useEffect(() => {
    // Ensure minimum duration based on ad type
    const minDuration = formData.adType === "banner" ? 5 : 10;
    const validDuration = Math.max(formData.duration, minDuration);
    
    if (validDuration !== formData.duration) {
      setFormData(prev => ({ ...prev, duration: validDuration }));
      return;
    }
    
    // Check if user manually changed the budget after selecting a plan
    if (selectedPlan && !isCustomPlan && formData.budget !== selectedPlan.price) {
      setIsCustomPlan(true);
      toast({
        title: "Switched to Custom Plan",
        description: "You've modified the budget, now using a custom plan.",
      });
    }
    
    const cpm = calculateCPM();
    const impressions = calculateImpressions(cpm);
    const baseReach = calculateBaseReach(impressions);
    const bonusReach = calculateBonusReach(baseReach);
    const totalReach = baseReach + bonusReach;
    const impressionsPerDay = calculateImpressionsPerDay(impressions);
    const reachPerDay = calculateReachPerDay(totalReach);
    
    setCalculatedValues({
      cpm,
      baseReach,
      bonusReach,
      totalImpressions: impressions,
      totalReach,
      impressionsPerDay,
      reachPerDay
    });
  }, [formData, selectedPlan, isCustomPlan]);
  
  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCityToggle = (city: string) => {
    setFormData(prev => {
      if (prev.cities.includes(city)) {
        return { ...prev, cities: prev.cities.filter(c => c !== city) };
      } else {
        return { ...prev, cities: [...prev.cities, city] };
      }
    });
  };
  
  const handlePremiseToggle = (premise: string) => {
    setFormData(prev => {
      if (prev.premises.includes(premise)) {
        return { ...prev, premises: prev.premises.filter(p => p !== premise) };
      } else {
        return { ...prev, premises: [...prev.premises, premise] };
      }
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Campaign plan saved",
      description: `Your ${formData.adType} ad campaign has been saved. Estimated reach: ${calculatedValues.totalReach.toLocaleString()} users.`,
    });
    setIsOpen(false);
  };

  // Generate plan badge style based on selected plan
  const getPlanBadgeStyle = () => {
    if (!selectedPlan || isCustomPlan) {
      return "bg-gray-500 hover:bg-gray-600";
    }
    
    switch (selectedPlan.tier) {
      case "basic":
        return "bg-blue-500 hover:bg-blue-600";
      case "silver":
        return "bg-gray-500 hover:bg-gray-600";
      case "gold":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "platinum":
        return "bg-purple-500 hover:bg-purple-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-bold">Budget Calculator</DialogTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={() => setPlanSelectorOpen(true)}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Calculator size={18} />
                      <span>Browse Plans</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Explore Ad Packages with Bonus Reach</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <DialogDescription className="text-center">
              Plan your campaign and see estimated results in real-time
            </DialogDescription>
          </DialogHeader>
          
          {/* Global metrics bar - visible across all tabs */}
          <div className="bg-gray-50 dark:bg-gray-800 p-3 my-2 rounded-lg grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
            <div className="p-2 bg-white dark:bg-gray-900 rounded-md shadow-sm">
              <div className="font-semibold text-dopanet-600 dark:text-dopanet-400">CPM</div>
              <div className="text-lg font-bold">₹{calculatedValues.cpm}</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-900 rounded-md shadow-sm">
              <div className="font-semibold text-dopanet-600 dark:text-dopanet-400">Total Impressions</div>
              <div className="text-lg font-bold">{calculatedValues.totalImpressions.toLocaleString()}</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-900 rounded-md shadow-sm">
              <div className="font-semibold text-dopanet-600 dark:text-dopanet-400">Total Reach</div>
              <div className="text-lg font-bold">{calculatedValues.totalReach.toLocaleString()}</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-900 rounded-md shadow-sm">
              <div className="font-semibold text-dopanet-600 dark:text-dopanet-400">Impressions/Day</div>
              <div className="text-lg font-bold">{calculatedValues.impressionsPerDay.toLocaleString()}</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-900 rounded-md shadow-sm">
              <div className="font-semibold text-dopanet-600 dark:text-dopanet-400">Reach/Day</div>
              <div className="text-lg font-bold">{calculatedValues.reachPerDay.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row h-full overflow-hidden">
            {/* Main Content - Scrollable Tabs */}
            <div className="flex-grow overflow-y-auto pr-0 md:pr-4">
              <Tabs defaultValue="adType" className="w-full">
                <TabsList className="grid grid-cols-6 mb-4">
                  <TabsTrigger value="adType">Ad Type</TabsTrigger>
                  <TabsTrigger value="duration">Duration</TabsTrigger>
                  <TabsTrigger value="industry">Industry</TabsTrigger>
                  <TabsTrigger value="geography">Location</TabsTrigger>
                  <TabsTrigger value="targeting">Targeting</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>
                
                {/* Ad Type Section */}
                <TabsContent value="adType" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Ad Type</h3>
                    <RadioGroup 
                      value={formData.adType} 
                      onValueChange={(value) => handleInputChange("adType", value)}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="border rounded-lg p-4 relative">
                        <RadioGroupItem 
                          value="banner" 
                          id="banner" 
                          className="absolute top-4 right-4"
                        />
                        <Label htmlFor="banner" className="flex flex-col h-full cursor-pointer">
                          <span className="text-xl font-semibold mb-2">Banner Ad</span>
                          <span className="text-gray-500 dark:text-gray-400">
                            Static image displayed on a portion of the screen
                          </span>
                          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <div className="h-16 bg-dopanet-100 dark:bg-dopanet-800 flex items-center justify-center rounded">
                              <span className="text-sm">Banner Example</span>
                            </div>
                          </div>
                          <span className="mt-2 text-sm text-dopanet-500">
                            Minimum duration: 5 seconds
                          </span>
                        </Label>
                      </div>
                      
                      <div className="border rounded-lg p-4 relative">
                        <RadioGroupItem 
                          value="video" 
                          id="video" 
                          className="absolute top-4 right-4"
                        />
                        <Label htmlFor="video" className="flex flex-col h-full cursor-pointer">
                          <span className="text-xl font-semibold mb-2">Video Ad</span>
                          <span className="text-gray-500 dark:text-gray-400">
                            Short video ad with higher engagement potential
                          </span>
                          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <div className="h-16 bg-dopanet-100 dark:bg-dopanet-800 flex items-center justify-center rounded">
                              <span className="text-sm">▶️ Video Example</span>
                            </div>
                          </div>
                          <span className="mt-2 text-sm text-dopanet-500">
                            Minimum duration: 10 seconds
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>
                
                {/* Duration Section */}
                <TabsContent value="duration" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Set Ad Duration</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formData.adType === "banner" 
                        ? "Minimum duration for banner ads is 5 seconds" 
                        : "Minimum duration for video ads is 10 seconds"
                      }
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label htmlFor="duration">Duration (seconds)</Label>
                          <span className="text-sm font-medium">{formData.duration}s</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Slider 
                            id="duration"
                            min={formData.adType === "banner" ? 5 : 10} 
                            max={30} 
                            step={1}
                            value={[formData.duration]}
                            onValueChange={(values) => handleInputChange("duration", values[0])}
                            className="flex-grow"
                          />
                          <Input
                            type="number"
                            value={formData.duration}
                            onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 0)}
                            min={formData.adType === "banner" ? 5 : 10}
                            max={30}
                            className="w-20"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Impact of Duration</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <p>Longer duration increases visibility</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                            <p>Shorter duration allows more impressions</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 bg-dopanet-500 rounded-full"></div>
                            <p>CPM increases with duration</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Industry Section */}
                <TabsContent value="industry" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Your Industry</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <select
                          id="industry"
                          className="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                          value={formData.industry}
                          onChange={(e) => {
                            handleInputChange("industry", e.target.value);
                            handleInputChange("subCategory", "");
                          }}
                        >
                          <option value="">Select Industry</option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry}>
                              {industry}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {formData.industry && (
                        <div className="space-y-2">
                          <Label htmlFor="subCategory">Sub-Category</Label>
                          <select
                            id="subCategory"
                            className="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                            value={formData.subCategory}
                            onChange={(e) => handleInputChange("subCategory", e.target.value)}
                          >
                            <option value="">Select Sub-Category</option>
                            {subCategories[formData.industry]?.map((subCategory) => (
                              <option key={subCategory} value={subCategory}>
                                {subCategory}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-6">
                        <h4 className="font-medium mb-2">Industry Insights</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {!formData.industry ? (
                            <p>Select an industry to see recommended targeting strategies.</p>
                          ) : (
                            <div className="space-y-2">
                              <p><span className="font-medium">Peak Hours:</span> {
                                formData.industry === "Food & Beverage" ? "11 AM - 2 PM, 6 PM - 9 PM" :
                                formData.industry === "Retail" ? "12 PM - 8 PM" :
                                "9 AM - 6 PM"
                              }</p>
                              <p><span className="font-medium">Recommended Premises:</span> {
                                formData.industry === "Food & Beverage" ? "Cafés, Restaurants, Malls" :
                                formData.industry === "Education" ? "Colleges, Hostels" :
                                formData.industry === "Technology" ? "Cafés, Colleges" :
                                "Malls, Public Areas"
                              }</p>
                              <p><span className="font-medium">Avg. Engagement:</span> {
                                formData.industry === "Entertainment" ? "7.2%" :
                                formData.industry === "Food & Beverage" ? "6.8%" :
                                formData.industry === "Technology" ? "5.7%" :
                                "5.2%"
                              }</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Geography Section */}
                <TabsContent value="geography" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Target Location</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <select
                          id="state"
                          className="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                          value={formData.state}
                          onChange={(e) => {
                            handleInputChange("state", e.target.value);
                            handleInputChange("cities", []);
                          }}
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {formData.state && (
                        <div className="space-y-2">
                          <Label>Cities (select one or more)</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {cities[formData.state]?.map((city) => (
                              <div key={city} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`city-${city}`}
                                  checked={formData.cities.includes(city)}
                                  onCheckedChange={() => handleCityToggle(city)}
                                />
                                <Label htmlFor={`city-${city}`} className="cursor-pointer">{city}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
                        <h4 className="font-medium mb-2">Geographic Reach</h4>
                        
                        {formData.state && formData.cities.length > 0 ? (
                          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                            <p>
                              <span className="font-medium">WiFi Hotspots:</span> {
                                formData.state === "Delhi" ? "580+" :
                                formData.state === "Maharashtra" ? "720+" :
                                formData.state === "Karnataka" ? "450+" :
                                formData.state === "Tamil Nadu" ? "390+" :
                                formData.state === "West Bengal" ? "320+" :
                                "250+"
                              }
                            </p>
                            <p>
                              <span className="font-medium">Daily Active Users:</span> {
                                formData.state === "Delhi" ? "82,000+" :
                                formData.state === "Maharashtra" ? "95,000+" :
                                formData.state === "Karnataka" ? "73,000+" :
                                formData.state === "Tamil Nadu" ? "65,000+" :
                                formData.state === "West Bengal" ? "58,000+" :
                                "45,000+"
                              }
                            </p>
                            <p className="text-dopanet-500 font-medium">
                              Each additional city increases CPM by ₹{formData.adType === "banner" ? "15" : "30"}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Select state and cities to see coverage information.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Targeting Section */}
                <TabsContent value="targeting" className="space-y-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Audience Targeting</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-md font-medium mb-2">Gender</h4>
                        <RadioGroup
                          value={formData.gender}
                          onValueChange={(value) => handleInputChange("gender", value)}
                          className="grid grid-cols-2 md:grid-cols-4 gap-2"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-2">
                            <RadioGroupItem value="all" id="gender-all" />
                            <Label htmlFor="gender-all">All</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-lg p-2">
                            <RadioGroupItem value="male" id="gender-male" />
                            <Label htmlFor="gender-male">Male</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-lg p-2">
                            <RadioGroupItem value="female" id="gender-female" />
                            <Label htmlFor="gender-female">Female</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-lg p-2">
                            <RadioGroupItem value="other" id="gender-other" />
                            <Label htmlFor="gender-other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <h4 className="text-md font-medium mb-2">Age Group</h4>
                        <RadioGroup
                          value={formData.ageGroup}
                          onValueChange={(value) => handleInputChange("ageGroup", value)}
                          className="grid grid-cols-2 gap-2"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-2">
                            <RadioGroupItem value="all" id="age-all" />
                            <Label htmlFor="age-all">All Ages</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-lg p-2">
                            <RadioGroupItem value="custom" id="age-custom" />
                            <Label htmlFor="age-custom">Custom Range</Label>
                          </div>
                        </RadioGroup>
                        
                        {formData.ageGroup === "custom" && (
                          <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="age-min" className="text-sm">Minimum Age</Label>
                                <Input id="age-min" type="number" min={13} max={80} defaultValue={18} />
                              </div>
                              <div>
                                <Label htmlFor="age-max" className="text-sm">Maximum Age</Label>
                                <Input id="age-max" type="number" min={13} max={80} defaultValue={35} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-md font-medium mb-2">Premise Types</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          Select where your ads should appear (multiple selection allowed)
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {premises.map((premise) => (
                            <div
                              key={premise.id}
                              className={`
                                border rounded-lg p-3 cursor-pointer transition-all
                                ${formData.premises.includes(premise.id) 
                                  ? "bg-dopanet-50 dark:bg-dopanet-900/20 border-dopanet-200 dark:border-dopanet-800" 
                                  : "hover:bg-gray-50 dark:hover:bg-gray-800"}
                              `}
                              onClick={() => handlePremiseToggle(premise.id)}
                            >
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`premise-${premise.id}`}
                                  checked={formData.premises.includes(premise.id)}
                                  onCheckedChange={() => handlePremiseToggle(premise.id)}
                                />
                                <Label htmlFor={`premise-${premise.id}`} className="cursor-pointer">
                                  {premise.label}
                                </Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 text-dopanet-500">Targeting Impact on CPM</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <p>Each targeting option increases your CPM but improves ad relevance:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Gender targeting: +₹{formData.adType === "banner" ? "15" : "30"} CPM</li>
                            <li>Age targeting: +₹{formData.adType === "banner" ? "15" : "30"} CPM</li>
                            <li>Each premise type: +₹{formData.adType === "banner" ? "15" : "30"} CPM</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Summary Section */}
                <TabsContent value="summary" className="space-y-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Campaign Summary</h3>
                    
                    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Campaign Configuration</h4>
                        {(selectedPlan || isCustomPlan) && (
                          <Badge className={`${getPlanBadgeStyle()} text-white px-3 py-1`}>
                            {isCustomPlan 
                              ? "Custom Plan" 
                              : `${selectedPlan?.label} Plan ${selectedPlan?.tier !== "basic" ? `(+${selectedPlan?.bonus * 100}%)` : ""}`}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Ad Type</p>
                            <p className="font-medium">{formData.adType === "banner" ? "Banner Ad" : "Video Ad"}</p>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                            <p className="font-medium">{formData.duration} seconds</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Industry & Category</p>
                          <p className="font-medium">
                            {formData.industry ? `${formData.industry}${formData.subCategory ? ` › ${formData.subCategory}` : ""}` : "Not specified"}
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                          <p className="font-medium">
                            {formData.state ? `${formData.state} › ${formData.cities.length > 0 ? formData.cities.join(", ") : "All cities"}` : "Not specified"}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                            <p className="font-medium capitalize">{formData.gender}</p>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
                            <p className="font-medium">
                              {formData.ageGroup === "all" ? "All ages" : "Custom range"}
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Premises</p>
                            <p className="font-medium">
                              {formData.premises.length > 0 
                                ? `${formData.premises.length} selected` 
                                : "All premises"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Budget & Duration</p>
                          <p className="font-medium">
                            ₹{formData.budget.toLocaleString()} over {formData.days} days (₹{Math.round(formData.budget/formData.days).toLocaleString()}/day)
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-dopanet-50 dark:bg-dopanet-900/20 border border-dopanet-100 dark:border-dopanet-800/30 rounded-lg p-4">
                      <h4 className="font-medium mb-4 text-center text-dopanet-700 dark:text-dopanet-300">
                        Campaign Projections
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Estimated Impressions</p>
                          <p className="text-2xl font-bold text-dopanet-600 dark:text-dopanet-400">
                            {calculatedValues.totalImpressions.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Reach</p>
                            {selectedPlan && !isCustomPlan && selectedPlan.tier !== "basic" && (
                              <Badge className={getPlanBadgeStyle() + " text-white text-xs px-2"}>
                                +{selectedPlan.bonus * 100}%
                              </Badge>
                            )}
                          </div>
                          <p className="text-2xl font-bold text-dopanet-600 dark:text-dopanet-400">
                            {calculatedValues.totalReach.toLocaleString()}
                          </p>
                          {selectedPlan && !isCustomPlan && selectedPlan.tier !== "basic" && (
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>Base: {calculatedValues.baseReach.toLocaleString()}</span>
                              <span>Bonus: +{calculatedValues.bonusReach.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Daily Impressions</p>
                          <p className="text-xl font-bold text-dopanet-600 dark:text-dopanet-400">
                            {calculatedValues.impressionsPerDay.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Daily Reach</p>
                          <p className="text-xl font-bold text-dopanet-600 dark:text-dopanet-400">
                            {calculatedValues.reachPerDay.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium">Cost Per 1000 Impressions (CPM)</p>
                          <p className="font-bold text-dopanet-600 dark:text-dopanet-400">
                            ₹{calculatedValues.cpm.toFixed(2)}
                          </p>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-dopanet-500 to-teal-500 h-1.5 rounded-full" 
                            style={{ width: `${Math.min(100, (calculatedValues.cpm / 200) * 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {calculatedValues.cpm < 100 
                            ? "Excellent value for your budget" 
                            : calculatedValues.cpm < 150 
                            ? "Good balance of targeting and value" 
                            : "Premium targeting increases CPM"}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sticky panel with results */}
            <div className="w-full md:w-64 flex-shrink-0 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 mt-4 md:mt-0 pt-4 md:pt-0 md:pl-4">
              <div className="sticky top-0">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  {(selectedPlan || isCustomPlan) && (
                    <div className="mb-4">
                      <Badge className={`${getPlanBadgeStyle()} text-white w-full justify-center py-1`}>
                        {isCustomPlan 
                          ? "Custom Plan" 
                          : `${selectedPlan?.label} Plan ${selectedPlan?.tier !== "basic" ? `(+${selectedPlan?.bonus * 100}%)` : ""}`}
                      </Badge>
                    </div>
                  )}
                  
                  <h4 className="font-semibold mb-4 text-center">Campaign Stats</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="budget" className="text-sm">Budget (₹)</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", parseInt(e.target.value) || 0)}
                        min={500}
                        className="mb-2"
                      />
                      <Slider
                        id="budget-slider"
                        min={500}
                        max={50000}
                        step={500}
                        value={[formData.budget]}
                        onValueChange={(values) => handleInputChange("budget", values[0])}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="days" className="text-sm">Campaign Days</Label>
                      <Input
                        id="days"
                        type="number"
                        value={formData.days}
                        onChange={(e) => handleInputChange("days", parseInt(e.target.value) || 1)}
                        min={1}
                        max={90}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="hits-per-person" className="text-sm">Hits Per Person</Label>
                      <Input
                        id="hits-per-person"
                        type="number"
                        value={formData.hitsPerPerson}
                        onChange={(e) => handleInputChange("hitsPerPerson", parseInt(e.target.value) || 1)}
                        min={1}
                        max={20}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="hits-per-person-day" className="text-sm">Hits Per Person Per Day</Label>
                      <Input
                        id="hits-per-person-day"
                        type="number"
                        value={formData.hitsPerPersonPerDay}
                        onChange={(e) => handleInputChange("hitsPerPersonPerDay", parseInt(e.target.value) || 1)}
                        min={1}
                        max={10}
                      />
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPM:</span>
                        <span className="font-semibold">₹{calculatedValues.cpm}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Impressions:</span>
                        <span className="font-semibold">{calculatedValues.totalImpressions.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex justify-between text-sm">
                          <span>Total Reach:</span>
                          <span className="font-semibold">{calculatedValues.totalReach.toLocaleString()}</span>
                        </div>
                        
                        {selectedPlan && !isCustomPlan && selectedPlan.tier !== "basic" && (
                          <div className="flex justify-between text-xs text-gray-500 pl-4">
                            <span>Base Reach:</span>
                            <span>{calculatedValues.baseReach.toLocaleString()}</span>
                          </div>
                        )}
                        
                        {selectedPlan && !isCustomPlan && selectedPlan.tier !== "basic" && (
                          <div className="flex justify-between text-xs text-green-500 dark:text-green-400 pl-4 font-medium">
                            <span>Bonus Reach:</span>
                            <span>+{calculatedValues.bonusReach.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between text-sm mb-1">
                        <span>Daily Impressions:</span>
                        <span className="font-semibold">{calculatedValues.impressionsPerDay.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Daily Reach:</span>
                        <span className="font-semibold">{calculatedValues.reachPerDay.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSave}
              className="bg-dopanet-500 hover:bg-dopanet-600 text-white"
            >
              Save Campaign Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Plan selector modal */}
      <PlanSelector 
        isOpen={planSelectorOpen} 
        setIsOpen={setPlanSelectorOpen}
        onSelectPlan={handlePlanSelection}
        currentAdType={formData.adType}
      />
    </>
  );
};

export default BudgetCalculator;

