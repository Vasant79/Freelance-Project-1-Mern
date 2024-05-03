import { Router } from "express";
import {
  testing,
  createTeam,
  teamDetails,
} from "../controller/team.controller.js";

const router = Router();

router.post("/createTeam", createTeam);
router.get("/teamDetails/", teamDetails);

export default router;
