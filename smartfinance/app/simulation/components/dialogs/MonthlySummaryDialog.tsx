"use client"

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

interface MonthlySummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  monthlySummary: { [key: string]: number };
  savingsAccountBalance: number;
  month: string;
}

const MonthlySummaryDialog: React.FC<MonthlySummaryDialogProps> = ({
  open,
  onOpenChange,
  monthlySummary,
  month,
  savingsAccountBalance
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <Button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-300 hover:text-black" onClick={() => onOpenChange(true)}>View {month} Summary</Button>
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Summary</DialogTitle>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Earnings/Expenses</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(monthlySummary).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value?.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold text-black">Savings Account Balance</TableCell>
                <TableCell className="font-bold text-black">${savingsAccountBalance.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MonthlySummaryDialog; 