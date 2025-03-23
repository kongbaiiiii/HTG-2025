import Image from "next/image";
import { DollarSign, ChartCandlestick, CreditCard, Aperture } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex flex-col gap-12 items-center text-center container mx-auto px-4 py-12">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white">
            Your Financial Future <span className="text-blue-600 dark:text-blue-400">Starts Here</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Learn essential money skills that school doesn't teach you. Build financial confidence for life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-8">
          {/* Feature Card 1 */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
              <DollarSign className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Budgeting Basics</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Learn how to track expenses and save for your goals.
            </p>
          </div>
          
          {/* Feature Card 2 */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mb-4">
              <ChartCandlestick className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Investing 101</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Discover how to grow your money for the future.
            </p>
          </div>
          
          {/* Feature Card 3 */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-4">
              <CreditCard className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Credit & Debt</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Understand credit scores and manage debt responsibly.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center mt-8 w-full max-w-md mx-auto">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white gap-2 font-medium text-sm sm:text-base h-12 px-6 w-full"
            href="#"
          >
            Start Learning
          </a>
          <a
            className="rounded-full border border-solid border-blue-600 dark:border-blue-400 transition-colors flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base h-12 px-6 w-full"
            href="/simulation"
          >
            Begin Simulation
          </a>
        </div>
      </main>
    </div>
  );
}
