import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  getFaculty,
  getFacultyById,
  getThesisRequests,
} from "../controllers/facultyController.js";

const facultyRouter = express.Router();

facultyRouter.get("/getfaculty", getFaculty);
facultyRouter.get("/getfaculty/:id", getFacultyById);
facultyRouter.get("/thesisrequests", checkAuth, getThesisRequests);

export default facultyRouter;
