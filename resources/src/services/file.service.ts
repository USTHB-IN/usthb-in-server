import { HttpError } from "../middlewares/error.middleware";
import File, { IFile, FileModel } from "../models/file.model";

export class FileService {
  static async createFile(file: IFile): Promise<FileModel> {
    try {
      const newFile = new File({
        name: file.name,
        url: file.url,
      });

      await newFile.save();
      return newFile;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getFileById(id: string): Promise<FileModel> {
    try {
      const existingFile = await File.findById(id);
      if (!existingFile) throw new HttpError(404, "File not found");

      return existingFile;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllFiles(): Promise<FileModel[]> {
    try {
      return await File.find();
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async addSolution(id: string, solution: string): Promise<FileModel> {
    try {
      const existingFile = await File.findById(id);
      if (!existingFile) throw new HttpError(404, "File not found");

      existingFile.solution = solution;

      return await existingFile.save();
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteFile(id: string): Promise<FileModel> {
    try {
      const deletedFile = await File.findByIdAndDelete(id);
      if (!deletedFile) throw new HttpError(404, "File not found");

      return deletedFile;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
