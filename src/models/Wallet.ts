import { Schema, model, Document } from "mongoose";

export interface ITransaction extends Document {
  type: "credit" | "debit";
  amount: number;
  date: Date;
}

interface IWallet extends Document {
  user: Schema.Types.ObjectId;
  balance: number;
  transactions: ITransaction[];
}

const transactionSchema = new Schema<ITransaction>({
  type: { type: String, enum: ["credit", "debit"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const walletSchema = new Schema<IWallet>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

export const Wallet = model<IWallet>("Wallet", walletSchema);
