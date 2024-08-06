import express from "express";
import * as FareController from "../controllers/fareController";
import { fareValidation, isFareValid } from "../lib/validators/fareValidators";
import { adminOnlyAuthorization } from "../middlewares/authorizationMiddleware";
import validatorMiddleware from "../middlewares/validationMiddleware";
import { idValidation } from "../lib/validators/commonValidators";

const router = express.Router();

router.get("/", FareController.getFares);
router.post(
  "/",
  adminOnlyAuthorization,
  fareValidation,
  validatorMiddleware,
  FareController.addFare,
);

router.put(
  "/:id",
  adminOnlyAuthorization,
  [...idValidation, isFareValid],
  validatorMiddleware,
  FareController.updateFare,
);

router.delete(
  "/:id",
  adminOnlyAuthorization,
  idValidation,
  validatorMiddleware,
  FareController.deleteFare,
);

export default router;
