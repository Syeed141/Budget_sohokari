# Budget Sohokari

Budget Sohokari is a full-stack personal budgeting application built for fresh graduates and early-career workers who need a practical way to track expenses, protect savings, and understand safe day-to-day spending.

The product focuses on clarity over complexity: users can log expenses, review monthly analytics, monitor savings progress, and export expense reports as PDF. Logged-out visitors can also explore realistic demo versions of the Dashboard and Expenses pages before creating an account.

## Why This Project Stands Out

- Built as a production-style Next.js 16 App Router application, not a static portfolio mockup.
- Includes authentication, protected routes, database-backed user data, analytics views, and PDF export.
- Designed around a real user problem: budgeting on an entry-level salary without using overly complex finance tools.
- Supports demo experiences for recruiters and first-time visitors, so key product value is visible without login friction.

## Core Features

- JWT-based authentication with session cookies
- Public demo Dashboard and Expenses experiences for logged-out users
- Expense creation, editing, deletion, and categorization
- Monthly analytics with category totals, day-by-day breakdowns, and budgeting insights
- Savings progress and safe daily spending guidance
- Profile-based budgeting inputs such as income and savings goal
- Downloadable PDF expense report
- Responsive landing page and app interface

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript
- Styling: Tailwind CSS 4
- Backend: Next.js Route Handlers
- Database: MongoDB with Mongoose
- Auth: JWT sessions stored in cookies
- Data Visualization: Recharts
- PDF Export: `@react-pdf/renderer`

## Product Preview

### Dashboard
- Monthly income, expenses, remaining balance, and safe daily spend
- Savings goal progress
- Category-level spending breakdown
- Recent expenses and monthly planning notes

### Expenses
- Structured expense entry form
- Expense table with edit and delete actions
- Monthly analytics summary
- Daily expense breakdown
- PDF report export

## Demo-Friendly UX

To make evaluation easier, the project includes guest-accessible previews:

- `/dashboard` shows a realistic demo account when no user is logged in
- `/expenses` shows sample transactions, analytics, and PDF export in read-only mode

This makes the project easier to review for recruiters, hiring managers, and collaborators without requiring account creation first.

## Architecture Notes

### App Router structure
The project uses the Next.js App Router with route-level pages and API handlers under `app/`.

### Auth model
- Session token is created with JWT
- Token is stored in an HTTP-only cookie
- Protected app areas are gated through `proxy.ts` and server-side session checks

### Data model
- `User` stores profile and budgeting context such as income and savings goal
- `Expense` stores categorized expense records for analytics and reporting

### Analytics flow
- Monthly expense analytics are aggregated from stored expense data
- Insights include top category, highest spending day, average spending day, and no-spend days
- Shared utility code is used to support both live user analytics and demo analytics

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` with:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## What I Focused On As An Engineer

- Building a product that communicates value immediately, even before login
- Keeping the UX simple for non-technical users with real budgeting anxiety
- Using reusable typed data flows for live and demo states
- Treating the project like a real application with server validation, auth checks, and export functionality

## Future Improvements

- OAuth-based social login
- Recurring expense automation
- Budget alerts and notifications
- Smarter AI-assisted financial coaching
- Test coverage for analytics and auth flows

## Recruiter Notes

If you are reviewing this project quickly, start here:

1. Visit `/` for the product positioning and preview flow
2. Visit `/dashboard` to see the guest demo dashboard
3. Visit `/expenses` to review analytics, transaction management UI, and PDF export

This project demonstrates full-stack product thinking, not just UI implementation.
