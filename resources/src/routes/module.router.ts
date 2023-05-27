import express from "express";
import { ModuleController } from "../controllers/module.controller";

const router = express.Router();

router.post("/", ModuleController.createModule);
router.get("/", ModuleController.getAllModules);
router.get("/:id", ModuleController.getModuleById);
router.get("/name/:name", ModuleController.getModuleByName);
router.get("/specialite/:specialite", ModuleController.getModulesBySpecialite);
router.get(
  "/all/search",
  ModuleController.getModulesBySpecialiteAndName
);
router.delete("/:id", ModuleController.deleteModuleById);
router.patch("/:id", ModuleController.updateModuleById);

export default router;
