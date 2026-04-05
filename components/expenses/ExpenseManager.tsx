"use client";

import { useEffect, useState } from "react";
import ExpenseForm, { ExpenseFormData } from "@/components/expenses/ExpenseForm";
import ExpenseList, { ExpenseItem } from "@/components/expenses/ExpenseList";

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: ExpenseItem[];
};

export default function ExpenseManager() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchExpenses() {
    try {
      setError("");

      const response = await fetch("/api/expenses");
      const result: ApiResponse = await response.json();

      if (!response.ok) {
        setError(result.message || "Failed to fetch expenses");
        return;
      }

      setExpenses(result.data || []);
    } catch {
      setError("Something went wrong while fetching expenses");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function handleCreateExpense(formData: ExpenseFormData) {
    setError("");

    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.title,
        amount: Number(formData.amount),
        category: formData.category,
        note: formData.note,
        date: formData.date,
        isFixed: formData.isFixed,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.message || "Failed to create expense");
      return;
    }

    await fetchExpenses();
  }

  async function handleUpdateExpense(formData: ExpenseFormData) {
    if (!editingExpense) return;

    setError("");

    const response = await fetch(`/api/expenses/${editingExpense._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.title,
        amount: Number(formData.amount),
        category: formData.category,
        note: formData.note,
        date: formData.date,
        isFixed: formData.isFixed,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.message || "Failed to update expense");
      return;
    }

    setEditingExpense(null);
    await fetchExpenses();
  }

  async function handleDeleteExpense(expenseId: string) {
    setError("");

    const response = await fetch(`/api/expenses/${expenseId}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.message || "Failed to delete expense");
      return;
    }

    if (editingExpense?._id === expenseId) {
      setEditingExpense(null);
    }

    await fetchExpenses();
  }

  function handleEdit(expense: ExpenseItem) {
    setEditingExpense(expense);
    setError("");
  }

  function handleCancelEdit() {
    setEditingExpense(null);
    setError("");
  }

  const formInitialData = editingExpense
    ? {
        title: editingExpense.title,
        amount: String(editingExpense.amount),
        category: editingExpense.category,
        note: editingExpense.note || "",
        date: editingExpense.date.slice(0, 10),
        isFixed: editingExpense.isFixed,
      }
    : undefined;

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="xl:col-span-1">
        <ExpenseForm
          initialData={formInitialData}
          isEditing={Boolean(editingExpense)}
          onSubmit={editingExpense ? handleUpdateExpense : handleCreateExpense}
          onCancelEdit={handleCancelEdit}
        />

        {error ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
      </div>

      <div className="xl:col-span-2">
        {isLoading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm text-slate-600">Loading expenses...</p>
          </div>
        ) : (
          <ExpenseList
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDeleteExpense}
          />
        )}
      </div>
    </div>
  );
}