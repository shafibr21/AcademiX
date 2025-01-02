import express from "express";
import { summarizeAbstract } from "../controllers/chatXController.js";

const chantXRouter = express.Router();

chantXRouter.post("/summarizer", summarizeAbstract);

export default chantXRouter;
