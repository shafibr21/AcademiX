import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  getFaculty,
  getFacultyById,
} from "../controllers/facultyController.js";

const studentRouter = express.Router();

export default studentRouter;
