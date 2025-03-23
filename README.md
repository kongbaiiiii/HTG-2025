# SmartFinance

SmartFinance is a comprehensive financial literacy platform designed specifically for high school and university students in Ontario. The platform helps students build essential money management skills through interactive simulation, structured lessons, and AI-powered guidance.

## Features

### College Finance Simulator
- Practice real-world financial decision-making in a risk-free environment
- Simulate month-by-month financial scenarios over a school year
- Experience random financial events and make lifestyle adjustments
- Track savings, debt, and overall financial health
- Compete on a leaderboard to encourage engagement

### Financial Literacy Lessons
- Structured lessons on key financial topics:
  - Budgeting Basics
  - Investing 101
  - Understanding RESPs
  - Saving Smart
  - Debt Management
  - Financial Goal Setting

### Financial Literacy AI Assistant
- AI-powered chat assistant for personalized financial guidance
- Context-aware advice based on simulation results
- Just-in-time learning throughout the platform

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kongbaiiiii/HTG-2025
   cd HTG-2025
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, Prisma
- **Authentication**: Clerk
- **AI**: OpenAI API (GPT-4o-mini)

## Project Structure

- `/app` - Next.js app directory
  - `/api` - API routes
  - `/chat` - AI chat interface
  - `/lesson` - Financial literacy lessons
  - `/simulation` - College finance simulator
- `/components` - Reusable UI components
- `/prisma` - Database schema and migrations
- `/utils` - Utility functions and helpers

## Contributing

We welcome contributions to SmartFinance! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request
