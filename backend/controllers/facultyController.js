import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import { User, Faculty, Student, ThesisIdea } from "../model/models.js";

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
    const userId = req.params.id; // Use the userId passed in the route

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user." });
    }

    // Fetch the faculty based on userId
    const faculty = await Faculty.findOne({ userId }).populate({
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

const getThesisById = async (req, res) => {
  try {
    const thesisId = req.params.id;

    const thesis = await ThesisIdea.findById(thesisId)
      .populate("studentId", "name email")
      .populate("facultyId", "userId")
      .populate({
        path: "facultyId",
        populate: { path: "userId", select: "name" },
      });

    if (!thesis) {
      return res.status(404).json({ message: "Thesis not found." });
    }

    res.status(200).json(thesis);
  } catch (error) {
    console.error("Error fetching thesis details:", error);
    res.status(500).json({
      message: "An error occurred while fetching thesis details.",
      error: error.message,
    });
  }
};

const updateThesisStatus = async (req, res) => {
  try {
    const thesisId = req.params.id;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const thesis = await ThesisIdea.findById(thesisId);

    if (!thesis) {
      return res.status(404).json({ message: "Thesis not found." });
    }

    thesis.status = status;
    thesis.updatedAt = Date.now();
    await thesis.save();

    res.status(200).json({
      success: true,
      message: `Thesis status updated to ${status}.`,
    });
  } catch (error) {
    console.error("Error updating thesis status:", error);
    res.status(500).json({
      message: "An error occurred while updating thesis status.",
      error: error.message,
    });
  }
};

const addThesisReview = async (req, res) => {
  try {
    const thesisId = req.params.id;
    const { review } = req.body;

    if (!review || review.trim() === "") {
      return res.status(400).json({ message: "Review cannot be empty." });
    }

    const thesis = await ThesisIdea.findById(thesisId);

    if (!thesis) {
      return res.status(404).json({ message: "Thesis not found." });
    }

    thesis.review = review;
    thesis.status = "Pending Changes";
    thesis.updatedAt = Date.now();
    await thesis.save();

    res.status(200).json({
      success: true,
      message: "Review added successfully.",
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      message: "An error occurred while adding the review.",
      error: error.message,
    });
  }
};

const removeThesisRequest = async (req, res) => {
  try {
    const { thesisId } = req.body;

    // Remove thesisId from the faculty's thesisRequests array
    const updatedFaculty = await Faculty.updateOne(
      { thesisRequests: thesisId },
      { $pull: { thesisRequests: thesisId } }
    );

    if (updatedFaculty.modifiedCount === 0) {
      return res.status(404).json({ message: "Thesis request not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Thesis request removed successfully." });
  } catch (error) {
    console.error("Error removing thesis request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  getFaculty,
  getFacultyById,
  getThesisRequestsById,
  getThesisById,
  updateThesisStatus,
  addThesisReview,
  removeThesisRequest,
};
