import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import notFoundHandler from "./lib/helpers/notFoundHelper";
import errorHandler from "./lib/helpers/errorHandler";
import stationRoutes from "./routes/stationRoutes";
import fareRoutes from "./routes/fareRoutes";
import trainRoutes from "./routes/trainRoutes";
import walletRoutes from "./routes/walletRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import "./lib/config/cronJobs";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/station", stationRoutes);
app.use("/api/fare", fareRoutes);
app.use("/api/train", trainRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/ticket", ticketRoutes);

// not found handler
app.use(notFoundHandler);

// default error handle
app.use(errorHandler);

export default app;
