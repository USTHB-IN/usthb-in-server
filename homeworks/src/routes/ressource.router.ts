import express from "express";
import * as RessourceController from "../controllers/resssources.controller";
import { uploader } from "../utils/multer";

const router = express.Router();

router.post(
  "/",
  uploader({ folder: "ressources" }).any(),
  RessourceController.createRessource
);

export default router;
