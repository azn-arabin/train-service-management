import { Schema, model, Document } from "mongoose";

export interface ITrain extends Document {
  name: string;
  stops: Array<{
    station: Schema.Types.ObjectId;
    arrivalTime: String;
    departureTime: String;
  }>;
}

const trainSchema = new Schema<ITrain>({
  name: { type: String, required: true, unique: true },
  stops: [
    {
      station: { type: Schema.Types.ObjectId, ref: "Station", required: true },
      arrivalTime: { type: String, required: true },
      departureTime: { type: String, required: true },
    },
  ],
});

export const Train = model<ITrain>("Train", trainSchema);
