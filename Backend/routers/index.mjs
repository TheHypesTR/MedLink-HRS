import { Router } from "express";
import usersRouter from "./users.mjs";
import adminPanelRouter from "./admin-panel.mjs";

const router = Router();

router.use(usersRouter);
router.use(adminPanelRouter);

router.get("/", (request, response) => {
    response.status(200).send("Welcome Here!");
});

export default router;