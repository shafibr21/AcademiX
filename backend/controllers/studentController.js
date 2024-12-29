import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import {
  User,
  Faculty,
  Student,
  Contribution,
  ThesisIdea,
} from "../model/models.js";

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

const postThesisIdea = async (req, res) => {
  try {
    const { title, abstract, authors, publicationDate, links, researchArea } =
      req.body;

    // Assuming `req.decoded` contains the authenticated user's data
    const studentId = req.decoded?.id;

    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized user." });
    }

    // Validate required fields
    if (!title || !authors || !publicationDate || !researchArea) {
      return res.status(400).json({
        message:
          "Title, authors, publication date, and research area are required fields.",
      });
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
    });

    // Save to database
    await thesisIdea.save();

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

// Fetch Thesis Ideas
const fetchThesisIdeas = async (req, res) => {
  try {
    const { studentId } = req.query; // Assume studentId is sent as a query parameter

    const filter = studentId ? { studentId } : {}; // Filter by studentId if provided

    const thesisIdeas = await ThesisIdea.find(filter).populate("studentId"); // Populate student details if needed
    res.status(200).json({
      success: true,
      message: "Thesis ideas fetched successfully.",
      data: thesisIdeas,
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
  getContributions,
  addContribution,
  postThesisIdea,
  fetchThesisIdeas,
  getThesisIdeaById,
  updateThesisIdea,
};
