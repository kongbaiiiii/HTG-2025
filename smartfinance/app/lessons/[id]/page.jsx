import ChatWidget from "@/components/ChatWidget";
import { Chat } from "openai/resources.mjs";

export default async function ArticlePage({ params }) {
    const res = await fetch(`http://localhost:3000/api/articles/${params.id}`);
    if (!res.ok) return <div className="text-center py-12">Article not found.</div>;
  
    const article = await res.json();
  
    return (
      <main>
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Title & Subtitle */}
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">{article.title}</h1>
        {article.subtitle && (
          <p className="text-lg text-slate-500 dark:text-slate-300 mb-8">{article.subtitle}</p>
        )}
  
        {/* Article Content */}
        <div className="space-y-6">
          {article.content.map((block, idx) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <p key={idx} className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                    {block.data}
                  </p>
                );
  
              case "subtopic":
                return (
                  <h2
                    key={idx}
                    className="text-xl font-semibold text-blue-600 dark:text-blue-400 mt-6"
                  >
                    {block.data}
                  </h2>
                );
  
              case "image":
                return (
                  <img
                    key={idx}
                    src={block.data}
                    alt="Article visual"
                    className="w-full rounded-xl shadow-md"
                  />
                );
  
              case "imageLabel":
                return (
                  <p
                    key={idx}
                    className="text-sm italic text-center text-slate-500 dark:text-slate-400"
                  >
                    {block.data}
                  </p>
                );
  
              case "bulletList":
                return (
                  <ul
                    key={idx}
                    className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-200"
                  >
                    {block.data.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
  
              case "numberedList":
                return (
                  <ol
                    key={idx}
                    className="list-decimal pl-6 space-y-1 text-slate-700 dark:text-slate-200"
                  >
                    {block.data.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                );
  
              default:
                return null;
            }
          })}
        </div>
      </div>
      <ChatWidget />
      </main>
    );
  }
  