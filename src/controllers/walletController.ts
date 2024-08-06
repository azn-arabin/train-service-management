import { Response } from "express";
import { ITransaction, Wallet } from "../models/Wallet";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../lib/helpers/responseHelper";
import { AuthenticatedRequest } from "../lib/types/types";

export const getWallet = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user.userId }).populate(
      "transactions",
    );

    sendSuccessResponse({
      res,
      data: {
        wallet,
      },
    });
  } catch (error) {
    sendFailureResponse({ res });
  }
};

export const addFunds = async (req: AuthenticatedRequest, res: Response) => {
  const { amount } = req.body;

  try {
    let wallet = await Wallet.findOne({ user: req.user.userId });
    if (!wallet) {
      wallet = new Wallet({ balance: amount, user: req.user.userId });
      wallet.transactions.push({ type: "credit", amount } as ITransaction);
      await wallet.save();

      return sendSuccessResponse({
        res,
        data: {
          wallet,
        },
      });
    }

    wallet.balance += amount;
    wallet.transactions.push({ type: "credit", amount } as ITransaction);
    await wallet.save();
    sendSuccessResponse({
      res,
      data: {
        wallet,
      },
    });
  } catch (error) {
    console.log(error);
    sendFailureResponse({ res });
  }
};
