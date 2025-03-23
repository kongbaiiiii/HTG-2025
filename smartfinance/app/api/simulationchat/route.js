import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function POST(req) {
  try {
    // const { userPrompt } = await req.json();
    const body = await req.json();
    const message = body.message;
    const context = body.context;

    // console.log(message);

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "developer",
          content:
            "You are an expert in financing and debt management, one of your clients, a highschool student in Ontario Canada, have been through a financial simulation, and below I've attached the simulation summary. Try your best to answer your user's questions in only paragraph less than 100 words. State the assumptions that you've made" + context,
        },
        { role: "user", content: message },
      ],
    });

    const reply = chatCompletion.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        error: "Sorry, I couldn't fetch the respond at this moment. Please try again later.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
