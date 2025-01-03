import express from "express";
import {
  clearChatX,
  startConvo,
  summarizeAbstract,
} from "../controllers/chatXController.js";

const chantXRouter = express.Router();

chantXRouter.post("/summarizer", summarizeAbstract);
chantXRouter.post("/reset", clearChatX);
chantXRouter.post("/chat", startConvo);

export default chantXRouter;
