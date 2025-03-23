"use client"

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table"
import {
  PiggyBank,
  DollarSign,
  CreditCard
} from "lucide-react"

interface AssetsDebtsCardProps {
  assetsInfo: {
    cash: number;
    savingsAccount: number;
    creditCardDebt: number;
    otherDebt: number;
  };
}

const AssetsDebtsCard: React.FC<AssetsDebtsCardProps> = ({
  assetsInfo
}) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-amber-50">
        <CardTitle className="flex items-center gap-2 text-amber-700">
          <PiggyBank size={20} /> Assets & Debts
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center gap-2"><DollarSign size={16} /> Cash</TableCell>
              <TableCell className="text-right font-mono">${assetsInfo.cash.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><PiggyBank size={16} /> Savings Account</TableCell>
              <TableCell className="text-right font-mono">${assetsInfo.savingsAccount.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 text-red-500"><CreditCard size={16} /> Credit Card Debt</TableCell>
              <TableCell className="text-right font-mono text-red-500">-${assetsInfo.creditCardDebt.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 text-red-500"><CreditCard size={16} /> Other Debt</TableCell>
              <TableCell className="text-right font-mono text-red-500">-${assetsInfo.otherDebt.toLocaleString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AssetsDebtsCard; 