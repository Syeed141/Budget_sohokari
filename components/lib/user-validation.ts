const namePattern = /^[\p{L}\s]+$/u;
const cityPattern = /^[\p{L}\s.'-]+$/u;
const professionPattern = /^[\p{L}\d\s&/.,'()-]+$/u;

export type ValidatedProfileFields = {
  city: string;
  profession: string;
  monthlyIncome: number;
  monthlySavingsGoal: number;
};

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

export function validateCity(city: unknown): {
  valid: boolean;
  value: string;
  message?: string;
} {
  const value = typeof city === "string" ? city.trim() : "";

  if (!value) {
    return { valid: false, value, message: "City is required" };
  }

  if (value.length < 2 || value.length > 80) {
    return {
      valid: false,
      value,
      message: "City must be between 2 and 80 characters",
    };
  }

  if (!cityPattern.test(value)) {
    return {
      valid: false,
      value,
      message: "City contains invalid characters",
    };
  }

  return { valid: true, value };
}

export function validateProfession(profession: unknown): {
  valid: boolean;
  value: string;
  message?: string;
} {
  const value = typeof profession === "string" ? profession.trim() : "";

  if (!value) {
    return { valid: false, value, message: "Profession is required" };
  }

  if (value.length < 2 || value.length > 80) {
    return {
      valid: false,
      value,
      message: "Profession must be between 2 and 80 characters",
    };
  }

  if (!professionPattern.test(value)) {
    return {
      valid: false,
      value,
      message: "Profession contains invalid characters",
    };
  }

  return { valid: true, value };
}

export function validateNonNegativeNumber(
  value: unknown,
  fieldLabel: string
): {
  valid: boolean;
  value: number;
  message?: string;
} {
  const parsedValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value.trim())
        : Number.NaN;

  if (Number.isNaN(parsedValue) || !Number.isFinite(parsedValue)) {
    return {
      valid: false,
      value: 0,
      message: `${fieldLabel} must be a valid number`,
    };
  }

  if (parsedValue < 0) {
    return {
      valid: false,
      value: parsedValue,
      message: `${fieldLabel} must be a non-negative number`,
    };
  }

  return { valid: true, value: parsedValue };
}

export function validateProfileFields(input: {
  city: unknown;
  profession: unknown;
  monthlyIncome: unknown;
  monthlySavingsGoal: unknown;
}):
  | {
      valid: true;
      value: ValidatedProfileFields;
    }
  | {
      valid: false;
      value?: ValidatedProfileFields;
      message: string;
    } {
  const cityResult = validateCity(input.city);
  if (!cityResult.valid) {
    return {
      valid: false,
      message: cityResult.message || "City is required",
    };
  }

  const professionResult = validateProfession(input.profession);
  if (!professionResult.valid) {
    return {
      valid: false,
      message: professionResult.message || "Profession is required",
    };
  }

  const incomeResult = validateNonNegativeNumber(
    input.monthlyIncome,
    "Monthly income"
  );
  if (!incomeResult.valid) {
    return {
      valid: false,
      message: incomeResult.message || "Monthly income is invalid",
    };
  }

  const savingsGoalResult = validateNonNegativeNumber(
    input.monthlySavingsGoal,
    "Savings goal"
  );
  if (!savingsGoalResult.valid) {
    return {
      valid: false,
      message: savingsGoalResult.message || "Savings goal is invalid",
    };
  }

  if (savingsGoalResult.value > incomeResult.value) {
    return {
      valid: false,
      message: "Savings goal cannot be greater than monthly income",
    };
  }

  return {
    valid: true,
    value: {
      city: cityResult.value,
      profession: professionResult.value,
      monthlyIncome: incomeResult.value,
      monthlySavingsGoal: savingsGoalResult.value,
    },
  };
}
