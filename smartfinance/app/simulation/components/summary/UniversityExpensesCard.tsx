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
  School,
  BookOpen,
  Home,
  Coffee,
  Bus,
  Plus
} from "lucide-react"

interface UniversityExpensesCardProps {
  universityInfo: {
    tuition: number;
    rent: number;
    food: number;
    transportation: number;
    books: number;
    other: number;
  };
}

const UniversityExpensesCard: React.FC<UniversityExpensesCardProps> = ({
  universityInfo
}) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <School size={20} /> University Expenses
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center gap-2"><BookOpen size={16} /> Tuition</TableCell>
              <TableCell className="text-right font-mono">${universityInfo.tuition.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><Home size={16} /> Rent</TableCell>
              <TableCell className="text-right font-mono">${universityInfo.rent.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><Coffee size={16} /> Food</TableCell>
              <TableCell className="text-right font-mono">${universityInfo.food.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><Bus size={16} /> Transportation</TableCell>
              <TableCell className="text-right font-mono">${universityInfo.transportation.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><BookOpen size={16} /> Books</TableCell>
              <TableCell className="text-right font-mono">${universityInfo.books.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2"><Plus size={16} /> Other</TableCell>
              <TableCell className="text-right font-mono">${universityInfo.other.toLocaleString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UniversityExpensesCard; 