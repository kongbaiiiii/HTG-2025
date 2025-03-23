"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! What financial literacy question do you have?" }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const prompt = input
    const newMessages = [...messages, { role: "user", content: input.trim() }];
    setMessages(newMessages);
    setInput("");
    

    const res = await fetch("/api/llm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: prompt }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-white flex flex-col">
      <main className="flex flex-col container mx-auto px-4 py-12 w-full max-w-3xl">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8">
          Smart Finance Chat
        </h2>

        {/* Message area */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] text-sm whitespace-pre-wrap px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-100 dark:bg-blue-900 ml-auto text-right"
                  : "bg-slate-100 dark:bg-slate-700"
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="mt-6">
          <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 shadow-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent text-sm outline-none placeholder-slate-400 dark:placeholder-slate-500"
            />
            <button
              onClick={sendMessage}
              className="ml-4 text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
