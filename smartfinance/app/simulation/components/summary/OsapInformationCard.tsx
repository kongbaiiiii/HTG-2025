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
  Wallet,
  Gift,
  CreditCard
} from "lucide-react"

interface OsapInformationCardProps {
  osapInfo: {
    osapGrant: number;
    osapLoan: number;
    totalOsapAid: number;
    osapLoanRemaining: number;
  };
}

const OsapInformationCard: React.FC<OsapInformationCardProps> = ({
  osapInfo
}) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-purple-50">
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Wallet size={20} /> OSAP Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center gap-2"><Gift size={16} /> OSAP Grant</TableCell>
              <TableCell className="text-right font-mono">${osapInfo.osapGrant.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><CreditCard size={16} /> OSAP Loan</TableCell>
              <TableCell className="text-right font-mono">${osapInfo.osapLoan.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow className="bg-purple-50">
              <TableCell className="font-bold">Total OSAP Aid</TableCell>
              <TableCell className="text-right font-bold font-mono">${osapInfo.totalOsapAid.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><CreditCard size={16} /> OSAP Loan Remaining</TableCell>
              <TableCell className="text-right font-mono">${osapInfo.osapLoanRemaining.toLocaleString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OsapInformationCard; 