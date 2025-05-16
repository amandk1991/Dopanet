
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plan } from "./PlanSelector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PlanSelectorButtonsProps {
  onPlanSelect: (plan: Plan) => void;
  currentAdType: string;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const PlanSelectorButtons: React.FC<PlanSelectorButtonsProps> = ({
  onPlanSelect,
  currentAdType,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"basic" | "silver" | "gold" | "platinum" | null>(null);
  
  // Banner Plans (5 seconds) - All values match the image data exactly
  const bannerPlans = {
    basic: [
      { tier: "basic", label: "Basic", bonus: 0, price: 999, reachInMonth: 20000, reachPerDay: 660 },
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
      { tier: "gold", label: "Gold", bonus: 0.15, price: 399999, reachInMonth: 9000000, reachPerDay: 306666 },
      { tier: "gold", label: "Gold", bonus: 0.15, price: 499999, reachInMonth: 11500000, reachPerDay: 383333 }
    ],
    platinum: [
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 999999, reachInMonth: 24000000, reachPerDay: 800000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 1499999, reachInMonth: 36000000, reachPerDay: 1200000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 1999999, reachInMonth: 48000000, reachPerDay: 1600000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 2499999, reachInMonth: 60000000, reachPerDay: 2000000 }
    ]
  };

  // Video Plans (10 seconds) - All values match the image data exactly
  const videoPlans = {
    basic: [
      { tier: "basic", label: "Basic", bonus: 0, price: 999, reachInMonth: 10000, reachPerDay: 330 },
      { tier: "basic", label: "Basic", bonus: 0, price: 1499, reachInMonth: 15000, reachPerDay: 500 },
      { tier: "basic", label: "Basic", bonus: 0, price: 1999, reachInMonth: 20000, reachPerDay: 667 },
      { tier: "basic", label: "Basic", bonus: 0, price: 2999, reachInMonth: 30000, reachPerDay: 1000 },
      { tier: "basic", label: "Basic", bonus: 0, price: 4999, reachInMonth: 50000, reachPerDay: 1668 },
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

  const handlePlanSelection = (plan: Plan) => {
    // Ensure the plan has the ad type
    const updatedPlan = {
      ...plan,
      adType: currentAdType
    };
    
    onPlanSelect(updatedPlan);
    setSelectedCategory(plan.tier);
  };

  const renderPlanCards = (plans: any[], tier: string) => {
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

    return (
      <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto p-3">
        {plans.map((plan, index) => (
          <div 
            key={`${tier}-${index}-${plan.price}`}
            className={cn(
              "border rounded-lg p-3 cursor-pointer transition-all hover:scale-105",
              tierColors[tier as keyof typeof tierColors]
            )}
            onClick={() => handlePlanSelection(plan as Plan)}
          >
            <div className={cn("font-bold text-lg mb-1", tierTextColors[tier as keyof typeof tierTextColors])}>
              ₹{plan.price.toLocaleString()}
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Reach in a Month:</span>
                <span className="font-semibold">{plan.reachInMonth.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Reach Per Day:</span>
                <span className="font-semibold">{plan.reachPerDay.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Min Duration:</span>
                <span>{currentAdType === "banner" ? "5 seconds" : "10 seconds"}</span>
              </div>
              
              {tier !== "basic" && (
                <div className="mt-1 text-xs text-green-600 dark:text-green-400">
                  +{(plan.bonus * 100).toFixed(0)}% bonus reach included
                </div>
              )}
              
              <div className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                Book 3 months, get 1 month free!
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant={selectedCategory === "basic" ? "default" : "outline"}
              className={selectedCategory === "basic" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
            >
              Basic Plans
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" side="bottom" align="start">
            <div className="p-2 bg-blue-500 text-white font-medium">
              Basic Plans - {currentAdType === "banner" ? "Banner Ads (5s)" : "Video Ads (10s)"}
            </div>
            {renderPlanCards(
              currentAdType === "banner" ? bannerPlans.basic : videoPlans.basic, 
              "basic"
            )}
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant={selectedCategory === "silver" ? "default" : "outline"}
              className={selectedCategory === "silver" ? "bg-gray-400 hover:bg-gray-500 text-white" : ""}
            >
              Silver Plans
              <Badge className="ml-2 bg-gray-500">+10%</Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" side="bottom" align="start">
            <div className="p-2 bg-gray-500 text-white font-medium">
              Silver Plans (+10%) - {currentAdType === "banner" ? "Banner Ads (5s)" : "Video Ads (10s)"}
            </div>
            {renderPlanCards(
              currentAdType === "banner" ? bannerPlans.silver : videoPlans.silver, 
              "silver"
            )}
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant={selectedCategory === "gold" ? "default" : "outline"}
              className={selectedCategory === "gold" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
            >
              Gold Plans
              <Badge className="ml-2 bg-yellow-600">+15%</Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" side="bottom" align="start">
            <div className="p-2 bg-yellow-500 text-white font-medium">
              Gold Plans (+15%) - {currentAdType === "banner" ? "Banner Ads (5s)" : "Video Ads (10s)"}
            </div>
            {renderPlanCards(
              currentAdType === "banner" ? bannerPlans.gold : videoPlans.gold, 
              "gold"
            )}
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant={selectedCategory === "platinum" ? "default" : "outline"}
              className={selectedCategory === "platinum" ? "bg-purple-500 hover:bg-purple-600 text-white" : ""}
            >
              Platinum Plans
              <Badge className="ml-2 bg-purple-600">+20%</Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" side="bottom" align="start">
            <div className="p-2 bg-purple-500 text-white font-medium">
              Platinum Plans (+20%) - {currentAdType === "banner" ? "Banner Ads (5s)" : "Video Ads (10s)"}
            </div>
            {renderPlanCards(
              currentAdType === "banner" ? bannerPlans.platinum : videoPlans.platinum, 
              "platinum"
            )}
          </PopoverContent>
        </Popover>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold capitalize">
              {selectedTier} Plan Details
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlanSelectorButtons;
