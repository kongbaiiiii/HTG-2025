import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
type RandomEvent = {
  id: number;
  title: string;
  description: string;
  financialImpact: number; // Positive for income, negative for expenses
  impactType: "cash" | "savings" | "income" | "expense"; // Where the impact applies
  probability: number; // Between 0 and 1
  // Optional fields for more complex events
  duration?: number; // For recurring effects (in months)
  choices?: {
    text: string;
    impact: number;
    impactType: "cash" | "savings" | "income" | "expense";
  }[];
};

type RandomEventProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: RandomEvent;
};

const RandomEventDialog = ({ open, onOpenChange, event }: RandomEventProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{event.title}</DialogTitle>
          <DialogDescription className="text-base mt-2">
            {event.description}
          </DialogDescription>
        </DialogHeader>

        <div className="my-4">
          <p className={`text-lg font-semibold ${event.financialImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Financial Impact: ${Math.abs(event.financialImpact)} {event.financialImpact >= 0 ? 'gained' : 'lost'}
          </p>
        </div>

        <DialogFooter>
          <Button
            className="bg-blue-200 text-black px-4 py-2 rounded-md hover:bg-blue-300"
            onClick={() => onOpenChange(false)}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RandomEventDialog; 