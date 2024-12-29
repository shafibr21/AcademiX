import express from "express";
import { checkAuth, validateUpdateRequest } from "../middleware/checkAuth.js";
import {
  addContribution,
  getContributions,
  postThesisIdea,
  getThesisIdeaById,
  updateThesisIdea,
  getThesisIdeasByStudentId,
} from "../controllers/studentController.js";
import { fetchAllThesisIdeas } from "../controllers/UserContoller.js";

const studentRouter = express.Router();

studentRouter.get("/get-contributions", checkAuth, getContributions);
studentRouter.post("/contributions/add", checkAuth, addContribution);
studentRouter.post("/postThesisidea", checkAuth, postThesisIdea);
studentRouter.get("/getThesisideas", checkAuth, fetchAllThesisIdeas);
studentRouter.get("/getThesisideas/:id", checkAuth, getThesisIdeaById);
studentRouter.get("/getThesisideas/student/:studentId", checkAuth, getThesisIdeasByStudentId);
studentRouter.put("/updateThesisidea", checkAuth, validateUpdateRequest, updateThesisIdea);

export default studentRouter;
