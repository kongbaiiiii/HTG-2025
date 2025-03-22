"use client"

import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

const FinancialSimulation = () => {
  // Add state for dialog
  const [dialogOpen, setDialogOpen] = useState(true);

  return (
    <div className="container mx-auto mt-4 mb-4 px-4">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to the Financial Fortune Simulator!</DialogTitle>
            <DialogDescription className="text-base">
              This is a simulation game where you can explore different financial strategies after high school. <br />
              Start the simulation by inputing some essential information about yourself.
            </DialogDescription>
            <button className="w-24 bg-green-200 text-black px-4 py-2 rounded-md hover:bg-green-300">Next</button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <h1 className="text-3xl font-mono text-center text-green-700 mb-4">
        Financial Fortune Simulator 💰
      </h1>
    </div>
  );
};

export default FinancialSimulation;
