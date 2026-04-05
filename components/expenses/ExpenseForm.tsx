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
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value, type, checked } = event.target;

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
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold text-slate-900">
          {isEditing ? "Edit Expense" : "Add Expense"}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {isEditing
            ? "Update your saved expense."
            : "Record a daily or fixed cost."}
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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

          <Input
            label="Category"
            name="category"
            placeholder="Food"
            value={formData.category}
            onChange={handleChange}
          />

          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />

          <Input
            label="Note"
            name="note"
            placeholder="Office lunch"
            value={formData.note}
            onChange={handleChange}
          />

          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <input
              type="checkbox"
              name="isFixed"
              checked={formData.isFixed}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300"
            />
            This is a fixed monthly expense
          </label>

          <div className="flex gap-3">
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