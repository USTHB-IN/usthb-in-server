import { Router } from "express";
import moduleRouter from "./module.router";
import ressourceRouter from "./ressource.router";

const router: Router = Router();



router.use("/modules", moduleRouter);
router.use("/ressources", ressourceRouter);

export default router;
