
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

export interface Plan {
  tier: "basic" | "silver" | "gold" | "platinum";
  label: string;
  bonus: number;
  price: number;
  reachInMonth: number;
  reachPerDay: number;
  adType?: string;
}

interface BannerPlans {
  basic: Plan[];
  silver: Plan[];
  gold: Plan[];
  platinum: Plan[];
}

interface VideoPlans {
  basic: Plan[];
  silver: Plan[];
  gold: Plan[];
  platinum: Plan[];
}

interface PlanSelectorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSelectPlan: (plan: Plan) => void;
  currentAdType: string;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ isOpen, setIsOpen, onSelectPlan, currentAdType }) => {
  const [selectedTab, setSelectedTab] = useState<"banner" | "video">(currentAdType === "video" ? "video" : "banner");
  
  // Banner Plans (5 seconds) as shown in the image
  const bannerPlans: BannerPlans = {
    basic: [
      { tier: "basic", label: "Basic", bonus: 0, price: 999, reachInMonth: 20000, reachPerDay: 667 },
      { tier: "basic", label: "Basic", bonus: 0, price: 1499, reachInMonth: 30000, reachPerDay: 1000 },
      { tier: "basic", label: "Basic", bonus: 0, price: 1999, reachInMonth: 40000, reachPerDay: 1335 },
      { tier: "basic", label: "Basic", bonus: 0, price: 2999, reachInMonth: 60000, reachPerDay: 2000 },
      { tier: "basic", label: "Basic", bonus: 0, price: 4999, reachInMonth: 100000, reachPerDay: 3335 },
      { tier: "basic", label: "Basic", bonus: 0, price: 9999, reachInMonth: 200000, reachPerDay: 6667 }
    ],
    silver: [
      { tier: "silver", label: "Silver", bonus: 0.10, price: 19999, reachInMonth: 440000, reachPerDay: 15000 },
      { tier: "silver", label: "Silver", bonus: 0.10, price: 29999, reachInMonth: 660000, reachPerDay: 22000 },
      { tier: "silver", label: "Silver", bonus: 0.10, price: 39999, reachInMonth: 880000, reachPerDay: 29333 },
      { tier: "silver", label: "Silver", bonus: 0.10, price: 49999, reachInMonth: 1100000, reachPerDay: 36666 }
    ],
    gold: [
      { tier: "gold", label: "Gold", bonus: 0.15, price: 99999, reachInMonth: 2300000, reachPerDay: 76666 },
      { tier: "gold", label: "Gold", bonus: 0.15, price: 199999, reachInMonth: 4600000, reachPerDay: 153333 },
      { tier: "gold", label: "Gold", bonus: 0.15, price: 299999, reachInMonth: 6900000, reachPerDay: 230000 },
      { tier: "gold", label: "Gold", bonus: 0.15, price: 399999, reachInMonth: 9200000, reachPerDay: 306666 },
      { tier: "gold", label: "Gold", bonus: 0.15, price: 499999, reachInMonth: 11500000, reachPerDay: 383333 }
    ],
    platinum: [
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 999999, reachInMonth: 23000000, reachPerDay: 800000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 1499999, reachInMonth: 34500000, reachPerDay: 1200000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 1999999, reachInMonth: 46000000, reachPerDay: 1600000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 2499999, reachInMonth: 57500000, reachPerDay: 2000000 }
    ]
  };

  // Video Plans (10 seconds) as shown in the image
  const videoPlans: VideoPlans = {
    basic: [
      { tier: "basic", label: "Basic", bonus: 0, price: 999, reachInMonth: 10000, reachPerDay: 333 },
      { tier: "basic", label: "Basic", bonus: 0, price: 1499, reachInMonth: 15000, reachPerDay: 500 },
      { tier: "basic", label: "Basic", bonus: 0, price: 1999, reachInMonth: 20000, reachPerDay: 667 },
      { tier: "basic", label: "Basic", bonus: 0, price: 2999, reachInMonth: 30000, reachPerDay: 1000 },
      { tier: "basic", label: "Basic", bonus: 0, price: 4999, reachInMonth: 50000, reachPerDay: 1666 },
      { tier: "basic", label: "Basic", bonus: 0, price: 9999, reachInMonth: 100000, reachPerDay: 3334 }
    ],
    silver: [
      { tier: "silver", label: "Silver", bonus: 0.10, price: 19999, reachInMonth: 220000, reachPerDay: 7500 },
      { tier: "silver", label: "Silver", bonus: 0.10, price: 29999, reachInMonth: 330000, reachPerDay: 11000 },
      { tier: "silver", label: "Silver", bonus: 0.10, price: 39999, reachInMonth: 440000, reachPerDay: 14667 },
      { tier: "silver", label: "Silver", bonus: 0.10, price: 49999, reachInMonth: 550000, reachPerDay: 18333 }
    ],
    gold: [
      { tier: "gold", label: "Gold", bonus: 0.15, price: 99999, reachInMonth: 1150000, reachPerDay: 38333 },
      { tier: "gold", label: "Gold", bonus: 0.15, price: 199999, reachInMonth: 2300000, reachPerDay: 76667 },
      { tier: "gold", label: "Gold", bonus: 0.15, price: 299999, reachInMonth: 3450000, reachPerDay: 115000 },
      { tier: "gold", label: "Gold", bonus: 0.15, price: 399999, reachInMonth: 4600000, reachPerDay: 153333 },
      { tier: "gold", label: "Gold", bonus: 0.15, price: 499999, reachInMonth: 5750000, reachPerDay: 191667 }
    ],
    platinum: [
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 999999, reachInMonth: 12000000, reachPerDay: 400000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 1499999, reachInMonth: 18000000, reachPerDay: 600000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 1999999, reachInMonth: 24000000, reachPerDay: 800000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 2499999, reachInMonth: 30000000, reachPerDay: 1000000 }
    ]
  };

  const renderPlans = (plans: Plan[], tier: string) => {
    const tierColors: Record<string, string> = {
      basic: "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
      silver: "bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700",
      gold: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/50",
      platinum: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/50"
    };
    
    const tierTextColors: Record<string, string> = {
      basic: "text-blue-700 dark:text-blue-300",
      silver: "text-gray-700 dark:text-gray-300",
      gold: "text-yellow-700 dark:text-yellow-500",
      platinum: "text-purple-700 dark:text-purple-400"
    };

    const tierBadgeColors: Record<string, string> = {
      basic: "bg-blue-500 hover:bg-blue-600",
      silver: "bg-gray-500 hover:bg-gray-600",
      gold: "bg-yellow-500 hover:bg-yellow-600",
      platinum: "bg-purple-500 hover:bg-purple-600"
    };

    return (
      <div className="mt-4 space-y-4">
        <div className="flex items-center">
          <Badge className={`${tierBadgeColors[tier]} text-white px-4 py-1`}>
            {tier.toUpperCase()} {tier !== "basic" && `(+${plans[0].bonus * 100}% Reach)`}
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {plans.map((plan, index) => (
            <div 
              key={`${tier}-${index}`}
              className={cn(
                "border rounded-lg p-4 cursor-pointer transition-all hover:scale-105",
                tierColors[tier]
              )}
              onClick={() => handlePlanSelection(plan)}
            >
              <div className={cn("font-bold text-xl mb-2", tierTextColors[tier])}>
                ₹{plan.price.toLocaleString()}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Reach in a Month:</span>
                  <span className="font-semibold">{plan.reachInMonth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Reach Per Day:</span>
                  <span className="font-semibold">{plan.reachPerDay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Min Duration:</span>
                  <span>{selectedTab === "banner" ? "5 seconds" : "10 seconds"}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Ad Type:</span>
                  <span className="capitalize">{selectedTab}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value as "banner" | "video");
  };

  const handlePlanSelection = (plan: Plan) => {
    // Create a modified plan that includes the correct ad type
    const modifiedPlan = {
      ...plan,
      adType: selectedTab // Ensure the plan knows which ad type it belongs to
    };
    
    toast({
      title: "Plan Selected",
      description: `You selected the ${plan.tier} plan for ₹${plan.price.toLocaleString()}`,
      variant: "default"
    });
    
    onSelectPlan(modifiedPlan as Plan);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Choose Your Ad Plan</DialogTitle>
          <DialogDescription className="text-center">
            Select a pre-configured plan with bonus reach for optimal results
          </DialogDescription>
        </DialogHeader>

        <Tabs 
          defaultValue={selectedTab} 
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="banner">Banner Ads (Min 5s)</TabsTrigger>
            <TabsTrigger value="video">Video Ads (Min 10s)</TabsTrigger>
          </TabsList>

          <TabsContent value="banner" className="space-y-6">
            <div className="text-center text-lg font-medium mb-2">
              Banner Ad Plans - Starting at ₹50 CPM
            </div>
            {renderPlans(bannerPlans.basic, "basic")}
            {renderPlans(bannerPlans.silver, "silver")}
            {renderPlans(bannerPlans.gold, "gold")}
            {renderPlans(bannerPlans.platinum, "platinum")}
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <div className="text-center text-lg font-medium mb-2">
              Video Ad Plans - Starting at ₹100 CPM
            </div>
            {renderPlans(videoPlans.basic, "basic")}
            {renderPlans(videoPlans.silver, "silver")}
            {renderPlans(videoPlans.gold, "gold")}
            {renderPlans(videoPlans.platinum, "platinum")}
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="outline" className="text-gray-500">
            Need a custom plan? Contact us
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanSelector;
