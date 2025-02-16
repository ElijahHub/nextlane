import { Router } from "express";
import {
  getFriends,
  getUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.get("/friends", getFriends);
router.get("/all", getUsers);

export default router;
