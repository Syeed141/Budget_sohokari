export type ExpenseCategory =
  | "Food"
  | "Transport"
  | "Rent"
  | "Bills"
  | "Shopping"
  | "Health"
  | "Education"
  | "Entertainment"
  | "Other";

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

export type MonthlyExpenseAnalytics = {
  month: number;
  year: number;
  totalMonthlyExpense: number;
  categoryTotals: CategoryTotal[];
  chartData: MonthlyChartRow[];
  dailyGroups: DailyExpenseGroup[];
};