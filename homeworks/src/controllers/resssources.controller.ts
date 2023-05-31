import { Request, Response, NextFunction } from "express";
import { IHomework } from "../models/homework.model";
import { HomeworkService } from "../services/homework.service";
import { HttpError } from "../middlewares/error.middleware";
import { saveFileToStorage } from "../utils/uploadFile";

export async function createRessource(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, type, module } = req.body;
    const filesUrls: string[] = [];

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const fileUrl = await saveFileToStorage(file, "homeworks");
        if (!fileUrl) throw new HttpError(500, "Error while saving file");
        filesUrls.push(fileUrl);
      }
    }

    // Create a new resource object
    const newRessource: IHomework = {
      name: name,
      
    };

    // Save the resource to the database
    const createdRessource = await HomeworkService.createRessource(
      newRessource
    );

    res.status(201).json(createdRessource);
  } catch (error) {
    next(error);
  }
}
