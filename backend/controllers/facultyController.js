import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import { User, Faculty, Student } from "../model/models.js";

// Get all faculty members
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
// for getting the faculty by the facultyId
const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
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
// for getting the thesis requests by the facultyId
const getThesisRequestsById = async (req, res) => {
  try {
    const facultyId = req.params.id; // Use the id passed in the route

    if (!facultyId) {
      return res.status(401).json({ message: "Unauthorized user." });
    }

    const faculty = await Faculty.findById(facultyId).populate({
      path: "thesisRequests",
      populate: [
        { path: "studentId", select: "name email" },
        {
          path: "facultyId",
          select: "userId",
          populate: { path: "userId", select: "name" },
        },
      ],
    });
    console.log(faculty);

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
// For geting the facultyId from the userId
const getFacultyProfile = async (req, res) => {
  try {
    // Find the user by the decoded ID and exclude the password
    const user = await User.findById(req.decoded.id)
      .select("-password")
      .populate("facultyId"); // Populate the facultyId if it exists

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is a faculty member
    if (user.role === "FACULTY") {
      const faculty = await Faculty.findOne({ userId: user._id });
      if (faculty) {
        user.facultyId = faculty._id; // Add the facultyId manually if not already populated
      }
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export { getFaculty, getFacultyById, getThesisRequestsById, getFacultyProfile };
