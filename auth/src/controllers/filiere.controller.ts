import { Request, Response, NextFunction } from "express";
import { FiliereService } from "../services/filiere.service";
import { IFiliere } from "../models/filiere.model";

export const createFiliere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filiere: IFiliere = req.body;
    const newFiliere = await FiliereService.createFiliere(filiere);
    res.status(201).json(newFiliere);
  } catch (error) {
    next(error);
  }
};

export const getAllFilieres = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filieres = await FiliereService.getAllFilieres();
    res.status(200).json(filieres);
  } catch (error) {
    next(error);
  }
};

export const getFiliereById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const filiere = await FiliereService.getFiliereById(id);
    res.status(200).json(filiere);
  } catch (error) {
    next(error);
  }
};

export const getFiliereByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;
    const filiere = await FiliereService.getFiliereByName(name);
    res.status(200).json(filiere);
  } catch (error) {
    next(error);
  }
};

export const getFiliereByAbbreviation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { abbreviation } = req.params;
    const filiere = await FiliereService.getFiliereByAbbreviation(abbreviation);
    res.status(200).json(filiere);
  } catch (error) {
    next(error);
  }
};

export const updateFiliereById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const filiere = req.body;
    const updatedFiliere = await FiliereService.updateFiliereById(id, filiere);
    res.status(200).json(updatedFiliere);
  } catch (error) {
    next(error);
  }
};

export const updateFiliereByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;
    const filiere = req.body;
    const updatedFiliere = await FiliereService.updateFiliereByName(
      name,
      filiere
    );
    res.status(200).json(updatedFiliere);
  } catch (error) {
    next(error);
  }
};

export const updateFiliereByAbbreviation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { abbreviation } = req.params;
    const filiere = req.body;
    const updatedFiliere = await FiliereService.updateFiliereByAbbreviation(
      abbreviation,
      filiere
    );
    res.status(200).json(updatedFiliere);
  } catch (error) {
    next(error);
  }
};

export const deleteFiliereById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await FiliereService.deleteFiliereById(id);
    res.status(200).json({ message: "Filiere deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const deleteFiliereByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;
    await FiliereService.deleteFiliereByName(name);
    res.status(200).json({ message: "Filiere deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteFiliereByAbbreviation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { abbreviation } = req.params;
    await FiliereService.deleteFiliereByAbbreviation(abbreviation);
    res.status(200).json({ message: "Filiere deleted successfully" });
  } catch (error) {
    next(error);
  }
};
