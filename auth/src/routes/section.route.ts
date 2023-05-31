import express from "express";
import * as SectionController from "../controllers/section.controller";
import adminOnlyMiddleware from "../middlewares/admin.middleware";

const router = express.Router();

// Create a new section
router.post("/", adminOnlyMiddleware, SectionController.createSection);

// Get all sections
router.get("/", SectionController.getAllSection);

// Get all sections by specialite
router.get(
  "/specialite/:specialite",
  SectionController.getAllSectionBySpecialite
);

// Get all sections by specialite id
router.get("/specialite/id/:id", SectionController.getAllSectionBySpecialiteId);

// Get section by id
router.get("/id/:id", SectionController.getSectionById);

// Get section by name and nameSpecialite
router.get("/search", SectionController.getSectionByNameAndNameSpecialite);

// Update section by id
router.patch("/id/:id", SectionController.updateSectionById);

// Update section by name and nameSpecialite
router.patch("/edit", SectionController.updateSectionByNameAndNameSpecialite);

// Delete section by id
router.delete("/id/:id", SectionController.deleteSectionById);

// Delete section by name and nameSpecialite
router.delete("/delete", SectionController.deleteSectionByName);

export default router;
