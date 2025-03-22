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

// Custom hook to prevent scroll locking
function usePreventScrollLock() {
  useEffect(() => {
    const restoreStyles = () => {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
      
      if (window.matchMedia('(min-width: 640px)').matches) {
        document.body.style.paddingLeft = '5rem';
        document.body.style.paddingRight = '5rem';
      } else {
        document.body.style.paddingLeft = '2rem';
        document.body.style.paddingRight = '2rem';
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          restoreStyles();
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    restoreStyles();

    return () => {
      observer.disconnect();
    };
  }, []);
}

const FinancialSimulation = () => {
  // Game state
  const [money, setMoney] = useState(1000);
  const [day, setDay] = useState(1);
  const [happiness, setHappiness] = useState(80);
  const [skills, setSkills] = useState(10);
  
  // Add state for dialog
  const [dialogOpen, setDialogOpen] = useState(true);
  
  // Use the custom hook
  usePreventScrollLock();
  
  // Investment options (placeholder data)
  const investments = [
    { id: 1, name: "Tech Stocks", risk: "High", returnRate: "8-15%", minInvestment: 500 },
    { id: 2, name: "Savings Account", risk: "Low", returnRate: "1-2%", minInvestment: 100 },
    { id: 3, name: "Crypto", risk: "Very High", returnRate: "-20% to +40%", minInvestment: 200 },
    { id: 4, name: "Real Estate", risk: "Medium", returnRate: "4-7%", minInvestment: 1000 },
  ];

  // Career options
  const careers = [
    { id: 1, name: "Software Developer", salary: 100, skillsRequired: 20 },
    { id: 2, name: "Financial Analyst", salary: 90, skillsRequired: 25 },
    { id: 3, name: "Entrepreneur", salary: "Variable", skillsRequired: 30 },
  ];

  // Advance to next day
  const advanceDay = () => {
    setDay(day + 1);
    // Here you would calculate investment returns, salary, etc.
    // For now just add a placeholder amount
    setMoney(money + 50);
    setHappiness(Math.max(0, Math.min(100, happiness - 5 + Math.random() * 10)));
  };

  // Learn new skills
  const learnSkills = () => {
    setSkills(skills + 5);
    setMoney(money - 100);
    setHappiness(happiness - 10);
  };

  return (
    <div className="container mx-auto mt-4 mb-4 px-4">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">Open Dialog</button>
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
      
      {/* Player Stats */}
      <div className="p-4 mb-6 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <span className="mr-2 text-green-600">💵</span>
            <h2 className="text-xl">Cash: ${money.toLocaleString()}</h2>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-blue-600">📈</span>
            <h2 className="text-xl">Day: {day}</h2>
          </div>
          <div>
            <p className="text-sm font-medium">Happiness</p>
            <div className="flex items-center">
              <span className="mr-2">😢</span>
              <div className="w-4/5 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${happiness}%` }}
                ></div>
              </div>
              <span className="ml-2">😄</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Skills: {skills}</p>
            <div className="w-4/5 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${skills}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Game Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Investments Section */}
        <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-green-50 to-green-100">
          <h2 className="text-xl mb-4 flex items-center">
            <span className="mr-2">🎲</span> Investments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {investments.map((investment) => (
              <div key={investment.id} className="border border-gray-200 rounded-md p-3">
                <h3 className="text-lg text-blue-600">{investment.name}</h3>
                <p className="text-sm">Risk: {investment.risk}</p>
                <p className="text-sm">Return: {investment.returnRate}</p>
                <p className="text-sm">Min: ${investment.minInvestment}</p>
                <button 
                  className={`mt-2 px-3 py-1 rounded-md text-white ${
                    money < investment.minInvestment 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  disabled={money < investment.minInvestment}
                >
                  Invest
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Career Section */}
        <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-orange-50 to-orange-100">
          <h2 className="text-xl mb-4 flex items-center">
            <span className="mr-2">💼</span> Career
          </h2>
          <div className="space-y-4">
            {careers.map((career) => (
              <div key={career.id} className="border border-gray-200 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg text-blue-600">{career.name}</h3>
                    <p className="text-sm">Salary: ${career.salary}/day</p>
                    <p className="text-sm">Skills Required: {career.skillsRequired}</p>
                  </div>
                  <button 
                    className={`px-3 py-1 rounded-md text-white ${
                      skills < career.skillsRequired 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={skills < career.skillsRequired}
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
            <div className="border border-gray-200 rounded-md p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg text-blue-600">Learn New Skills ($100)</h3>
                </div>
                <button 
                  className={`px-3 py-1 rounded-md text-white ${
                    money < 100 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  disabled={money < 100}
                  onClick={learnSkills}
                >
                  Learn
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Random Events Section */}
        <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-purple-50 to-purple-100">
          <h2 className="text-xl mb-4">Recent Events</h2>
          <p className="text-base font-italic">
            No recent events. Play more days to experience random financial events!
          </p>
        </div>
        
        {/* Game Controls */}
        <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-pink-50 to-pink-100">
          <div className="flex justify-center mt-4">
            <button 
              className={`px-4 py-2 rounded-full text-white ${
                money < 1000 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-pink-600 hover:bg-pink-700'
              }`}
              disabled={money < 1000}
              onClick={advanceDay}
            >
              Advance to Next Day
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSimulation;
