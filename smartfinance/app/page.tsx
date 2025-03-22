import Image from "next/image";
import Navbar from "@/utils/navbar";
import { DollarSign, ChartCandlestick, CreditCard, Aperture } from 'lucide-react';
export default function Home() {


  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen pt-2 px-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col gap-[32px] items-center text-center max-w-4xl">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white">
            Your Financial Future <span className="text-blue-600 dark:text-blue-400">Starts Here</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            Learn essential money skills that school doesn't teach you. Build financial confidence for life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-8">
          {/* Feature Cards */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
              <DollarSign className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Budgeting Basics</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Learn how to track expenses and save for your goals.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mb-4">
              <ChartCandlestick className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Investing 101</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Discover how to grow your money for the future.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-4">
              <CreditCard className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Credit & Debt</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Understand credit scores and manage debt responsibly.</p>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white gap-2 font-medium text-sm sm:text-base h-12 px-6 w-full sm:w-auto"
            href="#"
          >
            Start Learning
          </a>
          <a
            className="rounded-full border border-solid border-blue-600 dark:border-blue-400 transition-colors flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base h-12 px-6 w-full sm:w-auto"
            href="#"
          >
            Take Assessment
          </a>
        </div>
      </main>
    </div>
  );
}
