import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import { User, Faculty, Student, Contribution } from "../model/models.js";

const getContributions = async (req, res) => {
  try {
    const user = await User.findById(req.decoded.id).select("contributions");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ contributions: user.contributions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addContribution = async (req, res) => {
  const { title, abstract, authors, publicationDate, url, studentId } =
    req.body;

  try {
    const newContribution = new Contribution({
      title,
      abstract,
      authors,
      publicationDate,
      url,
      studentId,
    });

    const savedContribution = await newContribution.save();
    res.status(201).json(savedContribution);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getContributions, addContribution };
