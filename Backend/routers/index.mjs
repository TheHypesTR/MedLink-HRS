import { Router } from "express";
import usersRouter from "./users.mjs";

const router = Router();

router.use(usersRouter);

router.get("/", (request, response) => {
    response.status(200).send("Welcome Here!");
});

export default router;