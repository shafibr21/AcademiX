import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";

import {
  loginUser,
  registerUser,
  getUserinfo,
} from "../controllers/UserContoller.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.get("/getuser", checkAuth, getUserinfo);
userRouter.post("/signup", registerUser);

export default userRouter;
