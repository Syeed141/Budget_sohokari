"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { validatePersonName } from "@/components/lib/user-validation";

export default function RegisterForm() {
  const router = useRouter();
  const { pushToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          name: validatedName.value,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const message = result.message || "Registration failed";
        setError(message);
        pushToast(message, "error");
        return;
      }

      setSuccess("Account created successfully. Redirecting...");
      pushToast("Account created successfully", "success");
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
        label="Full Name"
        name="name"
        type="text"
        placeholder="Your full name"
        value={formData.name}
        onChange={handleChange}
        required
        className={nameError ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
        helperText={nameError || "Letters and spaces only."}
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
