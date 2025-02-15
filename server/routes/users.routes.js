import { Router } from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);

export default router;
