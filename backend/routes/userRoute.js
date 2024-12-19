import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";

import {
  loginUser,
  registerUser,
  getUserinfo,
} from "../controllers/UserContoller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getuser", checkAuth, getUserinfo);

export default userRouter;
