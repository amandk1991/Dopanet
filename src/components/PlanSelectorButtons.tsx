
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plan } from "./PlanSelector";

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
  setSelectedCategory
}) => {
  const [plansVisible, setPlansVisible] = useState<string | null>(null);
  
  // Banner Plans (5 seconds)
  const bannerPlans = {
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
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 999999, reachInMonth: 24000000, reachPerDay: 800000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 1499999, reachInMonth: 36000000, reachPerDay: 1200000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 1999999, reachInMonth: 48000000, reachPerDay: 1600000 },
      { tier: "platinum", label: "Platinum", bonus: 0.20, price: 2499999, reachInMonth: 60000000, reachPerDay: 2000000 }
    ]
  };

  // Video Plans (10 seconds)
  const videoPlans = {
    basic: [
      { tier: "basic", label: "Basic", bonus: 0, price: 999, reachInMonth: 10000, reachPerDay: 333 },
      { tier: "basic", label: "Basic", bonus: 0, price: 1499, reachInMonth: 15000, reachPerDay: 500 },
      { tier: "basic", label: "Basic", bonus: 0, price: 1999, reachInMonth: 20000, reachPerDay: 667 },
      { tier: "basic", label: "Basic", bonus: 0, price: 2999, reachInMonth: 30000, reachPerDay: 1000 },
      { tier: "basic", label: "Basic", bonus: 0, price: 4999, reachInMonth: 50000, reachPerDay: 1666 },
      { tier: "basic", label: "Basic", bonus: 0, price: 9999, reachInMonth: 100000, reachPerDay: 3334 }
    ],
    silver: [
      { tier: "silver", label: "Silver", bonus: 0.10, price: 19999, reachInMonth: 220000, reachPerDay: 7330 },
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

  const getPlans = () => {
    if (currentAdType === "banner") {
      return bannerPlans;
    }
    return videoPlans;
  };

  const handlePlanTypeClick = (planType: string) => {
    if (plansVisible === planType) {
      setPlansVisible(null);
    } else {
      setPlansVisible(planType);
      setSelectedCategory(planType);
    }
  };

  const buttonClasses = "min-w-[120px] flex items-center justify-center gap-1";

  return (
    <div className="flex justify-center space-x-2">
      <DropdownMenu open={plansVisible === "basic"} onOpenChange={() => handlePlanTypeClick("basic")}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={selectedCategory === "basic" ? "default" : "outline"} 
            className={buttonClasses}
          >
            Basic Plans
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Basic Plans</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {getPlans().basic.map((plan, index) => (
            <DropdownMenuItem key={`basic-${index}`} onClick={() => onPlanSelect(plan)}>
              ₹{plan.price.toLocaleString()} - {plan.reachInMonth.toLocaleString()} Reach/Month
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu open={plansVisible === "silver"} onOpenChange={() => handlePlanTypeClick("silver")}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={selectedCategory === "silver" ? "default" : "outline"} 
            className={buttonClasses}
          >
            Silver Plans
            <Badge className="bg-gray-500 text-white">+10%</Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Silver Plans (+10% Bonus Reach)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {getPlans().silver.map((plan, index) => (
            <DropdownMenuItem key={`silver-${index}`} onClick={() => onPlanSelect(plan)}>
              ₹{plan.price.toLocaleString()} - {plan.reachInMonth.toLocaleString()} Reach/Month
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu open={plansVisible === "gold"} onOpenChange={() => handlePlanTypeClick("gold")}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={selectedCategory === "gold" ? "default" : "outline"} 
            className={buttonClasses}
          >
            Gold Plans
            <Badge className="bg-yellow-500 text-white">+15%</Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Gold Plans (+15% Bonus Reach)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {getPlans().gold.map((plan, index) => (
            <DropdownMenuItem key={`gold-${index}`} onClick={() => onPlanSelect(plan)}>
              ₹{plan.price.toLocaleString()} - {plan.reachInMonth.toLocaleString()} Reach/Month
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu open={plansVisible === "platinum"} onOpenChange={() => handlePlanTypeClick("platinum")}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={selectedCategory === "platinum" ? "default" : "outline"} 
            className={buttonClasses}
          >
            Platinum Plans
            <Badge className="bg-purple-500 text-white">+20%</Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Platinum Plans (+20% Bonus Reach)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {getPlans().platinum.map((plan, index) => (
            <DropdownMenuItem key={`platinum-${index}`} onClick={() => onPlanSelect(plan)}>
              ₹{plan.price.toLocaleString()} - {plan.reachInMonth.toLocaleString()} Reach/Month
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PlanSelectorButtons;
