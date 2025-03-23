"use client";

import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

export default function SimulationChat({ context: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", text: input };
        setMessages([...messages, userMsg]);
        setInput("");

        const res = await fetch("/api/simulationchat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input, context: context }),
        });

        const data = await res.json();
        const botMsg = { role: "bot", text: data.reply };
        setMessages((prev) => [...prev, botMsg]);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="w-80 bg-white dark:bg-slate-800 shadow-xl rounded-lg flex flex-col overflow-hidden border dark:border-slate-700">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
                        <span className="font-semibold">Chat with us</span>
                        <button onClick={() => setIsOpen(false)}>✖</button>
                    </div>

                    {/* Messages */}
                    <div
                        className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-sm"
                        style={{ maxHeight: "300px" }} // Add this line for fixed height
                    >
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`p-2 rounded-md max-w-[80%] ${
                                    msg.role === "user"
                                        ? "bg-blue-100 self-end text-right"
                                        : "bg-slate-200 self-start"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="flex items-center border-t dark:border-slate-700 p-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage()
                            }
                            className="flex-1 px-3 py-2 text-sm rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white outline-none"
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
                >
                    <MessageCircle />
                </button>
            )}
        </div>
    );
}
