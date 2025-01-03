import { response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { Channel, Faculty, User } from "../model/models.js";

const createChannel = async (req, res) => {
  try {
    const { thesisId, studentId, facultyId } = req.body;

    // Check if a channel already exists
    const existingChannel = await Channel.findOne({ thesisId });
    if (existingChannel) {
      return res.status(400).json({ message: "Channel already exists." });
    }

    // Create a new channel
    const channel = new Channel({
      thesisId,
      studentId,
      facultyId,
    });

    await channel.save();

    res.status(201).json({ success: true, channel });
  } catch (error) {
    console.error("Error creating channel:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const fetchChannel = async (req, res) => {
  const { thesisId, facultyId, studentId } = req.query;

  try {
    // Build a dynamic query object
    const query = {};
    if (thesisId) query.thesisId = thesisId;
    if (facultyId) query.facultyId = facultyId;
    if (studentId) query.studentId = studentId;

    // Find the channel(s) based on the query
    const channels = await Channel.find(query)
      .populate("thesisId", "title")
      .populate("facultyId", "name email")
      .populate("studentId", "name email")
      .populate("messages");

    if (!channels || channels.length === 0) {
      return res.status(404).json({ message: "No channels found." });
    }

    res.status(200).json(channels);
  } catch (error) {
    console.error("Error fetching channels:", error);
    res.status(500).json({ message: "Failed to fetch channels.", error });
  }
};

const getChannelById = async (req, res) => {
  try {
    const { channelId } = req.params;

    // Fetch the channel by ID
    const channel = await Channel.findById(channelId)
      .populate("thesisId", "title abstract authors researchArea") // Populate thesis details
      .populate("facultyId", "userId") // Populate faculty details
      .populate("studentId", "name email"); // Populate student details

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json({ success: true, channel });
  } catch (error) {
    console.error("Error fetching channel:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { content } = req.body;
    const senderId = req.decoded.id;

    // Check if the channel exists
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found." });
    }

    let documentUrl = null;

    // If a document is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "documents", // Cloudinary folder name
        resource_type: "auto", // Automatically determine file type
      });
      documentUrl = result.secure_url;
    }

    // Create new message object
    const newMessage = {
      sender: senderId,
      content,
      document: documentUrl,
    };

    // Add message to the channel
    channel.messages.push(newMessage);
    await channel.save();

    // Fetch sender details
    const sender = await User.findById(senderId).select("name email");

    // Construct response message
    const responseMessage = {
      sender: sender,
      content: newMessage.content,
      document: newMessage.document,
    };

    res.status(201).json({ success: true, message: responseMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const fetchMessages = async (req, res) => {
  try {
    const { channelId } = req.params;

    const channel = await Channel.findById(channelId).populate(
      "messages.sender",
      "name email"
    );
    if (!channel) {
      return res.status(404).json({ message: "Channel not found." });
    }

    res.status(200).json({ success: true, messages: channel.messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getChannels = async (req, res) => {
  try {
    const userId = req.decoded.id;

    // Fetch the user to determine their role
    const user = await User.findById(userId).select("role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let query = {};

    // Build query based on the user's role
    if (user.role === "STUDENT") {
      const student = await User.findById(userId).select("student");
      if (!student) {
        return res.status(404).json({ message: "Student ID not found" });
      }
      query.studentId = userId;
    } else if (user.role === "FACULTY") {
      const faculty = await Faculty.findOne({ userId }).select("_id");
      if (!faculty) {
        return res.status(404).json({ message: "Faculty ID not found" });
      }
      query.facultyId = faculty._id;
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized access: Invalid user role" });
    }

    // Fetch channels based on the query
    const channels = await Channel.find(query)
      .populate("thesisId", "title abstract authors researchArea") // Populate thesis details
      .populate("facultyId", "userId") // Populate faculty details
      .populate("studentId", "name email"); // Populate student details

    if (channels.length === 0) {
      return res
        .status(404)
        .json({ message: "No channels found for the user" });
    }

    res.status(200).json({ success: true, channels });
  } catch (error) {
    console.error("Error fetching channels:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  createChannel,
  sendMessage,
  fetchMessages,
  fetchChannel,
  getChannelById,
  getChannels,
};
