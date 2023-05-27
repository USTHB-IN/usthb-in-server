import { Request, Response, NextFunction } from "express";
import { IRessource } from "../models/ressource.model";
import { RessourceService } from "../services/ressource.service";
import { HttpError } from "../middlewares/error.middleware";
import { saveFileToStorage } from "../utils/uploadFile";
import { uploadImage } from "../utils/uploadImage";
import { FileService } from "../services/file.service";

export async function createRessource(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, type, module } = req.body;
    let file: Express.Multer.File | undefined;
    let solution: Express.Multer.File | undefined;

    if (req.files && Array.isArray(req.files)) {
      file = req.files[0] as Express.Multer.File;

      if (req.files[1]) {
        solution = req.files[1] as Express.Multer.File;
      }
    } else {
      throw new HttpError(422, "You didn't upload any files");
    }

    // Upload the file to Firebase Storage and get the file URL
    const fileUrl: string = await saveFileToStorage(file, "ressources");
    const File = await FileService.createFile({
      name: name,
      url: fileUrl,
    });

    let solutionUrl: string = "";
    if (solution) {
      solutionUrl = await saveFileToStorage(solution, "ressources");
      await FileService.addSolution(File.id, solutionUrl);
    }

    // Create a new resource object
    const newRessource: IRessource = {
      name,
      type,
      date: new Date(),
      module,
      file: File.id,
    };

    // Save the resource to the database
    const createdRessource = await RessourceService.createRessource(
      newRessource
    );

    res.status(201).json(createdRessource);
  } catch (error) {
    next(error);
  }
}
