import express from "express";

import {
  loginUser,
  registerUser,
  getUserinfo,
} from "../controllers/UserContoller.jsx";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getuser", getUserinfo);

export default userRouter;
