import express from "express";
import {
  checkAuth,
  protect,
  validateUpdateRequest,
} from "../middleware/checkAuth.js";

import {
  loginUser,
  registerUser,
  getUserinfo,
  getUserProfile,
  updateUserDetails,
} from "../controllers/UserContoller.js";
import upload from "../middleware/upload.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.get("/getuser", checkAuth, getUserinfo);
userRouter.post("/signup", registerUser);
userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/update", validateUpdateRequest, updateUserDetails);
userRouter.put(
  "/imgupload",
  protect,
  upload.single("image"),
  updateUserDetails
);

export default userRouter;
