import express from "express";
import * as TrainController from "../controllers/trainController";
import { adminOnlyAuthorization } from "../middlewares/authorizationMiddleware";
import { trainValidation } from "../lib/validators/trainValidators";
import validatorMiddleware from "../middlewares/validationMiddleware";
import { idValidation } from "../lib/validators/commonValidators";

const router = express.Router();

router.get("/", TrainController.getAllTrains);

router.get("/:id", idValidation, validatorMiddleware, TrainController.getTrain);

router.post(
  "/",
  adminOnlyAuthorization,
  trainValidation,
  validatorMiddleware,
  TrainController.addTrain,
);

router.put(
  "/:id",
  adminOnlyAuthorization,
  [...idValidation, ...trainValidation],
  validatorMiddleware,
  TrainController.updateTrain,
);

router.delete(
  "/:id",
  adminOnlyAuthorization,
  idValidation,
  validatorMiddleware,
  TrainController.deleteTrain,
);

export default router;
