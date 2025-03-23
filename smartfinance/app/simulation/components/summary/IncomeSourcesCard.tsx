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
  DollarSign,
  Briefcase,
  Award,
  Gift,
  PiggyBank,
  Users,
  Plus
} from "lucide-react"

interface IncomeSourcesCardProps {
  incomeInfo: {
    partTimeJob: number;
    scholarships: number;
    bursaries: number;
    RESP: number;
    parentalSupport: number;
    otherIncome: number;
  };
}

const IncomeSourcesCard: React.FC<IncomeSourcesCardProps> = ({
  incomeInfo
}) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-green-50">
        <CardTitle className="flex items-center gap-2 text-green-700">
          <DollarSign size={20} /> Income Sources
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center gap-2"><Briefcase size={16} /> Part-time Job</TableCell>
              <TableCell className="text-right font-mono">${incomeInfo.partTimeJob.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><Award size={16} /> Scholarships</TableCell>
              <TableCell className="text-right font-mono">${incomeInfo.scholarships.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><Gift size={16} /> Bursaries</TableCell>
              <TableCell className="text-right font-mono">${incomeInfo.bursaries.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><PiggyBank size={16} /> RESP</TableCell>
              <TableCell className="text-right font-mono">${incomeInfo.RESP.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><Users size={16} /> Parental Support</TableCell>
              <TableCell className="text-right font-mono">${incomeInfo.parentalSupport.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><Plus size={16} /> Other Income</TableCell>
              <TableCell className="text-right font-mono">${incomeInfo.otherIncome.toLocaleString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default IncomeSourcesCard; 