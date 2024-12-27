import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/models.js";

dotenv.config();

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed",
      error,
    });
  }
};

const validateUpdateRequest = (req, res, next) => {
  if (!req.decoded) {
    return res.status(400).json({ error: "Request body is required" });
  }

  const {
    bio,
    researchInterests,
    availability,
    contributions,
    publications,
    image,
  } = req.body;

  if (!req.decoded.id) {
    return res.status(400).json({ error: "Unauthorized" });
  }

  if (
    !bio &&
    !image &&
    !researchInterests &&
    !availability &&
    !contributions &&
    !publications
  ) {
    return res
      .status(400)
      .json({ error: "At least one field to update is required" });
  }
  console.log("Request body is valid");
  next();
};
export { checkAuth, validateUpdateRequest };
