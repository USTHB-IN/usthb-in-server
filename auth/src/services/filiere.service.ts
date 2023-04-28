import Filiere, { FiliereModel, IFiliere } from "../models/filiere.model";
import { HttpError } from "../middlewares/error.middleware";

interface UpdateFiliereParams {
  name?: string;
  abbreviation?: string;
}

export class FiliereService {
  static async createFiliere(filiere: IFiliere): Promise<FiliereModel> {
    try {
      const existingFiliere = await Filiere.findOne({ name: filiere.name });
      if (existingFiliere) {
        throw new HttpError(409, "Filiere already exists");
      }
      const newFiliere = new Filiere(filiere);
      await newFiliere.save();
      return newFiliere;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllFilieres(): Promise<FiliereModel[]> {
    try {
      const filieres = await Filiere.find();
      return filieres;
    } catch (error: any) {
      throw new HttpError(500, error.message);
    }
  }

  static async getFiliereById(id: string): Promise<FiliereModel> {
    try {
      const filiere = await Filiere.findById(id);
      if (!filiere) {
        throw new HttpError(404, "Filiere not found");
      }
      return filiere;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getFiliereByName(name: string): Promise<FiliereModel> {
    try {
      const filiere = await Filiere.findOne({ name });
      if (!filiere) {
        throw new HttpError(404, "Filiere not found");
      }
      return filiere;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getFiliereByAbbreviation(
    abbreviation: string
  ): Promise<FiliereModel> {
    try {
      const filiere = await Filiere.findOne({ abbreviation: abbreviation });
      if (!filiere) {
        throw new HttpError(404, "Filiere not found");
      }
      return filiere;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateFiliereById(
    id: string,
    filiere: UpdateFiliereParams
  ): Promise<FiliereModel | null> {
    try {
      const updatedFiliere = await Filiere.findById(id);
      if (!updatedFiliere) {
        throw new HttpError(404, "Filiere not found");
      }
      if (filiere.name) updatedFiliere.name = filiere.name;
      if (filiere.abbreviation)
        updatedFiliere.abbreviation = filiere.abbreviation;

      await updatedFiliere.save();
      return updatedFiliere;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
  static async updateFiliereByName(
    name: string,
    filiere: UpdateFiliereParams
  ): Promise<FiliereModel | null> {
    try {
      const updatedFiliere = await Filiere.findOne({ name: name });
      if (!updatedFiliere) {
        throw new HttpError(404, "Filiere not found");
      }
      if (filiere.name) updatedFiliere.name = filiere.name;
      if (filiere.abbreviation)
        updatedFiliere.abbreviation = filiere.abbreviation;

      await updatedFiliere.save();
      return updatedFiliere;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateFiliereByAbbreviation(
    abbreviation: string,
    filiere: UpdateFiliereParams
  ): Promise<FiliereModel | null> {
    try {
      const updatedFiliere = await Filiere.findOne({
        abbreviation: abbreviation,
      });
      if (!updatedFiliere) {
        throw new HttpError(404, "Filiere not found");
      }
      if (filiere.name) updatedFiliere.name = filiere.name;
      if (filiere.abbreviation)
        updatedFiliere.abbreviation = filiere.abbreviation;

      await updatedFiliere.save();
      return updatedFiliere;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteAllFilieres(): Promise<void> {
    try {
      await Filiere.deleteMany({});
    } catch (error: any) {
      throw new HttpError(500, error.message);
    }
  }

  static async deleteFiliereById(id: string): Promise<FiliereModel | null> {
    try {
      const deletedFiliere = await Filiere.findByIdAndDelete(id);
      if (!deletedFiliere) {
        throw new HttpError(404, "Filiere not found");
      }
      return deletedFiliere;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteFiliereByName(name: string): Promise<FiliereModel | null> {
    try {
      const deletedFiliere = await Filiere.findOneAndDelete({ name });
      if (!deletedFiliere) {
        throw new HttpError(404, "Filiere not found");
      }
      return deletedFiliere;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteFiliereByAbbreviation(
    abbreviation: string
  ): Promise<FiliereModel | null> {
    try {
      const deletedFiliere = await Filiere.findOneAndDelete({
        abbreviation: abbreviation,
      });
      if (!deletedFiliere) {
        throw new HttpError(404, "Filiere not found");
      }
      return deletedFiliere;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
