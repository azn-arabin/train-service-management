import express from "express";
import * as AuthValidator from "../lib/validators/authValidators";
import * as AuthController from "../controllers/authController";
import validatorMiddleware from "../middlewares/validationMiddleware";

const router = express.Router();

router.post(
  "/register",
  AuthValidator.registerValidation,
  validatorMiddleware,
  AuthController.register,
);

router.post(
  "/login",
  AuthValidator.loginValidation,
  validatorMiddleware,
  AuthController.login,
);

export default router;
