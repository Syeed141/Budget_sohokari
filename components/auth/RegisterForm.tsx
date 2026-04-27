"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import {
  validatePersonName,
  validateProfileFields,
} from "@/components/lib/user-validation";

export default function RegisterForm() {
  const router = useRouter();
  const { pushToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "Dhaka",
    profession: "",
    monthlyIncome: "",
    monthlySavingsGoal: "",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<
      Record<
        | "name"
        | "city"
        | "profession"
        | "monthlyIncome"
        | "monthlySavingsGoal",
        string
      >
    >
  >({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name in fieldErrors) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFieldErrors({});
    setSuccess("");

    const validatedName = validatePersonName(formData.name);
    if (!validatedName.valid) {
      setFieldErrors({ name: validatedName.message || "Invalid name" });
      return;
    }

    const validatedProfile = validateProfileFields({
      city: formData.city,
      profession: formData.profession,
      monthlyIncome: formData.monthlyIncome,
      monthlySavingsGoal: formData.monthlySavingsGoal,
    });

    if (!validatedProfile.valid) {
      const message = validatedProfile.message || "Invalid profile information";

      if (message.toLowerCase().includes("city")) {
        setFieldErrors({ city: message });
      } else if (message.toLowerCase().includes("profession")) {
        setFieldErrors({ profession: message });
      } else if (message.toLowerCase().includes("monthly income")) {
        setFieldErrors({ monthlyIncome: message });
      } else if (message.toLowerCase().includes("savings goal")) {
        setFieldErrors({ monthlySavingsGoal: message });
      } else {
        setError(message);
      }

      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          name: validatedName.value,
          city: validatedProfile.value.city,
          profession: validatedProfile.value.profession,
          monthlyIncome: validatedProfile.value.monthlyIncome,
          monthlySavingsGoal: validatedProfile.value.monthlySavingsGoal,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const message = result.message || "Registration failed";
        setError(message);
        return;
      }

      setSuccess("Account created successfully. Redirecting...");
      pushToast("Account created successfully", "success");
      router.push("/dashboard");
      router.refresh();
    } catch {
      const message = "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        label="Full Name"
        name="name"
        type="text"
        placeholder="Your full name"
        value={formData.name}
        onChange={handleChange}
        required
        className={fieldErrors.name ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
        helperText={fieldErrors.name || "Letters and spaces only."}
      />

      <Input
        label="Profession"
        name="profession"
        type="text"
        placeholder="Junior Executive"
        value={formData.profession}
        onChange={handleChange}
        required
        className={fieldErrors.profession ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
        helperText={fieldErrors.profession}
      />

      <Input
        label="City"
        name="city"
        type="text"
        placeholder="Dhaka"
        value={formData.city}
        onChange={handleChange}
        required
        className={fieldErrors.city ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
        helperText={fieldErrors.city}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Minimum 8 characters"
        helperText="Use at least 8 characters."
        value={formData.password}
        onChange={handleChange}
      />

      <Input
        label="Monthly Income"
        name="monthlyIncome"
        type="number"
        placeholder="25000"
        value={formData.monthlyIncome}
        onChange={handleChange}
        required
        className={fieldErrors.monthlyIncome ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
        helperText={fieldErrors.monthlyIncome}
      />

      <Input
        label="Savings Goal"
        name="monthlySavingsGoal"
        type="number"
        placeholder="5000"
        value={formData.monthlySavingsGoal}
        onChange={handleChange}
        required
        className={fieldErrors.monthlySavingsGoal ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
        helperText={fieldErrors.monthlySavingsGoal}
      />

      {error ? (
        <p className="typewriter-alert rounded-[2px] px-4 py-3 text-sm">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="typewriter-status rounded-[2px] px-4 py-3 text-sm">
          {success}
        </p>
      ) : null}

      <Button className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
