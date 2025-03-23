import { PiggyBank, TrendingUp, BadgeDollarSign, Landmark,CreditCard,Target } from 'lucide-react';

const lessons = [
  {
    title: "Budgeting Basics",
    description: "Track your expenses, plan your savings, and stay in control of your money.",
    icon: <PiggyBank className="text-blue-600 dark:text-blue-400" />,
    href: "/lessons/1"
  },
  {
    title: "Investing 101",
    description: "Learn about stocks, bonds, ETFs, and how compound interest works for you.",
    icon: <TrendingUp className="text-green-600 dark:text-green-400" />,
    href: "/lessons/2"
  },
  {
    title: "Understanding RESPs",
    description: "Learn how Registered Education Savings Plans help you save for a child’s future education.",
    icon: <CreditCard className="text-purple-600 dark:text-purple-400" />,
    href: "/lessons/3"
  },
  {
    title: "Saving Smart",
    description: "Emergency funds, sinking funds, and short vs long-term savings goals.",
    icon: <Landmark className="text-orange-600 dark:text-orange-400" />,
    href: "/lessons/saving"
  },
  {
    title: "Debt Management",
    description: "Understand good vs. bad debt, repayment strategies, and how to stay debt-free.",
    icon: <BadgeDollarSign className="text-red-600 dark:text-red-400" />,
    href: "/lessons/debt"
  },
  {
    title: "Financial Goal Setting",
    description: "Learn how to set short-term and long-term goals, and create a realistic plan to reach them.",
    icon: <Target className="text-yellow-600 dark:text-yellow-400" />,
    href: "/lessons/goal"
  }  
];

export default function LessonsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <main className="flex flex-col gap-12 items-center text-center container mx-auto px-4 py-12"> */}
        {/* <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white">
            Financial Literacy <span className="text-blue-600 dark:text-blue-400">Lessons</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Master your money, one lesson at a time.
          </p>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
          {lessons.map((lesson, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-left flex flex-col justify-between"
            >
              <div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
                  {lesson.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">
                  {lesson.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  {lesson.description}
                </p>
              </div>
              <a
                href={lesson.href}
                className="mt-auto inline-block rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 transition-colors"
              >
                View Lesson
              </a>
            </div>
          ))}
        </div>
      {/* </main> */}
    </div>
  );
}
