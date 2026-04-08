"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

export default function LoginForm() {
  const router = useRouter();
  const { pushToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        const message = result.message || "Login failed";
        setError(message);
        pushToast(message, "error");
        return;
      }

      setSuccess("Login successful. Redirecting...");
      pushToast("Login successful", "success");
      router.push("/dashboard");
      router.refresh();
    } catch {
      const message = "Something went wrong. Please try again.";
      setError(message);
      pushToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
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
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
      />

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

      <Button className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Logging In..." : "Login"}
      </Button>
    </form>
  );
}


