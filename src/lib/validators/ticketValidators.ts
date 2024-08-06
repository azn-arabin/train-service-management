import { isRequired } from "./commonValidators";
import moment from "moment";

export const ticketValidation = [
  isRequired("train").isMongoId().withMessage("Train must be a valid ObjectId"),
  isRequired("from")
    .isMongoId()
    .withMessage("From station must be a valid ObjectId"),
  isRequired("to")
    .isMongoId()
    .withMessage("To station must be a valid ObjectId"),
  isRequired("journeyDate")
    .isLength({ min: 10, max: 10 })
    .matches(/^\d{2}-\d{2}-\d{4}$/)
    .withMessage("Journey date must be in this format DD-MM-YYYY")
    .custom((value) => {
      const inputDate = moment(value, "DD-MM-YYYY");
      if (!inputDate.isValid()) {
        throw new Error("Journey date must be a valid date");
      }
      if (inputDate.isBefore(moment(), "day")) {
        throw new Error("Journey date cannot be in the past");
      }
      return true;
    }),
];
