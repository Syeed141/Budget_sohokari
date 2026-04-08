const namePattern = /^[\p{L}\s]+$/u;

export function validatePersonName(name: unknown): {
  valid: boolean;
  value: string;
  message?: string;
} {
  const value = typeof name === "string" ? name.trim() : "";

  if (!value) {
    return { valid: false, value, message: "Name is required" };
  }

  if (value.length < 2 || value.length > 60) {
    return {
      valid: false,
      value,
      message: "Name must be between 2 and 60 characters",
    };
  }

  if (!namePattern.test(value)) {
    return {
      valid: false,
      value,
      message: "Name must contain letters only",
    };
  }

  return { valid: true, value };
}
