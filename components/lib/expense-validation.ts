import { EXPENSE_CATEGORIES, type ExpenseCategory } from "@/types/expense";

type ExpenseInput = {
  title?: unknown;
  amount?: unknown;
  category?: unknown;
  note?: unknown;
  date?: unknown;
  isFixed?: unknown;
};

export type ValidatedExpenseData = {
  title?: string;
  amount?: number;
  category?: ExpenseCategory;
  note?: string;
  date?: string;
  isFixed?: boolean;
};

const titleCharactersOnly = /^[\p{L}\s]+$/u;

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeCategory(value: string): ExpenseCategory | null {
  const match = EXPENSE_CATEGORIES.find(
    (category) => category.toLowerCase() === value.toLowerCase()
  );

  return match || null;
}

function isValidDateString(value: string): boolean {
  if (!value) return false;

  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}

export function validateExpenseInput(
  input: ExpenseInput,
  partial = false
): { data?: ValidatedExpenseData; message?: string } {
  const data: ValidatedExpenseData = {};

  if (!partial || input.title !== undefined) {
    const title = toTrimmedString(input.title);

    if (!title) {
      return { message: "Title is required" };
    }
    if (title.length < 2 || title.length > 80) {
      return { message: "Title must be between 2 and 80 characters" };
    }
    if (!titleCharactersOnly.test(title)) {
      return { message: "Title must contain letters only" };
    }

    data.title = title;
  }

  if (!partial || input.amount !== undefined) {
    if (input.amount === "" || input.amount === null) {
      return { message: "Amount is required" };
    }

    const parsedAmount = Number(input.amount);

    if (Number.isNaN(parsedAmount) || !Number.isFinite(parsedAmount)) {
      return { message: "Amount must be a valid number" };
    }
    if (parsedAmount <= 0) {
      return { message: "Amount must be greater than 0" };
    }

    data.amount = parsedAmount;
  }

  if (!partial || input.category !== undefined) {
    const rawCategory = toTrimmedString(input.category);
    const normalizedCategory = normalizeCategory(rawCategory);

    if (!normalizedCategory) {
      return { message: "Please select a valid category" };
    }

    data.category = normalizedCategory;
  }

  if (!partial || input.date !== undefined) {
    const date = toTrimmedString(input.date);

    if (!isValidDateString(date)) {
      return { message: "Please provide a valid date" };
    }

    data.date = date;
  }

  if (!partial || input.note !== undefined) {
    const note = toTrimmedString(input.note);

    if (note.length > 300) {
      return { message: "Note cannot exceed 300 characters" };
    }

    data.note = note;
  }

  if (!partial || input.isFixed !== undefined) {
    data.isFixed = Boolean(input.isFixed);
  }

  return { data };
}

export function validateExpenseFormFields(input: {
  title: string;
  amount: string;
  category: string;
  note: string;
  date: string;
}): Partial<Record<"title" | "amount" | "category" | "note" | "date", string>> {
  const fieldErrors: Partial<
    Record<"title" | "amount" | "category" | "note" | "date", string>
  > = {};

  const title = input.title.trim();
  if (!title) {
    fieldErrors.title = "Title is required";
  } else if (title.length < 2 || title.length > 80) {
    fieldErrors.title = "Title must be 2-80 characters";
  } else if (!titleCharactersOnly.test(title)) {
    fieldErrors.title = "Title must contain letters only";
  }

  const amountValue = input.amount.trim();
  const parsedAmount = Number(amountValue);
  if (!amountValue) {
    fieldErrors.amount = "Amount is required";
  } else if (Number.isNaN(parsedAmount) || !Number.isFinite(parsedAmount)) {
    fieldErrors.amount = "Amount must be a valid number";
  } else if (parsedAmount <= 0) {
    fieldErrors.amount = "Amount must be greater than 0";
  }

  const normalizedCategory = normalizeCategory(input.category.trim());
  if (!normalizedCategory) {
    fieldErrors.category = "Select a valid category";
  }

  if (!isValidDateString(input.date.trim())) {
    fieldErrors.date = "Please provide a valid date";
  }

  if (input.note.trim().length > 300) {
    fieldErrors.note = "Note cannot exceed 300 characters";
  }

  return fieldErrors;
}
