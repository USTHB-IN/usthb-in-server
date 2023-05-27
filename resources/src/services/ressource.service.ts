import { Types } from "mongoose";
import { HttpError } from "../middlewares/error.middleware";
import Ressource, {
  IRessource,
  RessourceModel,
} from "../models/ressource.model";

export class RessourceService {
  static async createRessource(ressource: IRessource): Promise<RessourceModel> {
    try {
      const newRessource = new Ressource({
        name: ressource.name,
        type: ressource.type,
        date: ressource.date,
        module: ressource.module,
        file: ressource.file,
      });
      await newRessource.save();
      return (await newRessource.populate("module")).populate("file");
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllRessources(): Promise<RessourceModel[]> {
    try {
      return await Ressource.find()
        .populate("file")
        .populate("module")
        .populate("solution");
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getRessourceById(id: string): Promise<RessourceModel> {
    try {
      const existingRessource = await Ressource.findById(id);
      if (!existingRessource) throw new HttpError(404, "Ressource not found");

      return existingRessource;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllRessourcesByModule(
    moduleId: string
  ): Promise<RessourceModel[]> {
    try {
      const existingRessource = await Ressource.find({
        module: moduleId,
      });
      return existingRessource;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateRessourceById(
    id: string,
    ressource: Partial<IRessource>
  ): Promise<RessourceModel> {
    try {
      const existingRessource = await Ressource.findById(id);
      if (!existingRessource) throw new HttpError(404, "Ressource not found");

      if (ressource.name) existingRessource.name = ressource.name;
      if (ressource.type) existingRessource.type = ressource.type;
      if (ressource.date) existingRessource.date = new Date(ressource.date);
      if (ressource.module)
        existingRessource.module = new Types.ObjectId(ressource.module);
      if (ressource.file)
        existingRessource.file = new Types.ObjectId(ressource.file);

      await existingRessource.save();
      return existingRessource;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteRessource(id: string): Promise<RessourceModel> {
    try {
      const deletedRessource = await Ressource.findByIdAndDelete(id);
      if (!deletedRessource) throw new HttpError(404, "Ressource not found");

      return deletedRessource;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
