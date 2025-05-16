
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

  const openPlanDialog = (tier: "basic" | "silver" | "gold" | "platinum") => {
    setSelectedTier(tier);
    setDialogOpen(true);
  };

  // Updated to match the exact values from the images
  const getPlans = (adType: string, tier: "basic" | "silver" | "gold" | "platinum") => {
    const isVideo = adType === "video";
    
    let price = 0;
    let reachInMonth = 0;
    let reachPerDay = 0;
    let bonus = 0;
    
    if (isVideo) {
      // Video ads (10 seconds) - 100 ₹ CPM
      switch (tier) {
        case "basic":
          price = 1999; // Default middle value
          reachInMonth = 20000;
          reachPerDay = 667;
          bonus = 0;
          break;
          
        case "silver":
          price = 29999; // Default middle value
          reachInMonth = 330000; // 300,000 + 30,000 (10% bonus)
          reachPerDay = 11000;
          bonus = 0.1; // 10% bonus
          break;
          
        case "gold":
          price = 299999; // Default middle value
          reachInMonth = 3450000; // 3,000,000 + 450,000 (15% bonus)
          reachPerDay = 115000;
          bonus = 0.15; // 15% bonus
          break;
          
        case "platinum":
          price = 1999999; // Default middle value
          reachInMonth = 24000000; // 20,000,000 + 4,000,000 (20% bonus)
          reachPerDay = 800000;
          bonus = 0.2; // 20% bonus
          break;
      }
    } else {
      // Banner ads (5 seconds) - 50 ₹ CPM
      switch (tier) {
        case "basic":
          price = 1999; // Default middle value
          reachInMonth = 40000;
          reachPerDay = 1335;
          bonus = 0;
          break;
          
        case "silver":
          price = 29999; // Default middle value
          reachInMonth = 660000; // 600,000 + 60,000 (10% bonus)
          reachPerDay = 22000;
          bonus = 0.1; // 10% bonus
          break;
          
        case "gold":
          price = 299999; // Default middle value
          reachInMonth = 6900000; // 6,000,000 + 900,000 (15% bonus)
          reachPerDay = 230000;
          bonus = 0.15; // 15% bonus
          break;
          
        case "platinum":
          price = 1999999; // Default middle value
          reachInMonth = 48000000; // 40,000,000 + 8,000,000 (20% bonus)
          reachPerDay = 1600000;
          bonus = 0.2; // 20% bonus
          break;
      }
    }
    
    return { tier, label: tier.charAt(0).toUpperCase() + tier.slice(1), price, reachInMonth, reachPerDay, bonus, adType };
  };

  const handlePlanSelect = () => {
    if (selectedTier) {
      const planInfo = getPlans(currentAdType, selectedTier);
      
      // Create the plan object with the correct type
      const plan: Plan = {
        tier: selectedTier,
        label: planInfo.label,
        price: planInfo.price,
        bonus: planInfo.bonus,
        reachInMonth: planInfo.reachInMonth,
        reachPerDay: planInfo.reachPerDay,
        adType: currentAdType
      };
      
      onPlanSelect(plan);
      setSelectedCategory(selectedTier);
      setDialogOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={() => openPlanDialog("basic")} 
          variant={selectedCategory === "basic" ? "default" : "outline"}
          className={selectedCategory === "basic" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
        >
          Basic Plans
        </Button>
        
        <Button 
          onClick={() => openPlanDialog("silver")} 
          variant={selectedCategory === "silver" ? "default" : "outline"}
          className={selectedCategory === "silver" ? "bg-gray-400 hover:bg-gray-500 text-white" : ""}
        >
          Silver Plans
          <Badge className="ml-2 bg-gray-500">+10%</Badge>
        </Button>
        
        <Button 
          onClick={() => openPlanDialog("gold")} 
          variant={selectedCategory === "gold" ? "default" : "outline"}
          className={selectedCategory === "gold" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
        >
          Gold Plans
          <Badge className="ml-2 bg-yellow-600">+15%</Badge>
        </Button>
        
        <Button 
          onClick={() => openPlanDialog("platinum")} 
          variant={selectedCategory === "platinum" ? "default" : "outline"}
          className={selectedCategory === "platinum" ? "bg-purple-500 hover:bg-purple-600 text-white" : ""}
        >
          Platinum Plans
          <Badge className="ml-2 bg-purple-600">+20%</Badge>
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold capitalize">
              {selectedTier} Plan Details
            </DialogTitle>
            <DialogDescription>
              {selectedTier === "basic" ? (
                "Our entry-level plan for businesses just starting with digital advertising"
              ) : selectedTier === "silver" ? (
                "Enhanced visibility with 10% bonus reach for growing businesses"
              ) : selectedTier === "gold" ? (
                "Premium plan with 15% bonus reach for established businesses"
              ) : (
                "Our top-tier plan with 20% bonus reach for maximum brand exposure"
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedTier && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Price</div>
                  <div className="text-xl font-bold">
                    ₹{getPlans(currentAdType, selectedTier).price.toLocaleString()}
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Ad Type</div>
                  <div className="text-xl font-bold capitalize">
                    {currentAdType} Ad
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Monthly Reach</div>
                <div className="text-xl font-bold">
                  {getPlans(currentAdType, selectedTier).reachInMonth.toLocaleString()}
                  {selectedTier !== "basic" && (
                    <span className="text-sm text-green-500 ml-2">
                      (includes {getPlans(currentAdType, selectedTier).bonus * 100}% bonus)
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Daily Reach</div>
                <div className="text-xl font-bold">
                  {getPlans(currentAdType, selectedTier).reachPerDay.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="text-sm font-medium">Key Benefits</div>
                <ul className="text-sm mt-2 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span>30-day campaign duration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span>Access to all targeting options</span>
                  </li>
                  {selectedTier !== "basic" && (
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>
                        {getPlans(currentAdType, selectedTier).bonus * 100}% bonus reach
                      </span>
                    </li>
                  )}
                  {selectedTier === "gold" || selectedTier === "platinum" ? (
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>Priority technical support</span>
                    </li>
                  ) : null}
                  {selectedTier === "platinum" && (
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>Ad design assistance</span>
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                <div className="text-sm font-medium text-green-700 dark:text-green-400">Special Offer</div>
                <p className="text-sm mt-1">
                  Book a 3-month campaign and get 1 month free!
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handlePlanSelect}
              className={
                selectedTier === "basic" ? "bg-blue-500 hover:bg-blue-600 text-white" : 
                selectedTier === "silver" ? "bg-gray-400 hover:bg-gray-500 text-white" :
                selectedTier === "gold" ? "bg-yellow-500 hover:bg-yellow-600 text-white" :
                "bg-purple-500 hover:bg-purple-600 text-white"
              }
            >
              Select Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlanSelectorButtons;
