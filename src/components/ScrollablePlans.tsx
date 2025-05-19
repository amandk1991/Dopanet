
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScrollablePlansProps {
  children: React.ReactNode;
  maxHeight?: string;
}

const ScrollablePlans: React.FC<ScrollablePlansProps> = ({ 
  children, 
  maxHeight = "500px" 
}) => {
  return (
    <ScrollArea className="w-full rounded-md" style={{ maxHeight }}>
      <div className="pr-4 py-2">
        {children}
      </div>
    </ScrollArea>
  );
};

export default ScrollablePlans;
