import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import { User, Faculty, Student } from "../model/models.js";

const getFaculty = async (req, res) => {
  try {
    const { department, research } = req.query;
    let filter = {};

    if (department && department !== "all") {
      filter.department = department;
    }

    if (research) {
      filter.researchInterests = { $regex: research, $options: "i" }; // Case-insensitive search
    }

    // Populate user details (name, email, bio) from the User table
    const faculty = await Faculty.find(filter).populate(
      "userId",
      "name email bio image department role"
    );

    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch faculty data." });
  }
};
const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const faculty = await Faculty.findById(id).populate("userId"); // Adjust the population as per your schema

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json(faculty);
  } catch (error) {
    console.error("Error fetching faculty by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { getFaculty, getFacultyById };
