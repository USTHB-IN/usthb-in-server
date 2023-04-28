import express from "express";
import * as GroupController from "../controllers/group.controller";
import adminOnlyMiddleware from "../middlewares/admin.middleware";

const router = express.Router();

router.post("/", adminOnlyMiddleware, GroupController.createGroup);
router.get("/", GroupController.getAllGroups);
router.get("/section", GroupController.getAllGroupsBySection);
router.get("/id/:id", GroupController.getGroupById);
router.get("/search", GroupController.getGroupByNameAndSection);
router.patch("/id/:id", GroupController.updateGroupById);
router.patch("/edit", GroupController.updateGroupByNameAndSection);
router.delete("/id/:id", GroupController.deleteGroupById);
router.delete("/delete", GroupController.deleteGroupByNameAndSection);

export default router;
