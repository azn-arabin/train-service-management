import { Schema, model, Document } from "mongoose";

export interface ITicket extends Document {
  user: Schema.Types.ObjectId;
  train: Schema.Types.ObjectId;
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
  fare: number;
  departureTime: string; // HH:mm format
  journeyDate: Date;
}

const ticketSchema = new Schema<ITicket>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  train: { type: Schema.Types.ObjectId, ref: "Train", required: true },
  from: { type: Schema.Types.ObjectId, ref: "Station", required: true },
  to: { type: Schema.Types.ObjectId, ref: "Station", required: true },
  fare: { type: Number, required: true },
  departureTime: { type: String, required: true }, // HH:mm format
  journeyDate: { type: Date, required: true },
});

export const Ticket = model<ITicket>("Ticket", ticketSchema);
