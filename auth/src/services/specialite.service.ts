import Specialite, {
  SpecialiteModel,
  ISpecialite,
} from "../models/specialite.model";
import Filiere from "../models/filiere.model";
import { HttpError } from "../middlewares/error.middleware";
import mongoose from "mongoose";

export interface CreateSpecialiteParams {
  name: string;
  abbreviation: string;
  filiereName: string;
}

export interface UpdateSpecialiteParams {
  name?: string;
  abbreviation?: string;
  filiereName?: string;
}

export class SpecialiteService {
  static async createSpecialite(
    specialite: CreateSpecialiteParams
  ): Promise<SpecialiteModel> {
    try {
      const existingSpecialite = await Specialite.findOne({
        name: specialite.name,
      });
      if (existingSpecialite) {
        throw new HttpError(409, "Specialite already exists");
      }
      const filiere = await Filiere.findOne({ name: specialite.filiereName });
      if (!filiere) throw new HttpError(404, "Filiere Not Found");

      const specialiteData: ISpecialite = {
        name: specialite.name,
        abbreviation: specialite.abbreviation,
        idFiliere: filiere._id as mongoose.Types.ObjectId,
      };
      const newSpecialite = new Specialite(specialiteData);
      await newSpecialite.save();
      return newSpecialite;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllSpecialites(): Promise<SpecialiteModel[]> {
    try {
      const specialite = await Specialite.find();
      return specialite;
    } catch (error: any) {
      throw new HttpError(500, error.message);
    }
  }

  static async getSpecialiteById(id: string): Promise<SpecialiteModel> {
    try {
      const specialite = await Specialite.findById(id);
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }
      return specialite;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getSpecialiteByName(name: string): Promise<SpecialiteModel> {
    try {
      const specialite = await Specialite.findOne({ name: name });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }
      return specialite;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getSpecialiteByAbbreviation(
    abbreviation: string
  ): Promise<SpecialiteModel> {
    try {
      const specialite = await Specialite.findOne({
        abbreviation: abbreviation,
      });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }
      return specialite;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getSpecialitesByFiliereName(
    filiereName: string
  ): Promise<SpecialiteModel[]> {
    try {
      const filiere = await Filiere.findOne({ name: filiereName });
      if (!filiere) throw new HttpError(404, "Filiere not found");

      const specialite = await Specialite.find({ idFiliere: filiere._id });
      return specialite;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateSpecialiteById(
    id: string,
    specialite: UpdateSpecialiteParams
  ): Promise<SpecialiteModel | null> {
    try {
      const updatedSpecialite = await Specialite.findById(id);
      if (!updatedSpecialite) {
        throw new HttpError(404, "Specialite not found");
      }

      if (specialite.name) updatedSpecialite.name = specialite.name;
      if (specialite.abbreviation)
        updatedSpecialite.abbreviation = specialite.abbreviation;
      if (specialite.filiereName) {
        const filiere = await Filiere.findOne({ name: specialite.filiereName });
        if (!filiere) throw new HttpError(404, "Filiere Not Found");
        updatedSpecialite.idFiliere = filiere._id;
      }

      await updatedSpecialite.save();
      return updatedSpecialite;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
  static async updateSpecialiteByName(
    name: string,
    specialite: UpdateSpecialiteParams
  ): Promise<SpecialiteModel | null> {
    try {
      const updatedSpecialite = await Specialite.findOne({ name: name });
      if (!updatedSpecialite) {
        throw new HttpError(404, "Specialite not found");
      }

      if (specialite.name) updatedSpecialite.name = specialite.name;
      if (specialite.abbreviation)
        updatedSpecialite.abbreviation = specialite.abbreviation;
      if (specialite.filiereName) {
        const filiere = await Filiere.findOne({ name: specialite.filiereName });
        if (!filiere) throw new HttpError(404, "Filiere Not Found");
        updatedSpecialite.idFiliere = filiere._id;
      }

      await updatedSpecialite.save();
      return updatedSpecialite;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateSpecialiteByAbbreviation(
    abbreviation: string,
    specialite: UpdateSpecialiteParams
  ): Promise<SpecialiteModel | null> {
    try {
      const updatedSpecialite = await Specialite.findOne({
        abbreviation: abbreviation,
      });
      if (!updatedSpecialite) {
        throw new HttpError(404, "Specialite not found");
      }

      if (specialite.name) updatedSpecialite.name = specialite.name;
      if (specialite.abbreviation)
        updatedSpecialite.abbreviation = specialite.abbreviation;
      if (specialite.filiereName) {
        const filiere = await Filiere.findOne({ name: specialite.filiereName });
        if (!filiere) throw new HttpError(404, "Filiere Not Found");
        updatedSpecialite.idFiliere = filiere._id;
      }

      await updatedSpecialite.save();
      return updatedSpecialite;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteSpecialiteById(
    id: string
  ): Promise<SpecialiteModel | null> {
    try {
      const deletedSpecialite = await Specialite.findByIdAndDelete(id);
      if (!deletedSpecialite) {
        throw new HttpError(404, "Specialite not found");
      }
      return deletedSpecialite;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteSpecialiteByName(
    name: string
  ): Promise<SpecialiteModel | null> {
    try {
      const deletedSpecialite = await Specialite.findOneAndDelete({ name });
      if (!deletedSpecialite) {
        throw new HttpError(404, "Specialite not found");
      }
      return deletedSpecialite;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteSpecialiteByAbbreviation(
    abbreviation: string
  ): Promise<SpecialiteModel | null> {
    try {
      const deletedSpecialite = await Specialite.findOneAndDelete({
        abbreviation: abbreviation,
      });
      if (!deletedSpecialite) {
        throw new HttpError(404, "Specialite not found");
      }
      return deletedSpecialite;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
