import { isRequired } from "./commonValidators";

export const isFareValid = isRequired("fare")
  .isInt({ min: 1, max: 1000000 })
  .withMessage("Fare must be a number between 1 and 1000000");

export const fareValidation = [
  isRequired("from").isMongoId().withMessage("Invalid from station Id"),
  isRequired("to").isMongoId().withMessage("Invalid to station Id"),
  isFareValid,
];
