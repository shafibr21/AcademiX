import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";

import {
  createChannel,
  fetchChannel,
  fetchMessages,
  sendMessage,
} from "../controllers/ChannelController.js";

const channelRouter = express.Router();

channelRouter.post("/createChannel", checkAuth, createChannel);
channelRouter.get("/:id/messages", checkAuth, fetchMessages);
channelRouter.post("/:id/messages", checkAuth, sendMessage);
channelRouter.get("getChannel", checkAuth, fetchChannel);

export default channelRouter;
