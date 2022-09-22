import { Request, Response } from "express";

import ListPricingsService from "../services/PricingServices/ListPricingService";
import CreatePricingService from "../services/PricingServices/CreatePricingService";
import ShowPricingService from "../services/PricingServices/ShowPricingService";
import UpdatePricingService from "../services/PricingServices/UpdatePricingService";
import DeletePricingService from "../services/PricingServices/DeletePricingService";

import AppError from "../errors/AppError";
import { getIO } from "../libs/socket";

interface PricingData {
  companyId: number;
  productId: number;
  gracePeriod: number;
}

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { user } = req;

  if (user.profile !== "admin" || user.companyId !== 1) {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const pricings = await ListPricingsService();

  return res.status(200).json(pricings);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { user } = req;

  if (user.profile !== "admin" || user.companyId !== 1) {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const { companyId, productId, gracePeriod }: PricingData = req.body;

  const pricing = await CreatePricingService({
    companyId,
    productId,
    gracePeriod
  });

  const io = getIO();
  io.emit("pricing", {
    action: "update",
    pricing
  });

  return res.status(200).json(pricing);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { user } = req;

  if (user.profile !== "admin" || user.companyId !== 1) {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const { pricingId } = req.params;

  const pricing = await ShowPricingService(pricingId);

  return res.status(200).json(pricing);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  if (user.profile !== "admin" || user.companyId !== 1) {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const pricingData: PricingData = req.body;
  const { pricingId } = req.params;

  const pricing = await UpdatePricingService({ pricingData, pricingId });

  const io = getIO();
  io.emit("pricing", {
    action: "update",
    pricing
  });

  return res.status(200).json(pricing);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  if (user.profile !== "admin" || user.companyId !== 1) {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const { pricingId } = req.params;

  await DeletePricingService(pricingId);

  const io = getIO();
  io.emit("pricing", {
    action: "update",
    pricingId
  });

  return res.status(200).json({ message: "Pricing deleted" });
};
