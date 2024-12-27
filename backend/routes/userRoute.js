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
  updateUserImage,
} from "../controllers/UserContoller.js";
import upload from "../middleware/upload.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.get("/getuser", checkAuth, getUserinfo);
userRouter.post("/signup", registerUser);
userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/update", checkAuth, validateUpdateRequest, updateUserDetails);
userRouter.put("/researchUpdate", checkAuth);
userRouter.put(
  "/imgupload",
  checkAuth,
  upload.single("image"),
  updateUserImage
);

export default userRouter;
