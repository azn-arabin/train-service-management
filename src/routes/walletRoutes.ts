import express from "express";
import * as WalletsController from "../controllers/walletController";
import { anyUserAuthorization } from "../middlewares/authorizationMiddleware";
import { isRequired } from "../lib/validators/commonValidators";
import validatorMiddleware from "../middlewares/validationMiddleware";

const router = express.Router();

router.post(
  "/",
  anyUserAuthorization,
  [
    isRequired("amount")
      .isInt({ min: 10, max: 100000 })
      .withMessage("Amount must be integer between 10 and 100000"),
  ],
  validatorMiddleware,
  WalletsController.addFunds as any,
);

router.get("/", anyUserAuthorization, WalletsController.getWallet as any);

export default router;
