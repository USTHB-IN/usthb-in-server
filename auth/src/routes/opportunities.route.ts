import { Router } from "express";
import * as OpportunityController from "../controllers/opportunities.controller";
import { uploader } from "../utils/multer";

const router: Router = Router();

router.post(
  "/",
  uploader.fields([{ name: "image" }, { name: "clubImage" }]),
  OpportunityController.createOpportunity
);
router.get("/:id", OpportunityController.getOpportunityById);
router.get("/", OpportunityController.getAllOpportunities);
router.put("/:id", OpportunityController.updateOpportunity);
router.delete("/:id", OpportunityController.deleteOpportunity);

export default router;
