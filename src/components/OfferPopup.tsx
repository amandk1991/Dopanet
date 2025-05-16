
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OfferPopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const OfferPopup: React.FC<OfferPopupProps> = ({ isOpen, setIsOpen }) => {
  const offers = [
    {
      months: 3,
      freeMonths: 1,
      discount: "25%",
      color: "bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      badge: "bg-blue-500 text-white",
      textColor: "text-blue-700 dark:text-blue-400"
    },
    {
      months: 6,
      freeMonths: 3,
      discount: "33%",
      color: "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800",
      badge: "bg-yellow-500 text-white",
      textColor: "text-yellow-700 dark:text-yellow-400"
    },
    {
      months: 12,
      freeMonths: 12,
      discount: "50%",
      color: "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800",
      badge: "bg-green-500 text-white",
      textColor: "text-green-700 dark:text-green-400"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Special Campaign Offers</DialogTitle>
          <DialogDescription className="text-center">
            Get more value by extending your campaign duration
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.map((offer, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 ${offer.color} transition-transform hover:scale-105`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className={`text-lg font-semibold ${offer.textColor}`}>
                    {offer.months} Month Plan
                  </h4>
                  <Badge className={offer.badge}>
                    {offer.discount} OFF
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="text-center py-4 bg-white/70 dark:bg-black/10 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">You Pay For</div>
                    <div className="text-3xl font-bold">{offer.months} Months</div>
                  </div>
                  
                  <div className="text-center py-4 bg-white/70 dark:bg-black/10 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">You Get</div>
                    <div className="text-3xl font-bold">{offer.months + offer.freeMonths} Months</div>
                    <div className={`text-sm font-semibold mt-1 ${offer.textColor}`}>
                      {offer.freeMonths} months FREE!
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                    <p>No additional cost!</p>
                    <p>Same daily budget</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-6">
            <h4 className="font-medium mb-2">How It Works</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-500 w-5 h-5 flex items-center justify-center text-white text-xs mt-0.5">1</div>
                <div>Select your preferred plan from Basic, Silver, Gold, or Platinum</div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-500 w-5 h-5 flex items-center justify-center text-white text-xs mt-0.5">2</div>
                <div>Choose your campaign duration (3, 6, or 12 months) in the Budget Calculator</div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-500 w-5 h-5 flex items-center justify-center text-white text-xs mt-0.5">3</div>
                <div>Get bonus months automatically added to your campaign at no extra cost</div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-500 w-5 h-5 flex items-center justify-center text-white text-xs mt-0.5">4</div>
                <div>Enjoy consistent ad performance for an extended period</div>
              </li>
            </ul>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OfferPopup;
