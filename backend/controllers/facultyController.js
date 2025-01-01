import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import { User, Faculty, Student } from "../model/models.js";

const getFaculty = async (req, res) => {
  try {
    const { department, searchTerm } = req.query;

    // Create the filter object
    let filter = {};

    // If department is provided and not "all", add it to the filter
    if (department && department !== "all") {
      filter.department = department;
    }

    // Populate user details (name, email, bio, etc.) from the User table
    const faculty = await Faculty.find().populate(
      "userId",
      "name email bio image department role"
    );

    // Now filter the populated faculty data based on the criteria
    const filteredFaculty = faculty.filter((facultyMember) => {
      // Check if department matches (if department is provided and not "all")
      const departmentMatch =
        department && department !== "all"
          ? facultyMember.userId.department === department
          : true;

      // Check if search term matches (case-insensitive search on name)
      const nameMatch = searchTerm
        ? facultyMember.userId.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : true;

      // Return true if both criteria match
      return departmentMatch && nameMatch;
    });

    // Return the filtered faculty data
    res.json(filteredFaculty);
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

const getThesisRequests = async (req, res) => {
  try {
    const facultyId = req.decoded?.id;

    if (!facultyId) {
      return res.status(401).json({ message: "Unauthorized user." });
    }

    const faculty = await Faculty.findById(facultyId).populate({
      path: "thesisRequests",
      populate: { path: "studentId", select: "name email" }, // Optionally populate student details
    });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    res.status(200).json({
      success: true,
      thesisRequests: faculty.thesisRequests,
    });
  } catch (error) {
    console.error("Error fetching thesis requests:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching thesis requests.",
      error: error.message,
    });
  }
};
export { getFaculty, getFacultyById, getThesisRequests };
