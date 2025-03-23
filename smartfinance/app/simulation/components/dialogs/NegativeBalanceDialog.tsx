"use client"

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  CreditCard,
  Briefcase,
  Home,
  PiggyBank
} from "lucide-react"

interface NegativeBalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balance: number;
  onMakeChanges: () => void;
}

const NegativeBalanceDialog: React.FC<NegativeBalanceDialogProps> = ({
  open,
  onOpenChange,
  balance,
  onMakeChanges
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-2">
            <CreditCard /> Negative Balance Alert
          </DialogTitle>
          <DialogDescription className="pt-2 text-base">
            Your savings account has a negative balance of <span className="font-bold text-red-600">${Math.abs(balance).toLocaleString()}</span>.
            <p className="mt-2">You need to make some lifestyle changes to continue your education:</p>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="bg-amber-50 p-3 rounded-md">
            <h3 className="font-medium text-amber-800 mb-2">Suggested Actions:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Briefcase className="h-4 w-4 mt-0.5 text-amber-800" />
                <span>Increase your income by getting a part-time job or working more hours</span>
              </li>
              <li className="flex items-start gap-2">
                <Home className="h-4 w-4 mt-0.5 text-amber-800" />
                <span>Reduce your living expenses (housing, food, transportation)</span>
              </li>
              <li className="flex items-start gap-2">
                <PiggyBank className="h-4 w-4 mt-0.5 text-amber-800" />
                <span>Withdraw from your RESP if you have funds available</span>
              </li>
              <li className="flex items-start gap-2">
                <CreditCard className="h-4 w-4 mt-0.5 text-amber-800" />
                <span>Take on a debt as a last resort (this will impact your future finances)</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
            className="w-full sm:w-auto"
          >
            I'll figure it out later
          </Button>

          <Button
            className="bg-green-200 text-black hover:bg-green-300 w-full sm:w-auto"
            onClick={() => {
              onOpenChange(false);
              onMakeChanges();
            }}
          >
            Make Lifestyle Changes Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NegativeBalanceDialog; 