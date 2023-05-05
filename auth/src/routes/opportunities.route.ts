import { Router } from "express";
import * as OpportunityController from "../controllers/opportunities.controller";

const router: Router = Router();

router.post("/", OpportunityController.createOpportunity);
router.get("/:id", OpportunityController.getOpportunityById);
router.get("/", OpportunityController.getAllOpportunities);
router.put("/:id", OpportunityController.updateOpportunity);
router.delete("/:id", OpportunityController.deleteOpportunity);

export default router;
