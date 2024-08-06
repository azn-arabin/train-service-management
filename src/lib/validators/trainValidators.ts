import { body, check } from "express-validator";
import { isRequired, shortStringValidation } from "./commonValidators";

// Regular expression for HH:mm format
const timeFormatRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const trainValidation = [
  isRequired("name"),
  shortStringValidation("name", 3, 120).trim(),
  check("stops").isArray().withMessage("Stops must be an array"),
  check("stops")
    .isArray({ min: 1 })
    .withMessage("At least one stop is required"),
  body("stops.*.station")
    .notEmpty()
    .withMessage("Station id is required.")
    .isMongoId()
    .withMessage("Station must be a valid ObjectId"),
  body("stops.*.arrivalTime")
    .notEmpty()
    .withMessage("Arrival time id is required.")
    .matches(timeFormatRegex)
    .withMessage("Arrival time must be in HH:mm format"),
  body("stops.*.departureTime")
    .notEmpty()
    .withMessage("Departure time id is required.")
    .matches(timeFormatRegex)
    .withMessage("Departure time must be in HH:mm format"),
];
