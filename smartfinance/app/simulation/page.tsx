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
import LifestyleUpdateDialog from "./components/dialogs/LifestyleUpdateDialog";
import NegativeBalanceDialog from "./components/dialogs/NegativeBalanceDialog";
import MonthlySummaryDialog from "./components/dialogs/MonthlySummaryDialog";
import UniversityExpensesCard from "./components/summary/UniversityExpensesCard";
import IncomeSourcesCard from "./components/summary/IncomeSourcesCard";
import OsapInformationCard from "./components/summary/OsapInformationCard";
import AssetsDebtsCard from "./components/summary/AssetsDebtsCard";
import RandomEventDialog from "./components/dialogs/RandomEventDialog";
import type { RandomEvent } from "./components/randomEventType";
import { randomEvents } from "./components/randomEvents";
import EndSimulationDialog from "./components/dialogs/EndSimulationDialog";
import { useRouter } from 'next/navigation';
import SimulationChat from "@/components/simulationchat";
import { useAuth } from "@clerk/nextjs";
import LeaderboardDialog from "./components/dialogs/LeaderboardDialog";

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

  const { userId } = useAuth();
  const router = useRouter();

  // Add state for dialog
  const [dialogOpen, setDialogOpen] = useState(true);
  const [dialogStep, setDialogStep] = useState(1); // Add this to track dialog steps
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [simulationMonth, setSimulationMonth] = useState(0);

  // Add this constant to store initial values
  const [initialValues, setInitialValues] = useState({
    university: {},
    income: {},
    osap: {},
    assets: {},
    netWorth: 0
  });

  const [monthlySummary, setMonthlySummary] = useState({});
  const [monthlySummaryDialogOpen, setMonthlySummaryDialogOpen] = useState(false);

  const [lifeStyleUpdateDialogOpen, setLifeStyleUpdateDialogOpen] = useState(false);


  const [negativeBalance, setNegativeBalance] = useState(false);
  const [negativeBalanceDialogOpen, setNegativeBalanceDialogOpen] = useState(false);
  const [universityInfo, setUniversityInfo] = useState({
    tuition: 4000,
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
    savingsAccount: 1000,
    savingsAccountInterest: 0.05,
    creditCardDebt: 0,
    otherDebt: 0,
    otherDebtInterest: 0,
    otherDebtCompounding: 0,
  });

  const [randomEventDialogOpen, setRandomEventDialogOpen] = useState(false);
  const [currentRandomEvent, setCurrentRandomEvent] = useState<RandomEvent | null>(null);

  const [endSimulationDialogOpen, setEndSimulationDialogOpen] = useState(false);

  // Add state for leaderboard
  const [leaderboard, setLeaderboard] = useState<Array<{ email: string, score: number }>>([]);
  const [leaderboardDialogOpen, setLeaderboardDialogOpen] = useState(false);

  // Function to generate a random event
  const generateRandomEvent = () => {

    if (randomEvents.length > 0) {
      // Select a single random event based on weighted probabilities

      // Calculate total probability weight
      const totalProbability = randomEvents.reduce((sum, event) => sum + event.probability, 0);

      // Generate a random value between 0 and total probability
      let randomValue = Math.random() * totalProbability;

      // Find the event that corresponds to this random value
      let selectedEvent = randomEvents[0];
      for (const event of randomEvents) {
        randomValue -= event.probability;
        if (randomValue <= 0) {
          selectedEvent = event;
          break;
        }
      }

      setCurrentRandomEvent(selectedEvent);
      setRandomEventDialogOpen(true);

      return selectedEvent;
    }

    return null;
  };

  // Function to apply the random event's financial impact
  const applyRandomEvent = (event: RandomEvent) => {
    const summary = { ...monthlySummary };

    // Apply the financial impact based on the event type
    if (event.impactType === "savings") {
      assetsInfo.savingsAccount += event.financialImpact;
      summary[event.title] = event.financialImpact;
    }

    setMonthlySummary(summary);
  };

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
    else if (month >= 12) {
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
    else if (month >= 12) {
      month = month % 12;
    }

    // School months are typically September (1) through April (8)
    return month === 0 || month === 4;
  }

  function isYearStartMonth(month: number): boolean {
    // Ensure month is between 1 and 12
    if (month < 0) {
      console.error("month: ", month);
      throw new Error("Month must be between 1 and 12");
    }
    else if (month >= 12) {
      month = month % 12;
    }

    return month === 0;
  }

  const startSimulation = () => {
    setSimulationStarted(true);

    // Store initial values for later comparison
    const initialNetWorth =
      assetsInfo.savingsAccount -
      assetsInfo.creditCardDebt -
      assetsInfo.otherDebt -
      osapInfo.osapLoanRemaining;

    setInitialValues({
      university: { ...universityInfo },
      income: { ...incomeInfo },
      osap: { ...osapInfo },
      assets: { ...assetsInfo },
      netWorth: initialNetWorth
    });

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
    setMonthlySummary(summary);
    setMonthlySummaryDialogOpen(true);
  }

  const advanceMonth = () => {
    // Check if balance is already negative before proceeding
    if (assetsInfo.savingsAccount < 0) {
      setNegativeBalance(true);
      setNegativeBalanceDialogOpen(true);
      return; // Don't advance month if balance is already negative
    }
    setMonthlySummary({});

    // Generate random event first
    const randomEvent = generateRandomEvent();

    // If there's a random event, apply it after dialog is closed
    if (randomEvent) {
      // The financial impact will be applied when the dialog is closed
      setMonthlySummaryDialogOpen(false);
    }

    const summary: { [key: string]: number } = {
      partTimeJob: incomeInfo.partTimeJob,
      parentalSupport: incomeInfo.parentalSupport,
      otherIncome: incomeInfo.otherIncome,
    }

    // Calculate and add interest on savings account (if positive)
    if (assetsInfo.savingsAccount > 0) {
      const monthlyInterest = calculateMonthlyInterest(
        assetsInfo.savingsAccount,
        assetsInfo.savingsAccountInterest,
        1 // Annual compounding
      );

      // Add interest to savings account
      assetsInfo.savingsAccount += monthlyInterest;

      // Add interest to summary
      summary["savingsInterest"] = monthlyInterest;
    }

    if (isYearStartMonth(simulationMonth)) {
      assetsInfo.savingsAccount += osapInfo.osapGrant;
      assetsInfo.savingsAccount += osapInfo.osapLoan;
      osapInfo.osapLoanRemaining += osapInfo.osapLoan;
      summary["osapGrant"] = osapInfo.osapGrant;
      summary["osapLoan"] = osapInfo.osapLoan;
    }
    // 1. income
    assetsInfo.savingsAccount += incomeInfo.partTimeJob;
    assetsInfo.savingsAccount += incomeInfo.parentalSupport;
    assetsInfo.savingsAccount += incomeInfo.otherIncome;
    // 2. university expenses
    if (isSchoolStartMonth(simulationMonth)) {
      summary["universityTuition"] = -universityInfo.tuition;
      assetsInfo.savingsAccount -= universityInfo.tuition;
      summary["universityBooks"] = -universityInfo.books;
      assetsInfo.savingsAccount -= universityInfo.books;
    }
    if (isSchoolMonth(simulationMonth)) {
      summary["universityRent"] = -universityInfo.rent;
      assetsInfo.savingsAccount -= universityInfo.rent;
      summary["universityFood"] = -universityInfo.food;
      assetsInfo.savingsAccount -= universityInfo.food;
      summary["universityTransportation"] = -universityInfo.transportation;
      assetsInfo.savingsAccount -= universityInfo.transportation;
      summary["universityOther"] = -universityInfo.other;
      assetsInfo.savingsAccount -= universityInfo.other;
    }
    // 3. other stuff
    if (assetsInfo.savingsAccount < 0) {
      setNegativeBalance(true);
    }
    else {
      setSimulationMonth(simulationMonth + 1);
    }

    setMonthlySummary(summary);
  }

  // You can now use initialValues anywhere in your component to compare with current values
  // For example, you could add a function to calculate change in net worth:

  const calculateNetWorthChange = () => {
    const currentNetWorth =
      assetsInfo.savingsAccount -
      assetsInfo.creditCardDebt -
      assetsInfo.otherDebt -
      osapInfo.osapLoanRemaining;

    return currentNetWorth - initialValues.netWorth;
  }

  // Function to handle ending the simulation
  const handleEndSimulation = () => {
    setEndSimulationDialogOpen(true);
  };

  // Function to actually end the simulation after dialog is closed
  const confirmEndSimulation = async () => {
    setEndSimulationDialogOpen(false);

    // Check if the user has completed at least 12 months
    if (simulationMonth >= 12) {
      const finalScore = calculateEndingScore();
      try {
        const leaderboardReq = await fetch('/api/get_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            score: finalScore
          })
        });
        if (leaderboardReq.ok) {
          const data = await leaderboardReq.json();
          setLeaderboard(data.leaderboard || []);
          setLeaderboardDialogOpen(true);
        } else {
          // Handle error
          console.error('Failed to end simulation');
          // router.push('/');
        }
      } catch (error) {
        console.error('Error ending simulation:', error);
        // router.push('/');
      }
    } else {
      // If less than 12 months, just go back to home
      // router.push('/');
    }
  };

  const getContext = (): string => {
    // Calculate current month name and year
    const currentMonthIndex = (simulationMonth + 8) % 12;

    // Calculate net worth
    const currentNetWorth =
      assetsInfo.savingsAccount -
      assetsInfo.creditCardDebt -
      assetsInfo.otherDebt -
      osapInfo.osapLoanRemaining;

    // Format currency values
    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };

    // Build the context string
    let context = `
Current Simulation Status:
-------------------------

Financial Summary:
-----------------
Net Worth: ${formatCurrency(currentNetWorth)} (${formatCurrency(calculateNetWorthChange())} change since start)

University Expenses:
------------------
Tuition: ${formatCurrency(universityInfo.tuition)} per semester
Rent: ${formatCurrency(universityInfo.rent)} per month
Food: ${formatCurrency(universityInfo.food)} per month
Transportation: ${formatCurrency(universityInfo.transportation)} per month
Books: ${formatCurrency(universityInfo.books)} per semester
Other: ${formatCurrency(universityInfo.other)} per month

Income Sources:
-------------
Part-Time Job: ${formatCurrency(incomeInfo.partTimeJob)} per month
Scholarships: ${formatCurrency(incomeInfo.scholarships)} per year
Bursaries: ${formatCurrency(incomeInfo.bursaries)} per year
RESP: ${formatCurrency(incomeInfo.RESP)} total
Parental Support: ${formatCurrency(incomeInfo.parentalSupport)} per month
Other Income: ${formatCurrency(incomeInfo.otherIncome)} per month

OSAP Information:
---------------
OSAP Grant: ${formatCurrency(osapInfo.osapGrant)} per year
OSAP Loan: ${formatCurrency(osapInfo.osapLoan)} per year
Total OSAP Aid: ${formatCurrency(osapInfo.totalOsapAid)} per year
OSAP Loan Remaining: ${formatCurrency(osapInfo.osapLoanRemaining)}

Assets and Debts:
---------------
Savings Account: ${formatCurrency(assetsInfo.savingsAccount)}
Savings Account Interest: ${assetsInfo.savingsAccountInterest.toLocaleString() + "%"}
Credit Card Debt: ${formatCurrency(assetsInfo.creditCardDebt)}
Other Debt: ${formatCurrency(assetsInfo.otherDebt)} (${assetsInfo.otherDebtInterest}% interest)
`;

    // Add information about recent events if available
    if (Object.keys(monthlySummary).length > 0) {
      context += `
Recent Financial Activities:
--------------------------
`;
      for (const [key, value] of Object.entries(monthlySummary)) {
        context += `${key}: ${formatCurrency(value as number)}\n`;
      }
    }

    return context;
  };

  // Function to calculate monthly interest
  const calculateMonthlyInterest = (
    principle: number,
    interestRate: number,
    compoundsPerYear: number
  ): number => {
    // Convert annual interest rate to decimal (e.g., 5% -> 0.05)
    const rateDecimal = interestRate / 100;

    // Calculate the interest for one compounding period
    const interestPerPeriod = principle * (rateDecimal / compoundsPerYear);

    // For monthly interest, we need to adjust based on compounding frequency
    // If compounding monthly, return as is
    // If compounding quarterly, return 1/3 of quarterly interest, etc.
    const monthsPerCompoundingPeriod = 12 / compoundsPerYear;
    const monthlyInterest = interestPerPeriod / monthsPerCompoundingPeriod;

    return monthlyInterest;
  };

  // Function to calculate the final simulation score
  const calculateEndingScore = (): number => {
    // Calculate current net worth
    const currentNetWorth =
      assetsInfo.savingsAccount -
      assetsInfo.creditCardDebt -
      assetsInfo.otherDebt -
      osapInfo.osapLoanRemaining;

    // Calculate net worth change (as a percentage of initial net worth)
    const netWorthChange = initialValues.netWorth !== 0
      ? (currentNetWorth - initialValues.netWorth) / Math.abs(initialValues.netWorth)
      : currentNetWorth > 0 ? 1 : -1;

    // Calculate debt ratio (total debt / net worth)
    // Lower is better, capped at 2 for scoring purposes
    const totalDebt = assetsInfo.creditCardDebt + assetsInfo.otherDebt + osapInfo.osapLoanRemaining;
    const debtRatio = currentNetWorth > 0
      ? Math.min(totalDebt / Math.max(currentNetWorth, 1), 2)
      : 2;

    // Calculate OSAP repayment progress
    // What percentage of initial OSAP has been repaid
    const initialOsapLoan = initialValues.osap.osapLoanRemaining;
    const osapRepaymentRatio = initialOsapLoan > 0
      ? (initialOsapLoan - osapInfo.osapLoanRemaining) / initialOsapLoan
      : 1;

    // Calculate simulation length factor
    // Longer simulations should get higher scores, but with diminishing returns
    const monthsFactor = Math.min(simulationMonth / 48, 1); // Cap at 4 years

    // Calculate credit card debt penalty
    // Having credit card debt is particularly bad due to high interest
    const creditCardPenalty = assetsInfo.creditCardDebt > 0
      ? Math.min(assetsInfo.creditCardDebt / 5000, 1) * -20
      : 0;

    // Calculate savings bonus
    // Reward having emergency savings
    const savingsBonus = assetsInfo.savingsAccount > 0
      ? Math.min(assetsInfo.savingsAccount / 10000, 1) * 15
      : 0;

    // Base score components
    const netWorthScore = netWorthChange * 40; // -40 to +40 points
    const debtScore = (1 - debtRatio / 2) * 20; // 0 to 20 points
    const osapScore = osapRepaymentRatio * 15; // 0 to 15 points
    const timeScore = monthsFactor * 10; // 0 to 10 points

    // Calculate final score (can be negative in worst cases)
    let finalScore = netWorthScore + debtScore + osapScore + timeScore + creditCardPenalty + savingsBonus;

    // Ensure score is at least 0
    finalScore = Math.max(0, finalScore);

    // Cap score at 100
    finalScore = Math.min(100, finalScore);

    return Math.round(finalScore);
  };

  return (
    <div className="container mx-auto mt-4 mb-4 px-4">
      {!simulationStarted &&
        <Dialog open={dialogOpen} onOpenChange={() => {
          setDialogStep(1);
          setDialogOpen(!dialogOpen);
        }}>
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
          <div className="flex justify-center mt-8 gap-4">
            <Button className="bg-blue-200 text-black px-4 py-2 rounded-md hover:bg-blue-300" onClick={() => setDialogOpen(true)}>Edit Simulation Information</Button>
            <Button className="bg-green-200 text-black px-4 py-2 rounded-md hover:bg-green-300" onClick={() => startSimulation()}>Start Simulation</Button>
          </div>
        }
        {simulationStarted &&
          <div className="flex justify-between items-center">
            <div className='text-lg font-bold'>Current Month: {MONTH_MAP[(simulationMonth + 8) % 12 as keyof typeof MONTH_MAP]}</div>
            <div className="flex justify-end mt-8 gap-4">
              <Button
                className="bg-blue-200 text-black px-4 py-2 rounded-md hover:bg-blue-300"
                onClick={handleEndSimulation}>End Simulation</Button>
              <Button
                className="bg-purple-200 text-black px-4 py-2 rounded-md hover:bg-purple-300"
                onClick={() => setMonthlySummaryDialogOpen(true)}>View Month Summary</Button>
              <Button
                className="bg-yellow-200 text-black px-4 py-2 rounded-md hover:bg-yellow-300"
                onClick={() => { setLifeStyleUpdateDialogOpen(true) }}>Lifestyle Update</Button>
              <Button
                className="bg-green-200 text-black px-4 py-2 rounded-md hover:bg-green-300"
                onClick={() => { advanceMonth() }}>Next Month</Button>
            </div>
          </div>
        }
        {simulationStarted &&
          <>
            <MonthlySummaryDialog
              open={monthlySummaryDialogOpen}
              onOpenChange={setMonthlySummaryDialogOpen}
              monthlySummary={monthlySummary}
              month={MONTH_MAP[(simulationMonth + 8) % 12 as keyof typeof MONTH_MAP]}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Use all the extracted card components */}
        <UniversityExpensesCard universityInfo={universityInfo} />
        <IncomeSourcesCard incomeInfo={incomeInfo} />
        <OsapInformationCard osapInfo={osapInfo} />
        <AssetsDebtsCard assetsInfo={assetsInfo} />
      </div>

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

      {/* Random Event Dialog */}
      {currentRandomEvent && (
        <RandomEventDialog
          open={randomEventDialogOpen}
          onOpenChange={(open) => {
            setRandomEventDialogOpen(open);
            if (!open && currentRandomEvent) {
              // Apply the event when dialog is closed
              applyRandomEvent(currentRandomEvent);

              if (assetsInfo.savingsAccount < 0) {
                setNegativeBalance(true);
                setNegativeBalanceDialogOpen(true);
              }
              else {
                setMonthlySummaryDialogOpen(true);
              }
            }
          }}
          event={currentRandomEvent}
        />
      )}

      {/* End Simulation Dialog */}
      <EndSimulationDialog
        open={endSimulationDialogOpen}
        onOpenChange={setEndSimulationDialogOpen}
        simulationMonth={simulationMonth}
        netWorthChange={calculateNetWorthChange()}
        initialNetWorth={initialValues.netWorth}
        finalScore={calculateEndingScore()}
        onContinue={() => setEndSimulationDialogOpen(false)}
        onEnd={confirmEndSimulation}
      />

      {/* Leaderboard Dialog - only shown after 12+ months */}
      <LeaderboardDialog
        open={leaderboardDialogOpen}
        onOpenChange={(open) => {
          setLeaderboardDialogOpen(open);
          if (!open) {
            router.push('/');
          }
        }}
        leaderboard={leaderboard}
        yourScore={calculateEndingScore()}
      />

      <SimulationChat context={getContext()} />
    </div>
  );
};

export default FinancialSimulation;
