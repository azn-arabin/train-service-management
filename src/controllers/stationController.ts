import { Request, Response } from "express";
import { Station } from "../models/Station";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../lib/helpers/responseHelper";

export const createStation = async (req: Request, res: Response) => {
  const { name, location } = req.body;

  try {
    let station = await Station.findOne({ name });
    if (station) {
      return sendFailureResponse({
        res,
        statusCode: 409,
        message: "Station already exists",
      });
    }

    station = new Station({ name, location });
    await station.save();
    sendSuccessResponse({ res, data: { station } });
  } catch (error: any) {
    sendFailureResponse({ res });
  }
};

export const getStations = async (_req: Request, res: Response) => {
  try {
    const stations = await Station.find();
    sendSuccessResponse({
      res,
      data: { stations },
      meta: {
        totalItems: stations.length,
      },
    });
  } catch (error) {
    sendFailureResponse({ res });
  }
};

export const updateStation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, location } = req.body;

  try {
    const station = await Station.findByIdAndUpdate(
      id,
      { name, location },
      { new: true },
    );
    if (!station) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "Station not found",
      });
    }
    sendSuccessResponse({ res, data: station });
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

export const deleteStation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const station = await Station.findByIdAndDelete(id);
    if (!station) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: "Station not found",
      });
    }
    sendSuccessResponse({ res, message: "Station deleted successfully" });
  } catch (error) {
    sendFailureResponse({ res });
  }
};
