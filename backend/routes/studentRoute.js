import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  addContribution,
  getContributions,
  postThesisIdea,
  fetchThesisIdeas,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/get-contributions", checkAuth, getContributions);
studentRouter.post("/contributions/add", checkAuth, addContribution);
studentRouter.post("/postThesisidea", checkAuth, postThesisIdea);
studentRouter.get("/getThesisideas", checkAuth, fetchThesisIdeas);

export default studentRouter;
