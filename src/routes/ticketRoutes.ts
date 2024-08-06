import express from "express";
import * as TicketController from "../controllers/ticketController";
import { anyUserAuthorization } from "../middlewares/authorizationMiddleware";
import { ticketValidation } from "../lib/validators/ticketValidators";
import validatorMiddleware from "../middlewares/validationMiddleware";

const router = express.Router();

router.get("/", anyUserAuthorization, TicketController.getTickets as any);
router.post(
  "/",
  anyUserAuthorization,
  ticketValidation,
  validatorMiddleware,
  TicketController.purchaseTicket as any,
);

export default router;
