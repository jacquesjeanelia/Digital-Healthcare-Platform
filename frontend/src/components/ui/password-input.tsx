import React, { useState, useEffect } from "react";
import { Input } from "./input";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  id?: string;
}

interface PasswordStrength {
  score: number;
  feedback: string;
}

const calculatePasswordStrength = (password: string): PasswordStrength => {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("Password should be at least 8 characters long");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Include at least one uppercase letter");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Include at least one lowercase letter");
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Include at least one number");
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Include at least one special character (!@#$%^&*(),.?\":{}|<>)");
  }

  return {
    score,
    feedback: feedback.join(". ")
  };
};

const getStrengthColor = (score: number): string => {
  switch (score) {
    case 0:
    case 1:
      return "bg-red-500";
    case 2:
    case 3:
      return "bg-yellow-500";
    case 4:
    case 5:
      return "bg-green-500";
    default:
      return "bg-gray-200";
  }
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  className = "",
  required = false,
  id = "password"
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<PasswordStrength>({ score: 0, feedback: "" });

  useEffect(() => {
    setStrength(calculatePasswordStrength(value));
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`pr-10 ${className}`}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      
      {value && (
        <div className="space-y-2">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${getStrengthColor(strength.score)}`}
              style={{ width: `${(strength.score / 5) * 100}%` }}
            />
          </div>
          {strength.feedback && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {strength.feedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
}; 