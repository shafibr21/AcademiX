import express from "express";
import { checkAuth, protect } from "../middleware/checkAuth.js";

import {
  loginUser,
  registerUser,
  getUserinfo,
  getUserProfile,
} from "../controllers/UserContoller.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.get("/getuser", checkAuth, getUserinfo);
userRouter.post("/signup", registerUser);
userRouter.get("/profile", protect, getUserProfile);

export default userRouter;
