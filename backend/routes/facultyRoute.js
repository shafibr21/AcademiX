import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  getFaculty,
  getFacultyById,
  getFacultyProfile,
  getThesisRequestsById,
} from "../controllers/facultyController.js";

const facultyRouter = express.Router();

facultyRouter.get("/getfaculty", getFaculty);
facultyRouter.get("/getfaculty/:id", getFacultyById);
facultyRouter.get("/thesisrequests/:id", checkAuth, getThesisRequestsById);

export default facultyRouter;
