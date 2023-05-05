import { Router } from "express";
import userRouter from "./user.route";
import groupRouter from "./group.route";
import sectionRouter from "./section.route";
import authRouter from "./auth.route";
import filiereRouter from "./filiere.route";
import specialiteRouter from "./specialite.route";
import announcementRouter from "./announcements.route";
import opportunityRouter from "./opportunities.route";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/group", groupRouter);
router.use("/section", sectionRouter);
router.use("/filiere", filiereRouter);
router.use("/specialite", specialiteRouter);
router.use("/auth", authRouter);
router.use("/announcements", announcementRouter);
router.use("/opportunities", opportunityRouter);
export default router;
