import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import PlanSelector from "./PlanSelector";
import PlanSelectorButtons from "./PlanSelectorButtons";
import TimeSlotSelector from "./TimeSlotSelector";
import { sendFormDataEmail } from "@/components/ui/form";

interface BudgetCalculatorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ isOpen, setIsOpen }) => {
  const { toast } = useToast();
  const [budget, setBudget] = useState<number>(999);
  const [hitsPerPerson, setHitsPerPerson] = useState<number>(3);
  const [campaignDays, setCampaignDays] = useState<number>(7);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [currentAdType, setCurrentAdType] = useState<string>("banner");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [reportsDialogOpen, setReportsDialogOpen] = useState(false);

  // Calculate GST
  const calculateGSTAmount = (amount: number) => {
    return amount * 0.18;
  };

  const calculateTotalWithGST = (amount: number) => {
    return amount + calculateGSTAmount(amount);
  };

  const handleTimeSlotToggle = (timeSlot: string) => {
    setSelectedTimeSlots(prev =>
      prev.includes(timeSlot)
        ? prev.filter(slot => slot !== timeSlot)
        : [...prev, timeSlot]
    );
  };

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setSelectedCategory(plan.tier);
    setBudget(plan.price);
  };

  const handleSubmit = async () => {
    try {
      const gstAmount = calculateGSTAmount(budget);
      const totalAmount = calculateTotalWithGST(budget);

      const emailTemplate = `
Campaign Summary:
----------------
Budget: ₹${budget.toLocaleString()}
GST (18%): ₹${gstAmount.toLocaleString()}
Total Amount: ₹${totalAmount.toLocaleString()}
Ad Type: ${currentAdType}
Plan Tier: ${selectedCategory || 'Custom'}
Campaign Duration: ${campaignDays} days
Hits Per Person: ${hitsPerPerson}
Selected Time Slots: ${selectedTimeSlots.length ? selectedTimeSlots.join(', ') : 'All day'}
Daily Reach: ${Math.floor(budget / (campaignDays * hitsPerPerson)).toLocaleString()}
Total Reach: ${Math.floor(budget / hitsPerPerson).toLocaleString()}
      `;

      await sendFormDataEmail({
        from_name: "Campaign Calculator",
        message: emailTemplate,
        email: "amanavodaya@gmail.com",
        subject: "New Campaign Details",
      });

      toast({
        title: "Campaign details sent successfully!",
        description: "We'll review your campaign and get back to you soon.",
      });
    } catch (error) {
      console.error("Error sending campaign details:", error);
      toast({
        title: "Error sending campaign details",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
    const value = parseInt(e.target.value) || 0;
    setter(value);
  };

  const handleWheel = (e: WheelEvent, setter: React.Dispatch<React.SetStateAction<number>>, min: number, max: number) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY) * -1;
    setter(prev => {
      const newValue = prev + delta;
      return Math.min(Math.max(newValue, min), max);
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Campaign Budget Calculator
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[calc(90vh-100px)]">
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label>Select Ad Type</Label>
                    <div className="flex space-x-4 mt-2">
                      <Button
                        variant={currentAdType === "banner" ? "default" : "outline"}
                        onClick={() => setCurrentAdType("banner")}
                      >
                        Banner Ads (5s)
                      </Button>
                      <Button
                        variant={currentAdType === "video" ? "default" : "outline"}
                        onClick={() => setCurrentAdType("video")}
                      >
                        Video Ads (10s)
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Select Plan</Label>
                    <PlanSelectorButtons
                      onPlanSelect={handlePlanSelect}
                      currentAdType={currentAdType}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="budget">Budget (₹)</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={budget}
                        onChange={(e) => handleInputChange(e, setBudget)}
                        onWheel={(e) => handleWheel(e as unknown as WheelEvent, setBudget, 999, 9999999)}
                        min={999}
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        GST (18%): ₹{calculateGSTAmount(budget).toLocaleString()}
                        <br />
                        Total Amount: ₹{calculateTotalWithGST(budget).toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="hitsPerPerson">Hits Per Person</Label>
                      <Input
                        id="hitsPerPerson"
                        type="number"
                        value={hitsPerPerson}
                        onChange={(e) => handleInputChange(e, setHitsPerPerson)}
                        onWheel={(e) => handleWheel(e as unknown as WheelEvent, setHitsPerPerson, 1, 10)}
                        min={1}
                        max={10}
                      />
                    </div>

                    <div>
                      <Label htmlFor="campaignDays">Campaign Days</Label>
                      <Input
                        id="campaignDays"
                        type="number"
                        value={campaignDays}
                        onChange={(e) => handleInputChange(e, setCampaignDays)}
                        onWheel={(e) => handleWheel(e as unknown as WheelEvent, setCampaignDays, 1, 30)}
                        min={1}
                        max={30}
                      />
                    </div>
                  </div>

                  <TimeSlotSelector
                    selectedTimeSlots={selectedTimeSlots}
                    onTimeSlotToggle={handleTimeSlotToggle}
                  />
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Campaign Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Budget:</span>
                        <span>₹{budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>GST (18%):</span>
                        <span>₹{calculateGSTAmount(budget).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total Amount:</span>
                        <span>₹{calculateTotalWithGST(budget).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ad Type:</span>
                        <span>{currentAdType === "banner" ? "Banner (5s)" : "Video (10s)"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Plan Tier:</span>
                        <span>{selectedCategory || 'Custom'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Campaign Duration:</span>
                        <span>{campaignDays} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hits Per Person:</span>
                        <span>{hitsPerPerson}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Slots:</span>
                        <span>{selectedTimeSlots.length ? selectedTimeSlots.length : 'All day'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Reach:</span>
                        <span>{Math.floor(budget / (campaignDays * hitsPerPerson)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Reach:</span>
                        <span>{Math.floor(budget / hitsPerPerson).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-dopanet-500 hover:bg-dopanet-600 text-white"
                    onClick={handleSubmit}
                  >
                    Submit Campaign Details
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Reference Reports Button */}
          <div className="absolute bottom-4 left-4">
            <Button
              variant="outline"
              onClick={() => setReportsDialogOpen(true)}
            >
              Reference Reports
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reports Dialog */}
      <Dialog open={reportsDialogOpen} onOpenChange={setReportsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reference Reports</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <Button onClick={() => window.open('https://crimson-kassandra-89.tiiny.site/', '_blank')}>
              Customerwise Lead Report
            </Button>
            <Button onClick={() => window.open('https://silver-fifine-95.tiiny.site/', '_blank')}>
              Datewise Lead Report
            </Button>
            <Button onClick={() => window.open('https://sapphire-zarah-64.tiiny.site/', '_blank')}>
              Routerwise Lead Report
            </Button>
            <Button onClick={() => window.open('https://tomato-kass-46.tiiny.site/', '_blank')}>
              Vendors Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BudgetCalculator;