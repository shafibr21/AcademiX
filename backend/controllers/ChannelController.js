import { Channel } from "../model/models.js";

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

const sendMessage = async (req, res) => {
  try {
    const { channelId, senderId, content } = req.body;

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found." });
    }

    const newMessage = {
      sender: senderId,
      content,
    };

    channel.messages.push(newMessage);
    await channel.save();

    res.status(201).json({ success: true, message: newMessage });
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
export { createChannel, sendMessage, fetchMessages, fetchChannel };
