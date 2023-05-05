import express, { Router } from "express";
import * as announcementController from "../controllers/announcements.controller";

const authRouter: Router = express.Router();

authRouter.post("/", announcementController.createAnnouncement);
authRouter.get("/:id", announcementController.getAnnouncementById);
authRouter.get("/", announcementController.getAllAnnouncements);
authRouter.patch("/:id", announcementController.updateAnnouncement);
authRouter.delete("/:id", announcementController.deleteAnnouncement);

export default authRouter;
