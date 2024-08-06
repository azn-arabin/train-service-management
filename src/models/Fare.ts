import { Schema, model, Document } from "mongoose";

export interface IFare extends Document {
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
  fare: number;
}

const fareSchema = new Schema<IFare>({
  from: { type: Schema.Types.ObjectId, ref: "Station", required: true },
  to: { type: Schema.Types.ObjectId, ref: "Station", required: true },
  fare: { type: Number, required: true },
});

export const Fare = model<IFare>("Fare", fareSchema);
