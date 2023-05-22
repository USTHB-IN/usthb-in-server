import { Request, Response, NextFunction } from "express";
import { OpportunityService } from "../services/opportunities.service";
import { HttpError } from "../middlewares/error.middleware";
import { UploadedFile } from "express-fileupload";
import { Multer } from "multer";

export async function createOpportunity(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.files) throw new HttpError(400, "Images are required");

    const imageFiles = req.files[0] as unknown as Express.Multer.File;
    const clubImageFiles: Express.Multer.File = req
      .files[1] as unknown as Express.Multer.File;

    console.log(imageFiles);
    console.log(clubImageFiles);

    // Access the path of the first file
    const image = imageFiles.path;
    const clubImage = clubImageFiles.path;

    const { title, description, type, link, club } = req.body;
    const newOpportunity = await OpportunityService.createOpportunity({
      title,
      description,
      type,
      image: image,
      link,
      club,
      clubImage,
    });
    res.status(201).json(newOpportunity);
  } catch (error: any) {
    next(error);
  }
}

export async function getOpportunityById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;
    const opportunity = await OpportunityService.getOpportunityById(id);
    res.status(200).json(opportunity);
  } catch (error: any) {
    next(error);
  }
}

export async function getAllOpportunities(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const opportunities = await OpportunityService.getAllOpportunities();
    res.status(200).json(opportunities);
  } catch (error: any) {
    next(error);
  }
}

export async function updateOpportunity(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;
    const opportunity = await OpportunityService.updateOpportunity(
      id,
      req.body
    );
    res.status(200).json(opportunity);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteOpportunity(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;
    const deletedOpportunity = await OpportunityService.deleteOpportunity(id);
    res.status(200).json(deletedOpportunity);
  } catch (error: any) {
    next(error);
  }
}
