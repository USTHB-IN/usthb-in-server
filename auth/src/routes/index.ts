import { Router } from "express";
import userRouter from "./user.route";
import groupRouter from "./group.route";
import sectionRouter from "./section.route";
import authRouter from "./auth.route";
import filiereRouter from "./filiere.route";
import specialiteRouter from "./specialite.route";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/group", groupRouter);
router.use("/section", sectionRouter);
router.use("/filiere", filiereRouter);
router.use("/specialite", specialiteRouter);
router.use("/auth", authRouter);
export default router;
