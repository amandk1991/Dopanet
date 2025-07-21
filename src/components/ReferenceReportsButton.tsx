import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileTextIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ReferenceReportsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRedirect = (url: string) => {
    window.open(url, '_blank');
    setIsOpen(false); // Close modal after redirect
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 left-4 z-50 bg-green-500 hover:bg-green-600 text-white" variant="default">
 <FileTextIcon className="mr-2 h-4 w-4" /> Reference Reports
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm rounded-lg">
        <DialogHeader>
          <DialogTitle>Reference Reports</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 p-4">
          <Button onClick={() => handleRedirect('https://crimson-kassandra-89.tiiny.site/')}>
            CustomerWise Lead Reports
          </Button>
          <Button onClick={() => handleRedirect('https://sapphire-zarah-64.tiiny.site/')}>
            RouterWise Lead Reports
          </Button>
          <Button onClick={() => handleRedirect('https://silver-fifine-95.tiiny.site/')}>
            DateWise Lead Reports
          </Button>
          <Button onClick={() => handleRedirect('https://tomato-kass-46.tiiny.site/')}>
            Vendor Reports
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferenceReportsButton;