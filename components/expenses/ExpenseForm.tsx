"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { validateExpenseFormFields } from "@/components/lib/expense-validation";
import { EXPENSE_CATEGORIES } from "@/types/expense";

export type ExpenseFormData = {
  title: string;
  amount: string;
  category: string;
  note: string;
  date: string;
  isFixed: boolean;
};

type ExpenseFormProps = {
  initialData?: ExpenseFormData;
  isEditing?: boolean;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  onCancelEdit?: () => void;
  isDemo?: boolean;
};

const defaultFormData: ExpenseFormData = {
  title: "",
  amount: "",
  category: "",
  note: "",
  date: "",
  isFixed: false,
};

const categoryOptions = [...EXPENSE_CATEGORIES];

export default function ExpenseForm({
  initialData,
  isEditing = false,
  onSubmit,
  onCancelEdit,
  isDemo = false,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>(
    initialData || defaultFormData
  );
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"title" | "amount" | "category" | "note" | "date", string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(initialData || defaultFormData);
    setFieldErrors({});
  }, [initialData]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = event.target;
    const checked =
      event.target instanceof HTMLInputElement ? event.target.checked : false;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name in fieldErrors) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextFieldErrors = validateExpenseFormFields({
      title: formData.title,
      amount: formData.amount,
      category: formData.category,
      note: formData.note,
      date: formData.date,
    });

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await onSubmit(formData);

      if (!isEditing) {
        setFormData(defaultFormData);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="typewriter-grid border-b border-[color:var(--border-soft)] px-4 py-5 sm:px-8">
          <h2 className="typewriter-display text-xl text-[color:var(--foreground)]">
            {isEditing ? "Edit Expense" : "Add Expense"}
          </h2>
          <p className="mt-1 text-sm text-[color:var(--secondary)]">
            {isEditing
              ? "Update your saved expense details."
              : "Record a daily or fixed cost in a clean, structured way."}
          </p>
          {isDemo ? (
            <p className="mt-2 text-sm text-[color:var(--primary)]">
              Demo preview mode is read-only. Sign in to add or edit expenses.
            </p>
          ) : null}
        </div>

        <form className="space-y-6 px-4 py-6 sm:px-8" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Title"
              name="title"
              placeholder="Lunch"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={isDemo}
              className={fieldErrors.title ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
            />
            {fieldErrors.title ? (
              <p className="-mt-2 text-xs text-red-600 sm:col-span-2">{fieldErrors.title}</p>
            ) : null}

            <Input
              label="Amount"
              name="amount"
              type="number"
              placeholder="120"
              value={formData.amount}
              onChange={handleChange}
              required
              disabled={isDemo}
              min="0.01"
              step="0.01"
              className={fieldErrors.amount ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
            />
            {fieldErrors.amount ? (
              <p className="-mt-2 text-xs text-red-600 sm:col-span-2">{fieldErrors.amount}</p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="typewriter-label text-[color:var(--secondary)]"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={isDemo}
                className={`w-full min-w-0 rounded-none border bg-[rgba(245,234,200,0.92)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:ring-2 ${
                  fieldErrors.category
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-[color:var(--border-soft)] focus:border-[color:var(--primary)] focus:ring-[rgba(168,39,30,0.18)]"
                }`}
              >
                <option value="">Select</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {fieldErrors.category ? (
                <p className="text-xs text-red-600">{fieldErrors.category}</p>
              ) : null}
            </div>

            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={isDemo}
              className={fieldErrors.date ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
            />
            {fieldErrors.date ? (
              <p className="-mt-2 text-xs text-red-600 sm:col-span-2">{fieldErrors.date}</p>
            ) : null}
          </div>

          <Input
            label="Note"
            name="note"
            placeholder="Office lunch"
            value={formData.note}
            onChange={handleChange}
            disabled={isDemo}
            maxLength={300}
            className={fieldErrors.note ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
          />
          {fieldErrors.note ? (
            <p className="-mt-4 text-xs text-red-600">{fieldErrors.note}</p>
          ) : (
            <p className="-mt-4 text-xs text-[color:var(--secondary)]">
              Up to 300 characters.
            </p>
          )}

          <label className="typewriter-panel flex cursor-pointer items-start gap-4 rounded-[2px] px-4 py-4 transition hover:border-[color:var(--border)] hover:bg-[rgba(245,234,200,0.95)]">
            <input
              type="checkbox"
              name="isFixed"
              checked={formData.isFixed}
              onChange={handleChange}
              disabled={isDemo}
              className="mt-0.5 h-4 w-4 rounded-none border-[color:var(--border)] text-[color:var(--primary)] focus:ring-[rgba(168,39,30,0.18)]"
            />

            <div>
              <p className="text-sm font-medium text-[color:var(--foreground)]">
                Fixed monthly expense
              </p>
              <p className="mt-1 text-sm text-[color:var(--secondary)]">
                Use this for recurring costs like rent, internet, or utility
                bills.
              </p>
            </div>
          </label>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button className="flex-1" size="lg" disabled={isDemo || isSubmitting}>
              {isDemo
                ? "Login to save expenses"
                : isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Saving..."
                  : isEditing
                    ? "Update Expense"
                    : "Save Expense"}
            </Button>

            {isEditing && onCancelEdit ? (
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={onCancelEdit}
                className="w-full sm:min-w-[140px] sm:w-auto"
              >
                Cancel
              </Button>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
