import { isRequired, shortStringValidation } from "./commonValidators";

export const stationValidation = [
  isRequired("name"),
  shortStringValidation("name", 3, 120).trim(),
  isRequired("location"),
  shortStringValidation("location", 3, 250).trim(),
];
