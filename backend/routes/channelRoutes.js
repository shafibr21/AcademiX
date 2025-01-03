import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";

import {
  createChannel,
  fetchChannel,
  fetchMessages,
  getChannels,
  sendMessage,
} from "../controllers/ChannelController.js";
import upload from "../middleware/upload.js";

const channelRouter = express.Router();

channelRouter.post("/createChannel", checkAuth, createChannel);
channelRouter.get("/:channelId/messages", checkAuth, fetchMessages);
channelRouter.post(
  "/:channelId/send-messages",
  checkAuth,
  upload.single("document"),
  sendMessage
);
channelRouter.get("getChannel", checkAuth, fetchChannel);
channelRouter.get("/getChannel", checkAuth, getChannels);

export default channelRouter;
