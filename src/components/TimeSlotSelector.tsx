
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimeSlotSelectorProps {
  selectedTimeSlots: string[];
  onTimeSlotToggle: (timeSlot: string) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ selectedTimeSlots, onTimeSlotToggle }) => {
  // Define the time slots for a 24-hour day in 2-hour increments
  const timeSlots = [
    { id: "00-02", label: "12 AM - 2 AM", category: "night" },
    { id: "02-04", label: "2 AM - 4 AM", category: "night" },
    { id: "04-06", label: "4 AM - 6 AM", category: "early-morning" },
    { id: "06-08", label: "6 AM - 8 AM", category: "morning" },
    { id: "08-10", label: "8 AM - 10 AM", category: "morning" },
    { id: "10-12", label: "10 AM - 12 PM", category: "day" },
    { id: "12-14", label: "12 PM - 2 PM", category: "day" },
    { id: "14-16", label: "2 PM - 4 PM", category: "day" },
    { id: "16-18", label: "4 PM - 6 PM", category: "evening" },
    { id: "18-20", label: "6 PM - 8 PM", category: "evening" },
    { id: "20-22", label: "8 PM - 10 PM", category: "night" },
    { id: "22-24", label: "10 PM - 12 AM", category: "night" }
  ];

  // Group time slots into categories
  const timeSlotCategories = {
    "early-morning": { name: "Early Morning", slots: timeSlots.filter(slot => slot.category === "early-morning") },
    "morning": { name: "Morning", slots: timeSlots.filter(slot => slot.category === "morning") },
    "day": { name: "Daytime", slots: timeSlots.filter(slot => slot.category === "day") },
    "evening": { name: "Evening", slots: timeSlots.filter(slot => slot.category === "evening") },
    "night": { name: "Night", slots: timeSlots.filter(slot => slot.category === "night") }
  };

  // Helper to check if all slots in a category are selected
  const isAllCategorySelected = (category: string) => {
    const categorySlots = timeSlotCategories[category as keyof typeof timeSlotCategories].slots;
    return categorySlots.every(slot => selectedTimeSlots.includes(slot.label));
  };

  // Helper to get the count of selected slots in a category
  const getSelectedCountInCategory = (category: string) => {
    const categorySlots = timeSlotCategories[category as keyof typeof timeSlotCategories].slots;
    return categorySlots.filter(slot => selectedTimeSlots.includes(slot.label)).length;
  };

  // Toggle all time slots in a category
  const toggleCategory = (category: string) => {
    const categorySlots = timeSlotCategories[category as keyof typeof timeSlotCategories].slots;
    const allSelected = isAllCategorySelected(category);
    
    categorySlots.forEach(slot => {
      if (allSelected) {
        if (selectedTimeSlots.includes(slot.label)) {
          onTimeSlotToggle(slot.label);
        }
      } else {
        if (!selectedTimeSlots.includes(slot.label)) {
          onTimeSlotToggle(slot.label);
        }
      }
    });
  };

  // Map of category to color
  const categoryColors: Record<string, { bg: string, text: string }> = {
    "early-morning": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-300" },
    "morning": { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600 dark:text-green-300" },
    "day": { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-600 dark:text-yellow-300" },
    "evening": { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600 dark:text-orange-300" },
    "night": { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-300" }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Select time slots to target your audience at specific hours of the day
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(timeSlotCategories).map(category => (
          <div 
            key={category}
            className={`border rounded-lg p-4 ${categoryColors[category]?.bg || ""}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className={`h-4 w-4 ${categoryColors[category]?.text || ""}`} />
                <h4 className={`font-medium ${categoryColors[category]?.text || ""}`}>
                  {timeSlotCategories[category as keyof typeof timeSlotCategories].name}
                </h4>
              </div>
              
              <Badge 
                variant="outline" 
                className={`${categoryColors[category]?.text || ""} border-current`}
                onClick={() => toggleCategory(category)}
              >
                {isAllCategorySelected(category) ? "Deselect All" : "Select All"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {timeSlotCategories[category as keyof typeof timeSlotCategories].slots.map(slot => (
                <div key={slot.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/50 dark:hover:bg-black/5">
                  <Checkbox
                    id={`time-slot-${slot.id}`}
                    checked={selectedTimeSlots.includes(slot.label)}
                    onCheckedChange={() => onTimeSlotToggle(slot.label)}
                  />
                  <Label htmlFor={`time-slot-${slot.id}`} className="cursor-pointer text-sm flex-grow">
                    {slot.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="font-medium mb-3">Time Slot Selection Summary</h4>
        {selectedTimeSlots.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No specific time slots selected. Your ad will be shown throughout the day.
          </p>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedTimeSlots.map(slot => (
                <Badge key={slot} variant="secondary" className="text-xs">
                  {slot}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Your ad will be shown only during these {selectedTimeSlots.length} selected time periods.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
