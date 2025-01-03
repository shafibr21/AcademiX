import express from "express";
import { checkAuth, validateUpdateRequest } from "../middleware/checkAuth.js";

import {
  loginUser,
  registerUser,
  getUserinfo,
  getUserProfile,
  updateUserDetails,
  updateUserImage,
  getResearchInterests,
  updateResearchInterest,
  fetchAllThesisIdeas,
  getThesisIdeaById,
} from "../controllers/UserContoller.js";
import upload from "../middleware/upload.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.get("/getuser", checkAuth, getUserinfo);
userRouter.post("/signup", registerUser);
userRouter.get("/profile", checkAuth, getUserProfile);
userRouter.get("/research", checkAuth, getResearchInterests);
userRouter.put("/update", checkAuth, updateUserDetails);
userRouter.put("/researchUpdate", checkAuth, updateResearchInterest);
userRouter.put(
  "/imgupload",
  checkAuth,
  upload.single("image"),
  updateUserImage
);
userRouter.get("/allThesisIdeas", checkAuth, fetchAllThesisIdeas);
userRouter.get("/allThesisIdeas/:id", checkAuth, getThesisIdeaById);

export default userRouter;
