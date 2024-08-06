import express from "express";
import * as StationController from "../controllers/stationController";
import { stationValidation } from "../lib/validators/stationValidators";
import { adminOnlyAuthorization } from "../middlewares/authorizationMiddleware";
import validatorMiddleware from "../middlewares/validationMiddleware";
import { idValidation } from "../lib/validators/commonValidators";

const router = express.Router();

router.get("/", StationController.getStations);

router.post(
  "/",
  adminOnlyAuthorization,
  stationValidation,
  validatorMiddleware,
  StationController.createStation,
);

router.put(
  "/:id",
  adminOnlyAuthorization,
  [...idValidation, ...stationValidation],
  validatorMiddleware,
  StationController.updateStation,
);

router.delete(
  "/:id",
  adminOnlyAuthorization,
  idValidation,
  validatorMiddleware,
  StationController.deleteStation,
);

export default router;
