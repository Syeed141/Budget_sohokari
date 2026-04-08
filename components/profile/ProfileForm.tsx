"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useToast } from "@/components/ui/ToastProvider";
import { validatePersonName } from "@/components/lib/user-validation";

type ProfileFormProps = {
  initialData: {
    name: string;
    city: string;
    profession: string;
    monthlyIncome: number;
    monthlySavingsGoal: number;
  };
};

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const { pushToast } = useToast();

  const [formData, setFormData] = useState({
    name: initialData.name,
    city: initialData.city,
    profession: initialData.profession,
    monthlyIncome: String(initialData.monthlyIncome ?? 0),
    monthlySavingsGoal: String(initialData.monthlySavingsGoal ?? 0),
  });

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name" && nameError) {
      setNameError("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNameError("");
    setSuccess("");

    const validatedName = validatePersonName(formData.name);
    if (!validatedName.valid) {
      setNameError(validatedName.message || "Invalid name");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: validatedName.value,
          city: formData.city,
          profession: formData.profession,
          monthlyIncome: Number(formData.monthlyIncome),
          monthlySavingsGoal: Number(formData.monthlySavingsGoal),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const message = result.message || "Failed to update profile";
        setError(message);
        pushToast(message, "error");
        return;
      }

      setSuccess("Profile updated successfully");
      pushToast("Profile updated successfully", "success");
      router.refresh();
    } catch {
      const message = "Something went wrong while updating your profile";
      setError(message);
      pushToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="lg:col-span-2">
      <CardContent>
        <h2 className="text-lg font-semibold text-slate-900">
          Personal Information
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          These values directly shape your dashboard insights.
        </p>

        <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className={nameError ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
            helperText={nameError || "Letters and spaces only."}
          />

          <Input
            label="Profession"
            name="profession"
            placeholder="Junior Executive"
            value={formData.profession}
            onChange={handleChange}
          />

          <Input
            label="City"
            name="city"
            placeholder="Dhaka"
            value={formData.city}
            onChange={handleChange}
          />

          <Input
            label="Monthly Income"
            name="monthlyIncome"
            type="number"
            placeholder="25000"
            value={formData.monthlyIncome}
            onChange={handleChange}
          />

          <Input
            label="Savings Goal"
            name="monthlySavingsGoal"
            type="number"
            placeholder="5000"
            value={formData.monthlySavingsGoal}
            onChange={handleChange}
          />

          <div className="md:col-span-2 space-y-3">
            {error ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            {success ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </p>
            ) : null}

            <Button size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

