"use client"

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import UniversityInput from "@/utils/universityInput";
import IncomeInput from "@/utils/incomeInput";
import LoanInput from "@/utils/loanInput";
import AssetInput from "@/utils/assetInput";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LifestyleUpdateDialog from "./components/dialogs/LifestyleUpdateDialog";
import NegativeBalanceDialog from "./components/dialogs/NegativeBalanceDialog";
import MonthlySummaryDialog from "./components/dialogs/MonthlySummaryDialog";
import UniversityExpensesCard from "./components/summary/UniversityExpensesCard";
import IncomeSourcesCard from "./components/summary/IncomeSourcesCard";
import OsapInformationCard from "./components/summary/OsapInformationCard";
import AssetsDebtsCard from "./components/summary/AssetsDebtsCard";

const MONTH_MAP = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  0: "December",
}

const FinancialSimulation = () => {
  // Add state for dialog
  const [dialogOpen, setDialogOpen] = useState(true);
  const [dialogStep, setDialogStep] = useState(1); // Add this to track dialog steps
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [simulationMonth, setSimulationMonth] = useState(0);

  const [monthlySummary, setMonthlySummary] = useState({});
  const [monthlySummaryDialogOpen, setMonthlySummaryDialogOpen] = useState(false);

  const [lifeStyleUpdateDialogOpen, setLifeStyleUpdateDialogOpen] = useState(false);
  const [selectedLifestyleOption, setSelectedLifestyleOption] = useState("");

  const [selectedDebtType, setSelectedDebtType] = useState("");
  const [lifestyleAmount, setLifestyleAmount] = useState(0);
  const [selectedExpenseField, setSelectedExpenseField] = useState("");

  const [negativeBalance, setNegativeBalance] = useState(false);
  const [negativeBalanceDialogOpen, setNegativeBalanceDialogOpen] = useState(false);
  const [universityInfo, setUniversityInfo] = useState({
    tuition: 8000,
    rent: 1000,
    food: 300,
    transportation: 30,
    books: 400,
    other: 300,
  });

  // Income Sources
  const [incomeInfo, setIncomeInfo] = useState({
    partTimeJob: 0,
    scholarships: 0,
    bursaries: 0,
    RESP: 25000,
    parentalSupport: 1000,
    otherIncome: 0,
  });

  // OSAP Information
  const [osapInfo, setOsapInfo] = useState({
    osapGrant: 5000,
    osapLoan: 7000,
    totalOsapAid: 12000,
    osapLoanRemaining: 7000,
  });

  const [assetsInfo, setAssetsInfo] = useState({
    cash: 500,
    savingsAccount: 1000,
    creditCardDebt: 0,
    otherDebt: 0,
    otherDebtInterest: 0,
    otherDebtCompounding: 0,
  });

  // Function to handle input changes
  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>, infoType: string) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    if (infoType === "university") {
      setUniversityInfo(prev => ({
        ...prev,
        [name]: numValue
      }));
    } else if (infoType === "income") {
      setIncomeInfo(prev => ({
        ...prev,
        [name]: numValue
      }));
    } else if (infoType === "osap") {
      setOsapInfo(prev => ({
        ...prev,
        [name]: numValue
      }));
    }
    else if (infoType === "assets") {
      setAssetsInfo(prev => ({
        ...prev,
        [name]: numValue
      }));
    }
  };

  function isSchoolMonth(month: number): boolean {
    // Ensure month is between 1 and 12
    if (month < 0) {
      console.error("month: ", month);
      throw new Error("Month must be between 1 and 12");
    }
    else if (month > 12) {
      month = month % 12;
    }

    // School months are typically September (9) through May (5)
    return month < 9;
  }
  function isSchoolStartMonth(month: number): boolean {
    // Ensure month is between 1 and 12
    if (month < 0) {
      console.error("month: ", month);
      throw new Error("Month must be between 1 and 12");
    }
    else if (month > 12) {
      month = month % 12;
    }

    // School months are typically September (1) through April (8)
    return month === 0 || month === 4;
  }

  const startSimulation = () => {
    setSimulationStarted(true);
    const summary: { [key: string]: number } = {
      scholarships: incomeInfo.scholarships,
      bursaries: incomeInfo.bursaries,
      osapGrant: osapInfo.osapGrant,
      osapLoan: osapInfo.osapLoan,
    }

    assetsInfo.savingsAccount += incomeInfo.scholarships;
    assetsInfo.savingsAccount += incomeInfo.bursaries;
    assetsInfo.savingsAccount += osapInfo.osapGrant;
    assetsInfo.savingsAccount += osapInfo.osapLoan;
    incomeInfo.scholarships = 0;
    incomeInfo.bursaries = 0;
    osapInfo.osapGrant = 0;
    osapInfo.osapLoan = 0;
    setMonthlySummary(summary);
    setMonthlySummaryDialogOpen(true);
  }

  function calculateBalance(summary: { [key: string]: number }, savingsAccount: number): number {
    const netChange = Object.values(summary).reduce((acc, curr) => acc + curr, 0);
    console.log("netChange: ", netChange);
    return savingsAccount + netChange;
  }

  const advanceMonth = () => {
    // Check if balance is already negative before proceeding
    if (assetsInfo.savingsAccount < 0) {
      setNegativeBalance(true);
      setNegativeBalanceDialogOpen(true);
      return; // Don't advance month if balance is already negative
    }

    const summary: { [key: string]: number } = {
      partTimeJob: incomeInfo.partTimeJob,
      parentalSupport: incomeInfo.parentalSupport,
      otherIncome: incomeInfo.otherIncome,
      otherExpenses: 0,
    }
    // 1. income
    assetsInfo.savingsAccount += incomeInfo.partTimeJob;
    console.log("partTimeJob: ", incomeInfo.partTimeJob);
    assetsInfo.savingsAccount += incomeInfo.parentalSupport;
    console.log("parentalSupport: ", incomeInfo.parentalSupport);
    assetsInfo.savingsAccount += incomeInfo.otherIncome;
    console.log("otherIncome: ", incomeInfo.otherIncome);
    // 2. university expenses
    if (isSchoolStartMonth(simulationMonth)) {
      summary["universityTuition"] = -universityInfo.tuition;
      console.log("universityTuition: ", summary["universityTuition"]);
      assetsInfo.savingsAccount -= universityInfo.tuition;
      summary["universityBooks"] = -universityInfo.books;
      console.log("universityBooks: ", summary["universityBooks"]);
      assetsInfo.savingsAccount -= universityInfo.books;
    }
    if (isSchoolMonth(simulationMonth)) {
      summary["universityRent"] = -universityInfo.rent;
      console.log("universityRent: ", summary["universityRent"]);
      assetsInfo.savingsAccount -= universityInfo.rent;
      summary["universityFood"] = -universityInfo.food;
      console.log("universityFood: ", summary["universityFood"]);
      assetsInfo.savingsAccount -= universityInfo.food;
      summary["universityTransportation"] = -universityInfo.transportation;
      console.log("universityTransportation: ", summary["universityTransportation"]);
      assetsInfo.savingsAccount -= universityInfo.transportation;
      summary["universityOther"] = -universityInfo.other;
      console.log("universityOther: ", summary["universityOther"]);
      assetsInfo.savingsAccount -= universityInfo.other;
    }
    // 3. other stuff
    if (assetsInfo.savingsAccount < 0) {
      setNegativeBalance(true);
      setNegativeBalanceDialogOpen(true);
    }
    else {
      setSimulationMonth(simulationMonth + 1);
      setMonthlySummaryDialogOpen(true);
    }

    setMonthlySummary(summary);
  }

  return (
    <div className="container mx-auto mt-4 mb-4 px-4">
      {!simulationStarted &&
        <Dialog open={dialogOpen} onOpenChange={() => {
          setDialogStep(1);
          setDialogOpen(!dialogOpen);
        }}>
          <DialogTrigger asChild>
            <Button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-300 hover:text-black" onClick={() => setDialogOpen(true)}>Edit Simulation Information</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              {dialogStep === 1 ? (
                <>
                  <DialogTitle>Welcome to the Financial Fortune Simulator!</DialogTitle>
                  <DialogDescription className="text-base">
                    This is a simulation game where you can explore different financial strategies after high school. <br />
                    Start the simulation by inputing some essential information about yourself.
                  </DialogDescription>
                  <Button
                    className="w-24 bg-green-200 text-black px-4 py-2 rounded-md hover:bg-green-300"
                    onClick={() => {
                      setDialogStep(dialogStep + 1);
                    }}>Next</Button>
                </>
              ) : dialogStep === 2 ? (
                <>
                  <UniversityInput universityInfo={universityInfo} handleUniversityInfoChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInfoChange(e, "university")} />
                  <div className="flex justify-between mt-6">
                    <Button
                      className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300"
                      onClick={() => setDialogStep(dialogStep - 1)}>Back</Button>
                    <Button
                      className="bg-green-200 text-black px-4 py-2 rounded-md hover:bg-green-300"
                      onClick={() => {
                        setDialogStep(dialogStep + 1);
                      }}>Next</Button>
                  </div>
                </>
              ) : dialogStep === 3 ? (
                <>
                  <IncomeInput incomeInfo={incomeInfo} handleIncomeInfoChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInfoChange(e, "income")} />
                  <div className="flex justify-between mt-6">
                    <Button
                      className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300"
                      onClick={() => setDialogStep(dialogStep - 1)}>Back</Button>
                    <Button
                      className="bg-green-200 text-black px-4 py-2 rounded-md hover:bg-green-300"
                      onClick={() => {
                        setDialogStep(dialogStep + 1);
                      }}>Next</Button>
                  </div>
                </>
              ) : dialogStep === 4 ? (
                <>
                  <LoanInput loanInfo={osapInfo} handleLoanInfoChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInfoChange(e, "osap")} />
                  <div className="flex justify-between mt-6">
                    <Button
                      className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300"
                      onClick={() => setDialogStep(dialogStep - 1)}>Back</Button>
                    <Button
                      className="bg-green-200 text-black px-4 py-2 rounded-md hover:bg-green-300"
                      onClick={() => {
                        setDialogStep(dialogStep + 1);
                      }}>Next</Button>
                  </div>
                </>
              ) : dialogStep === 5 ? (
                <>
                  <AssetInput assetsInfo={assetsInfo} handleAssetsInfoChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInfoChange(e, "assets")} />
                  <div className="flex justify-between mt-6">
                    <Button
                      className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300"
                      onClick={() => setDialogStep(dialogStep - 1)}>Back</Button>
                    <Button
                      className="bg-green-200 text-black px-4 py-2 rounded-md hover:bg-green-300"
                      onClick={() => {
                        setDialogOpen(false);
                        startSimulation();
                      }}>Start Simulation</Button>
                  </div>
                </>
              ) : null}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      }


      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-mono text-center text-green-700 mb-4">
          Financial Fortune Simulator 💰
        </h1>
        {!simulationStarted &&
          <div className="flex justify-center mt-8">
            <Button className="bg-green-200 text-black px-4 py-2 rounded-md hover:bg-green-300" onClick={() => startSimulation()}>Start Simulation</Button>
          </div>
        }
        {simulationStarted &&
          <div className="flex justify-end mt-8 gap-4">
            <Button className="bg-blue-200 text-black px-4 py-2 rounded-md hover:bg-blue-300" onClick={() => { setSimulationStarted(false) }}>End Simulation</Button>
            <Button className="bg-yellow-200 text-black px-4 py-2 rounded-md hover:bg-yellow-300" onClick={() => { setLifeStyleUpdateDialogOpen(true) }}>Lifestyle Update</Button>
            <Button className="bg-green-200 text-black px-4 py-2 rounded-md hover:bg-green-300" onClick={() => { advanceMonth() }}>Next Month</Button>
          </div>
        }
        {simulationStarted &&
          <>
            <p className="text-base text-center text-black mb-4">{MONTH_MAP[(simulationMonth + 8) % 12 as keyof typeof MONTH_MAP]}</p>
            <MonthlySummaryDialog
              open={monthlySummaryDialogOpen}
              onOpenChange={setMonthlySummaryDialogOpen}
              monthlySummary={monthlySummary}
              savingsAccountBalance={assetsInfo.savingsAccount}
            />

            {negativeBalance &&
              <NegativeBalanceDialog
                open={negativeBalanceDialogOpen}
                onOpenChange={setNegativeBalanceDialogOpen}
                balance={assetsInfo.savingsAccount}
                onMakeChanges={() => setLifeStyleUpdateDialogOpen(true)}
              />
            }
          </>
        }
      </div>

      {/* Financial Summary Cards Section */}
      {simulationStarted && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Use all the extracted card components */}
          <UniversityExpensesCard universityInfo={universityInfo} />
          <IncomeSourcesCard incomeInfo={incomeInfo} />
          <OsapInformationCard osapInfo={osapInfo} />
          <AssetsDebtsCard assetsInfo={assetsInfo} />
        </div>
      )}

      {/* Lifestyle Update Dialog */}
      <LifestyleUpdateDialog
        open={lifeStyleUpdateDialogOpen}
        onOpenChange={setLifeStyleUpdateDialogOpen}
        universityInfo={universityInfo}
        incomeInfo={incomeInfo}
        osapInfo={osapInfo}
        assetsInfo={assetsInfo}
        setUniversityInfo={setUniversityInfo}
        setIncomeInfo={setIncomeInfo}
        setOsapInfo={setOsapInfo}
        setAssetsInfo={setAssetsInfo}
      />
    </div>
  );
};

export default FinancialSimulation;
