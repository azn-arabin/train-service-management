import { check, param } from "express-validator";

export const isRequired = (field: string) =>
  check(field).notEmpty().withMessage(`${field} is required`);

export const idValidation = [
  param("id").isMongoId().withMessage("The id you have provided is invalid"),
];

export const shortStringValidation = (field: string, min = 3, max = 50) =>
  check(field)
    .isLength({ min, max })
    .withMessage(`${field} must be between ${min} and ${max} characters long`)
    .isAlpha("en-US", { ignore: " ." })
    .withMessage(`${field} should only contain alphabets, spaces or dots(.)`);

export const lengthValidation = (field: string, min = 3, max = 80) =>
  check(field)
    .isLength({ min, max })
    .withMessage(`${field} must be between ${min} and ${max} characters long`);
