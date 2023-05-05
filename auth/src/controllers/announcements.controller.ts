import { Request, Response, NextFunction } from "express";
import { AnnouncementService } from "../services/announcements.service";
import { HttpError } from "../middlewares/error.middleware";
import { IAnnouncement } from "../models/announcements.model";

export const createAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const announcement = await AnnouncementService.createAnnouncement(
      req.body as IAnnouncement
    );
    res.status(201).json(announcement);
  } catch (error: any) {
    next(error);
  }
};

export const getAnnouncementById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const announcement = await AnnouncementService.getAnnouncementById(
      req.params.id
    );
    res.json(announcement);
  } catch (error: any) {
    next(error);
  }
};

export const getAllAnnouncements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const announcements = await AnnouncementService.getAllAnnouncements();
    res.json(announcements);
  } catch (error: any) {
    next(error);
  }
};

export const updateAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedAnnouncement = await AnnouncementService.updateAnnouncement(
      req.params.id,
      req.body as IAnnouncement
    );
    res.json(updatedAnnouncement);
  } catch (error: any) {
    next(error);
  }
};

export const deleteAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedAnnouncement = await AnnouncementService.deleteAnnouncement(
      req.params.id
    );
    if (!deletedAnnouncement)
      throw new HttpError(404, "Announcement not found");
    res.json(deletedAnnouncement);
  } catch (error: any) {
    next(error);
  }
};
