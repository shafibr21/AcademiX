import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  addContribution,
  getContributions,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/get-contributions", checkAuth, getContributions);
studentRouter.post("/contributions/add", checkAuth, addContribution);

export default studentRouter;
