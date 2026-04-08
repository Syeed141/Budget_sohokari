export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Rent",
  "Internet",
  "Bills",
  "Shopping",
  "Health",
  "Education",
  "Entertainment",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export type ExpenseRecord = {
  _id: string;
  title: string;
  amount: number;
  category: string;
  note?: string;
  date: string;
  isFixed: boolean;
};

export type ExpenseItemDTO = {
  id: string;
  title: string;
  amount: number;
  category: string;
  note?: string;
  date: string;
  isFixed: boolean;
};

export type MonthlyChartRow = {
  day: string;
  total: number;
  [key: string]: string | number;
};

export type DailyExpenseGroup = {
  date: string;
  day: string;
  total: number;
  expenses: ExpenseItemDTO[];
};

export type CategoryTotal = {
  category: string;
  amount: number;
};

export type MonthlyInsight = {
  label: string;
  value: string;
  helperText?: string;
};

export type MonthlyExpenseAnalytics = {
  month: number;
  year: number;
  totalMonthlyExpense: number;
  categoryTotals: CategoryTotal[];
  chartData: MonthlyChartRow[];
  dailyGroups: DailyExpenseGroup[];
  insights: MonthlyInsight[];
};
