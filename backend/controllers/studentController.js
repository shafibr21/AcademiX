import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import { User, Faculty, Student, ThesisIdea } from "../model/models.js";

const postThesisIdea = async (req, res) => {
  try {
    const {
      title,
      abstract,
      authors,
      publicationDate,
      links,
      researchArea,
      facultyId,
    } = req.body;

    const studentId = req.decoded?.id;

    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized user." });
    }

    // Validate required fields
    if (!title || !authors || !publicationDate || !researchArea || !facultyId) {
      return res.status(400).json({
        message:
          "Title, authors, publication date, research area, and faculty are required fields.",
      });
    }

    // Check if faculty exists
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Selected faculty not found." });
    }

    // Validate links
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (links && !links.every((link) => urlRegex.test(link))) {
      return res.status(400).json({ message: "All links must be valid URLs." });
    }

    // Create a new thesis idea
    const thesisIdea = new ThesisIdea({
      title,
      abstract,
      authors,
      publicationDate,
      links,
      studentId,
      researchArea,
      facultyId,
    });

    await thesisIdea.save();

    // Add the thesis idea to the faculty's thesisRequests array
    faculty.thesisRequests.push(thesisIdea._id);
    await faculty.save();

    res.status(201).json({
      success: true,
      message: "Thesis idea posted successfully.",
      thesisIdea,
    });
  } catch (error) {
    console.error("Error posting thesis idea:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while posting the thesis idea.",
      error: error.message,
    });
  }
};

// Fetch a single thesis idea by ID
const getThesisIdeaById = async (req, res) => {
  try {
    const thesisIdeaId = req.params.id; // Get the thesis idea ID from the request parameters

    const thesisIdea = await ThesisIdea.findById(thesisIdeaId)
      .populate("studentId", "name email") // Populate student details
      .exec();

    if (!thesisIdea) {
      return res.status(404).json({ message: "Thesis idea not found" });
    }

    res.json({ thesisIdea });
  } catch (error) {
    console.error("Error fetching thesis idea:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch thesis ideas by student ID
const getThesisIdeasByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params; // Extract studentId from route params

    // Validate the studentId
    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required.",
      });
    }

    // Fetch thesis ideas filtered by studentId
    const thesisIdeas = await ThesisIdea.find({ studentId })
      .populate("studentId", "name email") // Optional: Populate student details
      .exec();

    // Check if any thesis ideas exist for the given studentId
    if (!thesisIdeas.length) {
      return res.status(404).json({
        success: false,
        message: "No thesis ideas found for the provided student ID.",
      });
    }

    // Format the response
    const formattedThesisIdeas = thesisIdeas.map((idea) => ({
      _id: idea._id,
      title: idea.title,
      abstract: idea.abstract,
      authors: idea.authors,
      publicationDate: idea.publicationDate,
      links: idea.links,
      status: idea.status,
      researchArea: idea.researchArea,
    }));

    // Send the response
    res.status(200).json({
      success: true,
      message: "Thesis ideas fetched successfully.",
      data: formattedThesisIdeas,
    });
  } catch (error) {
    console.error("Error fetching thesis ideas:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching thesis ideas.",
      error: error.message,
    });
  }
};

// Update thesis ideas of the logged-in user
const updateThesisIdea = async (req, res) => {
  const {
    id,
    title,
    abstract,
    researchArea,
    links,
    status,
    publicationDate,
    authors,
  } = req.body;

  try {
    const userId = req.decoded.id; // Assuming user ID is extracted from token

    const thesisIdea = await ThesisIdea.findOneAndUpdate(
      { _id: id, author: userId },
      {
        title,
        abstract,
        researchArea,
        links,
        status,
        publicationDate,
        authors,
      },
      { new: true }
    );

    if (!thesisIdea) {
      return res.status(404).json({ message: "Thesis idea not found" });
    }

    res.json({ thesisIdea });
  } catch (error) {
    console.error("Error updating thesis idea:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  postThesisIdea,
  getThesisIdeaById,
  updateThesisIdea,
  getThesisIdeasByStudentId,
};
