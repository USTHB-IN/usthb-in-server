import { Types } from "mongoose";
import { HttpError } from "../middlewares/error.middleware";
import Module, { IModule, ModuleModel } from "../models/module.model";

export class ModuleService {
  static async createModule(module: IModule): Promise<ModuleModel> {
    try {
      if (
        await Module.findOne({
          name: module.name,
          specialite: module.specialite,
        })
      ) {
        throw new HttpError(409, "Module already exists");
      }

      const newModule = new Module({
        name: module.name,
        specialite: new Types.ObjectId(module.specialite),
      });
      return await newModule.save();
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllModules(): Promise<ModuleModel[]> {
    try {
      return await Module.find();
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getModuleById(id: string): Promise<ModuleModel> {
    try {
      const existingModule = await Module.findById(id);
      if (!existingModule) throw new HttpError(404, "Module not found");

      return await existingModule;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getModuleByName(name: string): Promise<ModuleModel> {
    try {
      const existingModule = await Module.findOne({ name: name });
      if (!existingModule) throw new HttpError(404, "Module not found");

      return existingModule;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getModulesBySpecialite(
    specialite: string
  ): Promise<ModuleModel[]> {
    try {
      const existingModule = await Module.find({ specialite: specialite });

      return existingModule;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getModuleBySpecialiteAndName(
    specialite: string,
    name: string
  ): Promise<ModuleModel> {
    try {
      const existingModule = await Module.findOne({
        specialite: new Types.ObjectId(specialite),
        name: name,
      });
      if (!existingModule) throw new HttpError(404, "Module not found");

      return existingModule;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteModuleById(id: string): Promise<ModuleModel> {
    try {
      const existingModule = await Module.findByIdAndDelete(id);
      if (!existingModule) throw new HttpError(404, "Module not found");

      return existingModule;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateModuleById(
    id: string,
    module: Partial<IModule>
  ): Promise<ModuleModel> {
    try {
      const existingModule = await Module.findById(id);
      if (!existingModule) throw new HttpError(404, "Module not found");

      existingModule.name = module.name ?? existingModule.name;
      existingModule.specialite =
        new Types.ObjectId(module.specialite) ?? existingModule.specialite;

      await existingModule.save();
      return existingModule;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
