import { Response } from "express";
import { Ticket } from "../models/Ticket";
import { Train } from "../models/Train";
import { Fare } from "../models/Fare";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../lib/helpers/responseHelper";
import { AuthenticatedRequest } from "../lib/types/types";
import { ITransaction, Wallet } from "../models/Wallet";
import moment from "moment";

export const purchaseTicket = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { train, from, to, journeyDate } = req.body;

  try {
    const trainDoc = await Train.findById(train).populate("stops");
    if (!trainDoc) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "Train not found",
      });
    }

    const fareInfo = await Fare.findOne({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    });
    if (!fareInfo) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "Fare information not found for the selected stations",
      });
    }

    const userWallet = await Wallet.findOne({ user: req.user.userId });
    if (!userWallet) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "User not found",
      });
    }

    if (userWallet.balance < fareInfo.fare) {
      return sendFailureResponse({
        res,
        statusCode: 400,
        message: "Insufficient balance in wallet",
      });
    }

    let fromStationIndex = -1;
    let toStationIndex = -1;

    let fromStopInfo: any;

    trainDoc.stops.forEach((stop, i) => {
      if (stop.station.toString() === from) {
        fromStopInfo = stop;
        fromStationIndex = i;
      } else if (stop.station.toString() === to) {
        toStationIndex = i;
      }
    });

    if (
      from === -1 ||
      toStationIndex === -1 ||
      fromStationIndex >= toStationIndex
    ) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "The train is not available for the selected stations",
      });
    }

    if (!fromStopInfo) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "Stop information not found for the selected station",
      });
    }

    // Check if the train has already departed on the given journey date
    const currentTime = moment();
    const journeyDateTime = moment(
      `${journeyDate} ${fromStopInfo.departureTime}`,
      "DD-MM-YYYY HH:mm",
    );
    if (journeyDateTime.isBefore(currentTime)) {
      return sendFailureResponse({
        res,
        statusCode: 400,
        message:
          "Cannot purchase a ticket for a train that has already departed",
      });
    }

    // Deduct fare from user's wallet
    userWallet.balance -= fareInfo.fare;
    userWallet.transactions.push({
      type: "credit",
      amount: fareInfo.fare,
    } as ITransaction);
    await userWallet.save();

    const ticket = new Ticket({
      user: req.user.userId,
      train,
      from,
      to,
      fare: fareInfo.fare,
      departureTime: fromStopInfo.departureTime,
      journeyDate: journeyDateTime.toDate(),
    });
    await ticket.save();

    // Populate the train, from, and to fields
    await ticket.populate("train from to");

    sendSuccessResponse({
      res,
      data: {
        ticket,
        departureTime: fromStopInfo.departureTime,
      },
    });
  } catch (error) {
    console.log(error);
    sendFailureResponse({ res });
  }
};

export const getTickets = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const tickets = await Ticket.find({ user: req.user.userId })
      .populate("train from to")
      .populate({
        path: "train",
        populate: {
          path: "stops.station",
        },
      });
    sendSuccessResponse({ res, data: tickets });
  } catch (error) {
    sendFailureResponse({ res });
  }
};
