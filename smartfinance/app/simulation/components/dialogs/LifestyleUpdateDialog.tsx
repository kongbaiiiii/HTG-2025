"use client"
import UniversityExpensesCard from "../summary/UniversityExpensesCard";
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  School,
  DollarSign,
  Wallet,
  PiggyBank,
  CreditCard,
  BookOpen,
  Bus,
  Coffee,
  Home,
  Briefcase,
  Users,
  Plus
} from "lucide-react"

interface LifestyleUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  universityInfo: {
    tuition: number;
    rent: number;
    food: number;
    transportation: number;
    books: number;
    other: number;
  };
  incomeInfo: {
    partTimeJob: number;
    scholarships: number;
    bursaries: number;
    RESP: number;
    parentalSupport: number;
    otherIncome: number;
  };
  osapInfo: {
    osapGrant: number;
    osapLoan: number;
    totalOsapAid: number;
    osapLoanRemaining: number;
  };
  assetsInfo: {
    cash: number;
    savingsAccount: number;
    creditCardDebt: number;
    otherDebt: number;
    otherDebtInterest: number;
    otherDebtCompounding: number;
  };
  setUniversityInfo: React.Dispatch<React.SetStateAction<any>>;
  setIncomeInfo: React.Dispatch<React.SetStateAction<any>>;
  setOsapInfo: React.Dispatch<React.SetStateAction<any>>;
  setAssetsInfo: React.Dispatch<React.SetStateAction<any>>;
}

