import express from "express";
import * as specialiteController from "../controllers/specialite.controller";
import adminOnlyMiddleware from "../middlewares/admin.middleware";

const router = express.Router();

router.post("/", adminOnlyMiddleware, specialiteController.createSpecialite);
router.get("/", specialiteController.getAllSpecialites);
router.get("/:id", specialiteController.getSpecialiteById);
router.get("/name/:name", specialiteController.getSpecialiteByName);
router.get(
  "/abbreviation/:abbreviation",
  specialiteController.getSpecialiteByAbbreviation
);
router.get(
  "/filiere/:filiereName",
  specialiteController.getSpecialitesByFiliereName
);
router.get("filiere/id/:id", specialiteController.getSpecialitesByFiliereId);
router.patch("/:id", specialiteController.updateSpecialiteById);
router.patch("/name/:name", specialiteController.updateSpecialiteByName);
router.patch(
  "/abbreviation/:abbreviation",
  specialiteController.updateSpecialiteByAbbreviation
);
router.delete("/:id", specialiteController.deleteSpecialiteById);
router.delete("/name/:name", specialiteController.deleteSpecialiteByName);
router.delete(
  "/abbreviation/:abbreviation",
  specialiteController.deleteSpecialiteByAbbreviation
);

export default router;
