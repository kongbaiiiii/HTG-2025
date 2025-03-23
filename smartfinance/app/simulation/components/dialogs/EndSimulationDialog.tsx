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

type EndSimulationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simulationMonth: number;
  netWorthChange: number;
  initialNetWorth: number;
  onContinue: () => void;
  onEnd: () => void;
};

const EndSimulationDialog = ({
  open,
  onOpenChange,
  simulationMonth,
  netWorthChange,
  initialNetWorth,
  onContinue,
  onEnd
}: EndSimulationDialogProps) => {
  // Calculate percentage change, avoiding division by zero
  const percentageChange = initialNetWorth !== 0
    ? Math.abs((netWorthChange / initialNetWorth * 100)).toFixed(1)
    : "N/A";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {simulationMonth < 12 ? "Simulation Ending Early" : "Congratulations!"}
          </DialogTitle>
          <div className="text-base mt-4">
            {simulationMonth < 12 ? (
              <>
                <p>You've only simulated for {simulationMonth} {simulationMonth === 1 ? 'month' : 'months'}.</p>
                <p className="mt-2">To compete with other users and see how your financial decisions compare,
                  try simulating for at least 12 months!</p>
                <p className="mt-2">Are you sure you want to end the simulation now?</p>
              </>
            ) : (
              <>
                <p>You've successfully completed {simulationMonth} months of financial simulation!</p>
                <p className="mt-2">Your net worth change: <span className={netWorthChange >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  ${netWorthChange.toFixed(2)}
                </span></p>
                <p className="mt-4">Your financial decisions have led you to {netWorthChange >= 0 ? "increase" : "decrease"} your net worth
                  by {percentageChange}% from your starting position.</p>
                <p className="mt-4">Thanks for playing Financial Fortune Simulator!</p>
              </>
            )}
          </div>
        </DialogHeader>
        <DialogFooter className="flex justify-between mt-6">
          {simulationMonth < 12 && (
            <Button
              className="bg-green-200 text-black px-4 py-2 rounded-md hover:bg-green-300"
              onClick={onContinue}
            >
              Continue Simulation
            </Button>
          )}
          <Button
            className="bg-blue-200 text-black px-4 py-2 rounded-md hover:bg-blue-300"
            onClick={onEnd}
          >
            {simulationMonth < 12 ? "End Anyway" : "Finish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EndSimulationDialog; 