const LifestyleUpdateDialog: React.FC<LifestyleUpdateDialogProps> = ({
  open,
  onOpenChange,
  universityInfo,
  incomeInfo,
  osapInfo,
  assetsInfo,
  setUniversityInfo,
  setIncomeInfo,
  setOsapInfo,
  setAssetsInfo
}) => {
  const [selectedLifestyleOption, setSelectedLifestyleOption] = React.useState("");
  const [selectedDebtType, setSelectedDebtType] = React.useState("");
  const [selectedExpenseField, setSelectedExpenseField] = React.useState("");
  const [lifestyleAmount, setLifestyleAmount] = React.useState(0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lifestyle Update</DialogTitle>
          <DialogDescription>
            Make adjustments to your financial situation
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Choose an option:</h3>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant={selectedLifestyleOption === "job" ? "default" : "outline"}
                className={`justify-start ${selectedLifestyleOption === "job" ? "bg-green-200 text-black hover:bg-green-300" : ""}`}
                onClick={() => {
                  setSelectedLifestyleOption("job");
                  setSelectedDebtType("");
                  setSelectedExpenseField("");
                }}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Take a part-time job
              </Button>

              <Button
                variant={selectedLifestyleOption === "parentalAid" ? "default" : "outline"}
                className={`justify-start ${selectedLifestyleOption === "parentalAid" ? "bg-indigo-200 text-black hover:bg-indigo-300" : ""}`}
                onClick={() => {
                  setSelectedLifestyleOption("parentalAid");
                  setSelectedDebtType("");
                  setSelectedExpenseField("");
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                Adjust parental support
              </Button>

              <Button
                variant={selectedLifestyleOption === "debt" ? "default" : "outline"}
                className={`justify-start ${selectedLifestyleOption === "debt" ? "bg-red-200 text-black hover:bg-red-300" : ""}`}
                onClick={() => {
                  setSelectedLifestyleOption("debt");
                  setSelectedDebtType("");
                  setSelectedExpenseField("");
                }}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Take on a debt
              </Button>

              <Button
                variant={selectedLifestyleOption === "expenses" ? "default" : "outline"}
                className={`justify-start ${selectedLifestyleOption === "expenses" ? "bg-blue-200 text-black hover:bg-blue-300" : ""}`}
                onClick={() => {
                  setSelectedLifestyleOption("expenses");
                  setSelectedDebtType("");
                  setSelectedExpenseField("");
                }}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Modify living expenses
              </Button>

              <Button
                variant={selectedLifestyleOption === "resp" ? "default" : "outline"}
                className={`justify-start ${selectedLifestyleOption === "resp" ? "bg-purple-200 text-black hover:bg-purple-300" : ""}`}
                onClick={() => {
                  setSelectedLifestyleOption("resp");
                  setSelectedDebtType("");
                }}
                disabled={incomeInfo.RESP <= 0}
              >
                <PiggyBank className="mr-2 h-4 w-4" />
                Take money from RESP {incomeInfo.RESP <= 0 && "(No funds available)"}
              </Button>

              <Button
                variant={selectedLifestyleOption === "repay" ? "default" : "outline"}
                className={`justify-start ${selectedLifestyleOption === "repay" ? "bg-teal-200 text-black hover:bg-teal-300" : ""}`}
                onClick={() => {
                  setSelectedLifestyleOption("repay");
                  setSelectedDebtType("");
                }}
                disabled={osapInfo.osapLoanRemaining <= 0 && assetsInfo.otherDebt <= 0 && assetsInfo.creditCardDebt <= 0}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Repay debt {(osapInfo.osapLoanRemaining <= 0 && assetsInfo.otherDebt <= 0 && assetsInfo.creditCardDebt <= 0) && "(No debt to repay)"}
              </Button>
            </div>
          </div>

          {selectedLifestyleOption === "repay" && (
            <div className="space-y-2">
              <h3 className="font-medium">Select debt to repay:</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={selectedDebtType === "osap" ? "default" : "outline"}
                  className={`justify-start ${selectedDebtType === "osap" ? "bg-purple-200 text-black hover:bg-purple-300" : ""}`}
                  onClick={() => setSelectedDebtType("osap")}
                  disabled={osapInfo.osapLoanRemaining <= 0}
                >
                  <School className="mr-2 h-4 w-4" />
                  OSAP Loan (${osapInfo.osapLoanRemaining.toLocaleString()})
                  {osapInfo.osapLoanRemaining <= 0 && " - Fully Paid"}
                </Button>

                <Button
                  variant={selectedDebtType === "other" ? "default" : "outline"}
                  className={`justify-start ${selectedDebtType === "other" ? "bg-orange-200 text-black hover:bg-orange-300" : ""}`}
                  onClick={() => setSelectedDebtType("other")}
                  disabled={assetsInfo.otherDebt <= 0}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Other Debt (${assetsInfo.otherDebt.toLocaleString()})
                  {assetsInfo.otherDebt <= 0 && " - Fully Paid"}
                </Button>

                <Button
                  variant={selectedDebtType === "credit" ? "default" : "outline"}
                  className={`justify-start ${selectedDebtType === "credit" ? "bg-red-200 text-black hover:bg-red-300" : ""}`}
                  onClick={() => setSelectedDebtType("credit")}
                  disabled={assetsInfo.creditCardDebt <= 0}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Credit Card Debt (${assetsInfo.creditCardDebt.toLocaleString()})
                  {assetsInfo.creditCardDebt <= 0 && " - Fully Paid"}
                </Button>
              </div>
            </div>
          )}

          {selectedLifestyleOption === "expenses" && (
            <div className="space-y-2">
              <h3 className="font-medium">Select expense to modify:</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={selectedExpenseField === "tuition" ? "default" : "outline"}
                  className={`justify-start ${selectedExpenseField === "tuition" ? "bg-blue-200 text-black hover:bg-blue-300" : ""}`}
                  onClick={() => setSelectedExpenseField("tuition")}
                >
                  <School className="mr-2 h-4 w-4" />
                  Tuition (${universityInfo.tuition.toLocaleString()})
                </Button>

                <Button
                  variant={selectedExpenseField === "rent" ? "default" : "outline"}
                  className={`justify-start ${selectedExpenseField === "rent" ? "bg-blue-200 text-black hover:bg-blue-300" : ""}`}
                  onClick={() => setSelectedExpenseField("rent")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Rent (${universityInfo.rent.toLocaleString()})
                </Button>

                <Button
                  variant={selectedExpenseField === "food" ? "default" : "outline"}
                  className={`justify-start ${selectedExpenseField === "food" ? "bg-blue-200 text-black hover:bg-blue-300" : ""}`}
                  onClick={() => setSelectedExpenseField("food")}
                >
                  <Coffee className="mr-2 h-4 w-4" />
                  Food (${universityInfo.food.toLocaleString()})
                </Button>

                <Button
                  variant={selectedExpenseField === "transportation" ? "default" : "outline"}
                  className={`justify-start ${selectedExpenseField === "transportation" ? "bg-blue-200 text-black hover:bg-blue-300" : ""}`}
                  onClick={() => setSelectedExpenseField("transportation")}
                >
                  <Bus className="mr-2 h-4 w-4" />
                  Transportation (${universityInfo.transportation.toLocaleString()})
                </Button>

                <Button
                  variant={selectedExpenseField === "books" ? "default" : "outline"}
                  className={`justify-start ${selectedExpenseField === "books" ? "bg-blue-200 text-black hover:bg-blue-300" : ""}`}
                  onClick={() => setSelectedExpenseField("books")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Books (${universityInfo.books.toLocaleString()})
                </Button>

                <Button
                  variant={selectedExpenseField === "other" ? "default" : "outline"}
                  className={`justify-start ${selectedExpenseField === "other" ? "bg-blue-200 text-black hover:bg-blue-300" : ""}`}
                  onClick={() => setSelectedExpenseField("other")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Other (${universityInfo.other.toLocaleString()})
                </Button>
              </div>
            </div>
          )}

          {((selectedLifestyleOption && selectedLifestyleOption !== "repay" && selectedLifestyleOption !== "expenses") ||
            (selectedLifestyleOption === "repay" && selectedDebtType) ||
            (selectedLifestyleOption === "expenses" && selectedExpenseField)) && (
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {selectedLifestyleOption === "job" && "Monthly income from job ($)"}
                  {selectedLifestyleOption === "parentalAid" && "Monthly parental support ($)"}
                  {selectedLifestyleOption === "debt" && "Debt amount ($)"}
                  {selectedLifestyleOption === "expenses" && selectedExpenseField === "tuition" && "New tuition amount ($)"}
                  {selectedLifestyleOption === "expenses" && selectedExpenseField === "rent" && "New rent amount ($)"}
                  {selectedLifestyleOption === "expenses" && selectedExpenseField === "food" && "New food amount ($)"}
                  {selectedLifestyleOption === "expenses" && selectedExpenseField === "transportation" && "New transportation amount ($)"}
                  {selectedLifestyleOption === "expenses" && selectedExpenseField === "books" && "New books amount ($)"}
                  {selectedLifestyleOption === "expenses" && selectedExpenseField === "other" && "New other expenses amount ($)"}
                  {selectedLifestyleOption === "resp" && "Amount to withdraw from RESP ($)"}
                  {selectedLifestyleOption === "repay" && selectedDebtType === "osap" && "Amount to repay OSAP loan ($)"}
                  {selectedLifestyleOption === "repay" && selectedDebtType === "other" && "Amount to repay other debt ($)"}
                  {selectedLifestyleOption === "repay" && selectedDebtType === "credit" && "Amount to repay credit card debt ($)"}
                </label>
                <input
                  id="amount"
                  type="number"
                  min="0"
                  max={selectedLifestyleOption === "resp" ? incomeInfo.RESP :
                    selectedLifestyleOption === "repay" && selectedDebtType === "osap" ? Math.min(osapInfo.osapLoanRemaining, assetsInfo.savingsAccount) :
                      selectedLifestyleOption === "repay" && selectedDebtType === "other" ? Math.min(assetsInfo.otherDebt, assetsInfo.savingsAccount) :
                        selectedLifestyleOption === "repay" && selectedDebtType === "credit" ? Math.min(assetsInfo.creditCardDebt, assetsInfo.savingsAccount) :
                          undefined}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={lifestyleAmount}
                  onChange={(e) => setLifestyleAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                />
                {selectedLifestyleOption === "parentalAid" && (
                  <p className="text-sm text-gray-500">Current parental support: ${incomeInfo.parentalSupport}/month</p>
                )}
                {selectedLifestyleOption === "repay" && assetsInfo.savingsAccount < lifestyleAmount && (
                  <p className="text-sm text-red-500">Warning: You don't have enough in your savings account to repay this amount.</p>
                )}
              </div>
            )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedLifestyleOption("");
              setSelectedDebtType("");
              setSelectedExpenseField("");
              setLifestyleAmount(0);
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>

          <Button
            disabled={(!selectedLifestyleOption || lifestyleAmount < 0) ||
              (selectedLifestyleOption === "repay" && !selectedDebtType) ||
              (selectedLifestyleOption === "expenses" && !selectedExpenseField) ||
              (selectedLifestyleOption === "repay" && assetsInfo.savingsAccount < lifestyleAmount)}
            className="bg-green-200 text-black hover:bg-green-300"
            onClick={() => {
              // Apply the selected lifestyle change
              if (selectedLifestyleOption === "job") {
                setIncomeInfo(prev => ({
                  ...prev,
                  partTimeJob: prev.partTimeJob + lifestyleAmount
                }));
              } else if (selectedLifestyleOption === "parentalAid") {
                setIncomeInfo(prev => ({
                  ...prev,
                  parentalSupport: lifestyleAmount
                }));
              } else if (selectedLifestyleOption === "debt") {
                setAssetsInfo(prev => ({
                  ...prev,
                  otherDebt: prev.otherDebt + lifestyleAmount,
                  savingsAccount: prev.savingsAccount + lifestyleAmount
                }));
              } else if (selectedLifestyleOption === "expenses") {
                setUniversityInfo(prev => ({
                  ...prev,
                  [selectedExpenseField]: lifestyleAmount
                }));
              } else if (selectedLifestyleOption === "resp") {
                setIncomeInfo(prev => ({
                  ...prev,
                  RESP: prev.RESP - lifestyleAmount
                }));
                setAssetsInfo(prev => ({
                  ...prev,
                  savingsAccount: prev.savingsAccount + lifestyleAmount
                }));
              } else if (selectedLifestyleOption === "repay") {
                // Reduce savings account balance
                setAssetsInfo(prev => ({
                  ...prev,
                  savingsAccount: prev.savingsAccount - lifestyleAmount
                }));

                // Apply to the selected debt type
                if (selectedDebtType === "osap") {
                  setOsapInfo(prev => ({
                    ...prev,
                    osapLoanRemaining: Math.max(0, prev.osapLoanRemaining - lifestyleAmount)
                  }));
                } else if (selectedDebtType === "other") {
                  setAssetsInfo(prev => ({
                    ...prev,
                    otherDebt: Math.max(0, prev.otherDebt - lifestyleAmount)
                  }));
                } else if (selectedDebtType === "credit") {
                  setAssetsInfo(prev => ({
                    ...prev,
                    creditCardDebt: Math.max(0, prev.creditCardDebt - lifestyleAmount)
                  }));
                }
              }

              // Reset and close dialog
              setSelectedLifestyleOption("");
              setSelectedDebtType("");
              setSelectedExpenseField("");
              setLifestyleAmount(0);
              onOpenChange(false);
            }}
          >
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LifestyleUpdateDialog; 