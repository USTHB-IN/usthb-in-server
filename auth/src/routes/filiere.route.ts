import express from "express";
import * as FiliereController from "../controllers/filiere.controller";
import adminOnlyMiddleware from "../middlewares/admin.middleware";

const router = express.Router();

router.post("/", adminOnlyMiddleware, FiliereController.createFiliere);
router.get("/", FiliereController.getAllFilieres);
router.get("/:id", FiliereController.getFiliereById);
router.get("/name/:name", FiliereController.getFiliereByName);
router.get(
  "/abbreviation/:abbreviation",
  FiliereController.getFiliereByAbbreviation
);
router.patch("/:id", FiliereController.updateFiliereById);
router.patch("/name/:name", FiliereController.updateFiliereByName);
router.patch(
  "/abbreviation/:abbreviation",
  FiliereController.updateFiliereByAbbreviation
);
router.delete("/:id", FiliereController.deleteFiliereById);
router.delete("/name/:name", FiliereController.deleteFiliereByName);
router.delete(
  "/abbreviation/:abbreviation",
  FiliereController.deleteFiliereByAbbreviation
);

export default router;
