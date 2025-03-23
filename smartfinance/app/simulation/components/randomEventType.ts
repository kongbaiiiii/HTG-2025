export type RandomEvent = {
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