import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  getFaculty,
  getFacultyById,
} from "../controllers/facultyController.js";

const facultyRouter = express.Router();

facultyRouter.get("/getfaculty", getFaculty);
facultyRouter.get("/getfaculty/:id", getFacultyById);

export default facultyRouter;
