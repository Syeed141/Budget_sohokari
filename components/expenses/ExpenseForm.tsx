"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

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
};

const defaultFormData: ExpenseFormData = {
  title: "",
  amount: "",
  category: "",
  note: "",
  date: "",
  isFixed: false,
};

const categoryOptions = [
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
];

export default function ExpenseForm({
  initialData,
  isEditing = false,
  onSubmit,
  onCancelEdit,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>(
    initialData || defaultFormData
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(initialData || defaultFormData);
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
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-0">
        <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-5 sm:px-8">
          <h2 className="text-xl font-semibold text-slate-900">
            {isEditing ? "Edit Expense" : "Add Expense"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {isEditing
              ? "Update your saved expense details."
              : "Record a daily or fixed cost in a clean, structured way."}
          </p>
        </div>

        <form className="space-y-6 px-6 py-6 sm:px-8" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Title"
              name="title"
              placeholder="Lunch"
              value={formData.title}
              onChange={handleChange}
            />

            <Input
              label="Amount"
              name="amount"
              type="number"
              placeholder="120"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-slate-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option value="">Select</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Note"
            name="note"
            placeholder="Office lunch"
            value={formData.note}
            onChange={handleChange}
          />

          <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300 hover:bg-slate-100/70">
            <input
              type="checkbox"
              name="isFixed"
              checked={formData.isFixed}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300"
            />

            <div>
              <p className="text-sm font-medium text-slate-800">
                Fixed monthly expense
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Use this for recurring costs like rent, internet, or utility
                bills.
              </p>
            </div>
          </label>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button className="flex-1" size="lg" disabled={isSubmitting}>
              {isSubmitting
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
                className="sm:min-w-[140px]"
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