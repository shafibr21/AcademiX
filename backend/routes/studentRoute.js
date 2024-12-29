import express from "express";
import { checkAuth, validateUpdateRequest } from "../middleware/checkAuth.js";
import {
  addContribution,
  getContributions,
  postThesisIdea,
  fetchThesisIdeas,
  getThesisIdeaById,
  updateThesisIdea,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/get-contributions", checkAuth, getContributions);
studentRouter.post("/contributions/add", checkAuth, addContribution);
studentRouter.post("/postThesisidea", checkAuth, postThesisIdea);
studentRouter.get("/getThesisideas", checkAuth, fetchThesisIdeas);
studentRouter.get("/getThesisideas/:id", checkAuth, getThesisIdeaById);
studentRouter.put("/updateThesisidea", checkAuth, validateUpdateRequest, updateThesisIdea);

export default studentRouter;
