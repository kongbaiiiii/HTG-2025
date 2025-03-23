import { auth } from "@clerk/nextjs/server";
import {
  DollarSign,
  BookOpen,
  MessageSquare,
} from "lucide-react";

export default async function HomePage() {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col gap-12 items-center text-center container mx-auto px-4 py-12">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white">
            Your Financial Future{" "}
            <span className="text-blue-600 dark:text-blue-400">Starts Here</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Learn essential money skills that school doesn't teach you. Build financial confidence for life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-8">
          {[
            {
              icon: <DollarSign className="text-blue-600 dark:text-blue-400" />,
              title: "College Finance Simulator",
              description: "Practice budgeting, making decisions, and navigating money choices as a student.",
              href: "/simulation",
              color: "blue",
            },
            {
              icon: <BookOpen className="text-green-600 dark:text-green-400" />,
              title: "Financial Literacy Lessons",
              description: "Learn core money skills like saving, investing, and managing debt — at your own pace.",
              href: "/lesson",
              color: "green",
            },
            {
              icon: <MessageSquare className="text-purple-600 dark:text-purple-400" />,
              title: "Financial Literacy AI",
              description: "Ask anything about personal finance and get instant help from our smart chat assistant.",
              href: "/chat",
              color: "purple",
            },
          ].map(({ icon, title, description, href, color }, index) => {
            const bgMap: Record<string, string> = {
              blue: "bg-blue-600 hover:bg-blue-700",
              green: "bg-green-600 hover:bg-green-700",
              purple: "bg-purple-600 hover:bg-purple-700",
            };

            const bgIconMap: Record<string, string> = {
              blue: "bg-blue-100 dark:bg-blue-900/30",
              green: "bg-green-100 dark:bg-green-900/30",
              purple: "bg-purple-100 dark:bg-purple-900/30",
            };

            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className={`${bgIconMap[color]} p-3 rounded-full w-fit mb-4`}>
                    {icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{description}</p>
                </div>
                <form action={isSignedIn ? href : undefined} method="get">
                  <button
                    type="submit"
                    disabled={!isSignedIn}
                    className={`mt-4 w-full rounded-full text-sm px-4 py-2 transition ${isSignedIn
                      ? `${bgMap[color]} text-white`
                      : "bg-gray-400 text-white cursor-not-allowed"
                      }`}
                  >
                    {isSignedIn ? "Go" : "Sign in to use"}
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
