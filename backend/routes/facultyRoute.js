import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  addThesisReview,
  getFaculty,
  getFacultyById,
  getThesisById,
  getThesisRequestsById,
  removeThesisRequest,
  updateThesisStatus,
} from "../controllers/facultyController.js";
import { createChannel } from "../controllers/ChannelController.js";

const facultyRouter = express.Router();

facultyRouter.get("/getfaculty", getFaculty);
facultyRouter.get("/getfaculty/:id", getFacultyById);
facultyRouter.get("/thesisrequests/:id", checkAuth, getThesisRequestsById);
facultyRouter.get("/thesis-review/:id", checkAuth, getThesisById);
facultyRouter.patch("/thesis/:id", checkAuth, updateThesisStatus);
facultyRouter.post("/thesis/:id/review", checkAuth, addThesisReview);
facultyRouter.patch("thesis-approved/:id", checkAuth, createChannel);
facultyRouter.patch("/removeThesisRequest/:id", checkAuth, removeThesisRequest);

export default facultyRouter;
