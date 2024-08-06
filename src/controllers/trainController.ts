import { Request, Response } from "express";
import { Train } from "../models/Train";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../lib/helpers/responseHelper";
import { Station } from "../models/Station";

// Add a new train
export const addTrain = async (req: Request, res: Response) => {
  const { name, stops } = req.body;

  try {
    const train = await Train.findOne({ name });
    if (train) {
      return sendFailureResponse({
        statusCode: 409,
        res,
        message: "Train already exists",
      });
    }

    // Check if all stations exist in the database
    for (const stop of stops) {
      const station = await Station.findById(stop.station);
      if (!station) {
        return sendFailureResponse({
          res,
          statusCode: 404,
          message: `Station with ID ${stop.station} does not exist`,
        });
      }
    }

    const newTrain = new Train({ name, stops });
    await newTrain.save();

    sendSuccessResponse({ res, data: { train: newTrain } });
  } catch (error) {
    sendFailureResponse({
      res,
    });
  }
};

// Get details of a train
export const getTrain = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const train = await Train.findById(id).populate("stops.station");
    if (!train) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "Train not found",
      });
    }

    sendSuccessResponse({ res, data: train });
  } catch (error) {
    sendFailureResponse({ res });
  }
};

// Update train details
export const updateTrain = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, stops } = req.body;

  try {
    // Check if all stations exist in the database
    for (const stop of stops) {
      const station = await Station.findById(stop.station);
      if (!station) {
        return sendFailureResponse({
          res,
          statusCode: 404,
          message: `Station with ID ${stop.station} does not exist`,
        });
      }
    }

    const train = await Train.findByIdAndUpdate(
      id,
      { id, stops, name },
      { new: true },
    );
    if (!train) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "Train not found",
      });
    }

    sendSuccessResponse({ res, data: train });
  } catch (error: any) {
    if (error.code === 11000) {
      return sendFailureResponse({
        res,
        statusCode: 409,
        message: "Station already exists",
      });
    }

    sendFailureResponse({ res });
  }
};

// Delete a train
export const deleteTrain = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const train = await Train.findByIdAndDelete(id);
    if (!train) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "Train not found",
      });
    }

    sendSuccessResponse({ res, message: "Train deleted successfully" });
  } catch (error) {
    sendFailureResponse({ res });
  }
};

// Get all trains
export const getAllTrains = async (_: Request, res: Response) => {
  try {
    const trains = await Train.find().populate("stops.station");
    sendSuccessResponse({
      res,
      data: {
        trains,
      },
      meta: {
        totalItems: trains.length,
      },
    });
  } catch (error) {
    sendFailureResponse({ res });
  }
};
