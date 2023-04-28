import { Request, Response, NextFunction } from "express";
import { SpecialiteService } from "../services/specialite.service";

export const createSpecialite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const specialite = await SpecialiteService.createSpecialite(req.body);
    res.status(201).json(specialite);
  } catch (error) {
    next(error);
  }
};

export const getAllSpecialites = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const specialites = await SpecialiteService.getAllSpecialites();
    res.json(specialites);
  } catch (error) {
    next(error);
  }
};

export const getSpecialiteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const specialite = await SpecialiteService.getSpecialiteById(req.params.id);
    res.json(specialite);
  } catch (error) {
    next(error);
  }
};

export const getSpecialiteByName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const specialite = await SpecialiteService.getSpecialiteByName(
      req.params.name
    );
    res.json(specialite);
  } catch (error) {
    next(error);
  }
};

export const getSpecialiteByAbbreviation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const specialite = await SpecialiteService.getSpecialiteByAbbreviation(
      req.params.abbreviation
    );
    res.json(specialite);
  } catch (error) {
    next(error);
  }
};

export const getSpecialitesByFiliereName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const specialites = await SpecialiteService.getSpecialitesByFiliereName(
      req.params.filiereName
    );
    res.json(specialites);
  } catch (error) {
    next(error);
  }
};

export const updateSpecialiteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedSpecialite = await SpecialiteService.updateSpecialiteById(
      req.params.id,
      req.body
    );
    res.json(updatedSpecialite);
  } catch (error) {
    next(error);
  }
};

export const updateSpecialiteByName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedSpecialite = await SpecialiteService.updateSpecialiteByName(
      req.params.name,
      req.body
    );
    res.json(updatedSpecialite);
  } catch (error) {
    next(error);
  }
};

export const updateSpecialiteByAbbreviation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedSpecialite =
      await SpecialiteService.updateSpecialiteByAbbreviation(
        req.params.abbreviation,
        req.body
      );
    res.json(updatedSpecialite);
  } catch (error) {
    next(error);
  }
};

export const deleteSpecialiteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await SpecialiteService.deleteSpecialiteById(req.params.id);
    res.status(200).json({ message: "Specialite deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteSpecialiteByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await SpecialiteService.deleteSpecialiteByName(req.params.name);
    res.status(200).json({ message: "Specialite deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteSpecialiteByAbbreviation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await SpecialiteService.deleteSpecialiteByAbbreviation(
      req.params.abbreviation
    );
    res.status(200).json({ message: "Specialite deleted successfully" });
  } catch (error) {
    next(error);
  }
};
