import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  addThesisReview,
  getFaculty,
  getFacultyById,
  getThesisById,
  getThesisRequestsById,
  updateThesisStatus,
} from "../controllers/facultyController.js";

const facultyRouter = express.Router();

facultyRouter.get("/getfaculty", getFaculty);
facultyRouter.get("/getfaculty/:id", getFacultyById);
facultyRouter.get("/thesisrequests/:id", checkAuth, getThesisRequestsById);
facultyRouter.get("/thesis-review/:id", checkAuth, getThesisById);
facultyRouter.patch("/thesis/:id", checkAuth, updateThesisStatus);
facultyRouter.post("/thesis/:id/review", checkAuth, addThesisReview);

export default facultyRouter;
