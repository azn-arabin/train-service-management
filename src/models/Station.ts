import { Schema, model, Document } from "mongoose";

interface IStation extends Document {
  name: string;
  location: string;
}

const stationSchema = new Schema<IStation>({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
});

export const Station = model<IStation>("Station", stationSchema);
