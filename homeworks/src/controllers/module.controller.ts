import { NextFunction, Request, Response } from "express";
import { ModuleService } from "../services/module.service";
import { IModule } from "../models/module.model";

export class ModuleController {
  static async createModule(req: Request, res: Response, next: NextFunction) {
    try {
      const module: IModule = req.body;
      const newModule = await ModuleService.createModule(module);
      res.json(newModule);
    } catch (error: any) {
      next(error);
    }
  }

  static async getAllModules(req: Request, res: Response, next: NextFunction) {
    try {
      const modules = await ModuleService.getAllModules();
      res.json(modules);
    } catch (error: any) {
      next(error);
    }
  }

  static async getModuleById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const module = await ModuleService.getModuleById(id);
      res.json(module);
    } catch (error: any) {
      next(error);
    }
  }

  static async getModuleByName(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const name = req.params.name;
      const module = await ModuleService.getModuleByName(name);
      res.json(module);
    } catch (error: any) {
      next(error);
    }
  }

  static async getModulesBySpecialite(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const specialite = req.params.specialite;
      const modules = await ModuleService.getModulesBySpecialite(specialite);
      res.json(modules);
    } catch (error: any) {
      next(error);
    }
  }

  static async getModulesBySpecialiteAndName(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const specialite = req.query.specialite as string;
      const name = req.query.name as string;
      const module = await ModuleService.getModuleBySpecialiteAndName(
        specialite,
        name
      );
      res.json(module);
    } catch (error: any) {
      next(error);
    }
  }

  static async deleteModuleById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const deletedModule = await ModuleService.deleteModuleById(id);
      res.json(deletedModule);
    } catch (error: any) {
      next(error);
    }
  }

  static async updateModuleById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const module = req.body;
      const updatedModule = await ModuleService.updateModuleById(id, module);
      res.json(updatedModule);
    } catch (error: any) {
      next(error);
    }
  }
}
