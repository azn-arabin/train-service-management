import { Request, Response } from "express";
import { Fare } from "../models/Fare";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../lib/helpers/responseHelper";
import { Station } from "../models/Station";

export const addFare = async (req: Request, res: Response) => {
  const { from, to, fare } = req.body;

  try {
    if (from === to) {
      return sendFailureResponse({
        statusCode: 400,
        res,
        message: "From station and to station is same",
      });
    }
    const fromStation = await Station.findById(from);
    const toStation = await Station.findById(to);

    if (!fromStation || !toStation) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "Invalid Station(s)",
      });
    }

    const existingFare = await Fare.findOne({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    });
    if (existingFare) {
      return sendFailureResponse({
        res,
        statusCode: 409,
        message: "Fare for this route already exists",
      });
    }

    const newFare = new Fare({ from, to, fare });
    await newFare.save();

    sendSuccessResponse({
      res,
      data: {
        fare: newFare,
      },
    });
  } catch (error) {
    sendFailureResponse({ res });
  }
};

export const updateFare = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fare } = req.body;

  try {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { fare },
      { new: true },
    );
    if (!updatedFare) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "Fare not found",
      });
    }

    sendSuccessResponse({ res, data: updatedFare });
  } catch (error) {
    sendFailureResponse({ res });
  }
};

export const getFares = async (req: Request, res: Response) => {
  try {
    const fares = await Fare.find().populate("from to");
    sendSuccessResponse({
      res,
      data: {
        fares,
      },
      meta: {
        totalItems: fares.length,
      },
    });
  } catch (error) {
    sendFailureResponse({ res });
  }
};

export const deleteFare = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedFare = await Fare.findByIdAndDelete(id);
    if (!deletedFare) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "Fare not found",
      });
    }

    sendSuccessResponse({ res, message: "Fare deleted successfully" });
  } catch (error) {
    sendFailureResponse({ res });
  }
};
