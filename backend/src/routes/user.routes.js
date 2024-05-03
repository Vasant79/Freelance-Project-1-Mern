import { Router } from "express";
import {
  allUsers,
  retrieveById,
  createUser,
  deleteUser,
  filterSearch,
} from "../controller/user.controller.js";

const router = Router();

router.get("/allUsers", allUsers);
router.get("/retrieveById", retrieveById);
router.post("/createUser", createUser);
router.delete("/deleteUser", deleteUser);
router.post("/filterSearch", filterSearch);

export default router;
