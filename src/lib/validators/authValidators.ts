import { check } from "express-validator";
import { isRequired, shortStringValidation } from "./commonValidators";

// Reusable validation functions
const isEmailValid = check("email")
  .isEmail()
  .withMessage("Invalid email address");

export const isPasswordValid = (name: string) =>
  check(name)
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 6 and 16 characters long");

// Register Validation
export const registerValidation = [
  isRequired("fullName"),
  shortStringValidation("fullName").trim(),
  isRequired("email"),
  isEmailValid,
  isRequired("password"),
  isPasswordValid("password"),
];

// Login Validation
export const loginValidation = [
  isRequired("email"),
  isEmailValid,
  isRequired("password"),
];
