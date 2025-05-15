
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

  const getPlans = (adType: string, tier: "basic" | "silver" | "gold" | "platinum") => {
    const isVideo = adType === "video";
    
    // Base prices and reach values based on the image provided
    let price = 0;
    let reachInMonth = 0;
    let reachPerDay = 0;
    let bonus = 0;
    
    if (isVideo) {
      // Video ads (10 seconds) - 100 ₹ CPM
      switch (tier) {
        case "basic":
          switch (price) {
            case 999:
              reachInMonth = 10000;
              reachPerDay = 333;
              break;
            case 1499:
              reachInMonth = 15000;
              reachPerDay = 500;
              break;
            case 1999:
              reachInMonth = 20000;
              reachPerDay = 667;
              break;
            case 2999:
              reachInMonth = 30000;
              reachPerDay = 1000;
              break;
            case 4999:
              reachInMonth = 50000;
              reachPerDay = 1667;
              break;
            case 9999:
              reachInMonth = 100000;
              reachPerDay = 3334;
              break;
            default:
              price = 1499;
              reachInMonth = 15000;
              reachPerDay = 500;
          }
          bonus = 0;
          break;
          
        case "silver":
          switch (price) {
            case 19999:
              reachInMonth = 220000;
              reachPerDay = 7500;
              break;
            case 29999:
              reachInMonth = 330000;
              reachPerDay = 11000;
              break;
            case 39999:
              reachInMonth = 440000;
              reachPerDay = 14667;
              break;
            case 49999:
              reachInMonth = 550000;
              reachPerDay = 18333;
              break;
            default:
              price = 19999;
              reachInMonth = 220000;
              reachPerDay = 7500;
          }
          bonus = 0.1; // 10% bonus
          break;
          
        case "gold":
          switch (price) {
            case 99999:
              reachInMonth = 1150000;
              reachPerDay = 38333;
              break;
            case 149999:
              reachInMonth = 1800000;
              reachPerDay = 76667;
              break;
            case 199999:
              reachInMonth = 2300000;
              reachPerDay = 135000;
              break;
            case 399999:
              reachInMonth = 4600000;
              reachPerDay = 153333;
              break;
            case 499999:
              reachInMonth = 5750000;
              reachPerDay = 191667;
              break;
            default:
              price = 99999;
              reachInMonth = 1150000;
              reachPerDay = 38333;
          }
          bonus = 0.15; // 15% bonus
          break;
          
        case "platinum":
          switch (price) {
            case 999999:
              reachInMonth = 12000000;
              reachPerDay = 400000;
              break;
            case 1499999:
              reachInMonth = 15000000;
              reachPerDay = 600000;
              break;
            case 1999999:
              reachInMonth = 24000000;
              reachPerDay = 800000;
              break;
            case 2499999:
              reachInMonth = 30000000;
              reachPerDay = 1000000;
              break;
            default:
              price = 999999;
              reachInMonth = 12000000;
              reachPerDay = 400000;
          }
          bonus = 0.2; // 20% bonus
          break;
      }
    } else {
      // Banner ads (5 seconds) - 50 ₹ CPM
      switch (tier) {
        case "basic":
          switch (price) {
            case 999:
              reachInMonth = 20000;
              reachPerDay = 667;
              break;
            case 1499:
              reachInMonth = 30000;
              reachPerDay = 1000;
              break;
            case 1999:
              reachInMonth = 40000;
              reachPerDay = 1335;
              break;
            case 2999:
              reachInMonth = 60000;
              reachPerDay = 2000;
              break;
            case 4999:
              reachInMonth = 100000;
              reachPerDay = 3335;
              break;
            case 9999:
              reachInMonth = 200000;
              reachPerDay = 6667;
              break;
            default:
              price = 1499;
              reachInMonth = 30000;
              reachPerDay = 1000;
          }
          bonus = 0;
          break;
          
        case "silver":
          switch (price) {
            case 19999:
              reachInMonth = 440000;
              reachPerDay = 15000;
              break;
            case 29999:
              reachInMonth = 660000;
              reachPerDay = 22000;
              break;
            case 39999:
              reachInMonth = 880000;
              reachPerDay = 29333;
              break;
            case 49999:
              reachInMonth = 1100000;
              reachPerDay = 36666;
              break;
            default:
              price = 19999;
              reachInMonth = 440000;
              reachPerDay = 15000;
          }
          bonus = 0.1; // 10% bonus
          break;
          
        case "gold":
          switch (price) {
            case 99999:
              reachInMonth = 2300000;
              reachPerDay = 76666;
              break;
            case 149999:
              reachInMonth = 3450000;
              reachPerDay = 115000;
              break;
            case 299999:
              reachInMonth = 6900000;
              reachPerDay = 230000;
              break;
            case 399999:
              reachInMonth = 9200000;
              reachPerDay = 306666;
              break;
            case 499999:
              reachInMonth = 11500000;
              reachPerDay = 383333;
              break;
            default:
              price = 99999;
              reachInMonth = 2300000;
              reachPerDay = 76666;
          }
          bonus = 0.15; // 15% bonus
          break;
          
        case "platinum":
          switch (price) {
            case 999999:
              reachInMonth = 23000000;
              reachPerDay = 800000;
              break;
            case 1499999:
              reachInMonth = 34500000;
              reachPerDay = 1200000;
              break;
            case 1999999:
              reachInMonth = 46000000;
              reachPerDay = 1600000;
              break;
            case 2499999:
              reachInMonth = 57500000;
              reachPerDay = 2000000;
              break;
            default:
              price = 999999;
              reachInMonth = 23000000;
              reachPerDay = 800000;
          }
          bonus = 0.2; // 20% bonus
          break;
      }
    }
    
    // Default prices if not matched in switch statements
    if (price === 0) {
      if (isVideo) {
        switch (tier) {
          case "basic":
            price = 1499;
            reachInMonth = 15000;
            reachPerDay = 500;
            break;
          case "silver":
            price = 19999;
            reachInMonth = 220000;
            reachPerDay = 7500;
            break;
          case "gold":
            price = 99999;
            reachInMonth = 1150000;
            reachPerDay = 38333;
            break;
          case "platinum":
            price = 999999;
            reachInMonth = 12000000;
            reachPerDay = 400000;
            break;
        }
      } else {
        switch (tier) {
          case "basic":
            price = 1499;
            reachInMonth = 30000;
            reachPerDay = 1000;
            break;
          case "silver":
            price = 19999;
            reachInMonth = 440000;
            reachPerDay = 15000;
            break;
          case "gold":
            price = 99999;
            reachInMonth = 2300000;
            reachPerDay = 76666;
            break;
          case "platinum":
            price = 999999;
            reachInMonth = 23000000;
            reachPerDay = 800000;
            break;
        }
      }
    }
    
    return { tier, price, reachInMonth, reachPerDay, bonus };
  };

  const handlePlanSelect = () => {
    if (selectedTier) {
      const planInfo = getPlans(currentAdType, selectedTier);
      
      // Create the plan object with the correct type
      const plan: Plan = {
        tier: selectedTier,
        label: selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1),
        price: planInfo.price,
        bonus: planInfo.bonus,
        reachInMonth: planInfo.reachInMonth,
        reachPerDay: planInfo.reachPerDay
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
                    ₹{getPlans(currentAdType, selectedTier).price}
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
