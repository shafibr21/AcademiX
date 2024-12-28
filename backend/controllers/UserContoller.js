import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import { User, Faculty, Student } from "../model/models.js";

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
//update information of user(studnet & faculty)
const handleStudentUpdate = async (
  userId,
  researchInterests,
  contributions
) => {
  let student = await Student.findOne({ userId });

  if (!student) {
    // Create a new student entry if it doesn't exist
    student = new Student({
      userId,
      researchInterests,
      contributions: contributions || [],
    });
  } else {
    // Update existing student details
    if (researchInterests) student.researchInterests = researchInterests;
    if (contributions) student.contributions = contributions;
  }

  await student.save();
};

const handleFacultyUpdate = async (
  userId,
  researchInterests,
  availability,
  publications
) => {
  let faculty = await Faculty.findOne({ userId });

  if (!faculty) {
    // Create a new faculty entry if it doesn't exist
    faculty = new Faculty({
      userId,
      researchInterests,
      availability,
      publications: publications || [],
    });
  } else {
    // Update existing faculty details
    if (researchInterests) faculty.researchInterests = researchInterests;
    if (availability) faculty.availability = availability;
    if (publications) faculty.publications = publications;
  }

  await faculty.save();
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id, user.role);
      return res.json({ success: true, token });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again",
      error: error.message,
    });
  }
};
// Route for user registration
const registerUser = async (req, res) => {
  const { email, password, name, role, department } = req.body;

  // Validate input
  if (!email || !password || !name || !role || !department) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role,
      department,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Route to get user info
const getUserinfo = async (req, res) => {
  try {
    const decoded = req.decoded;
    // Fetch the user details from the database
    const user = await User.findById(decoded.id).select(
      "name email role department bio verified createdAt updatedAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Access denied",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error, please try again",
      error: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserImage = async (req, res) => {
  const userId = req.decoded.id;

  try {
    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (req.file) {
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles", // Optional: Organize uploads into a folder
        resource_type: "image",
      });

      // Save the secure URL of the uploaded image
      user.image = result.secure_url;
    }
    await user.save();
    res.status(200).json({ message: "User image updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user details" });
  }
};

const updateUserDetails = async (req, res) => {
  const userId = req.decoded.id;
  const { bio, researchInterests, availability, contributions, publications } =
    req.body;

  try {
    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update common user fields
    if (bio) user.bio = bio;

    // Perform role-specific updates
    if (user.role === "STUDENT") {
      await handleStudentUpdate(userId, researchInterests, contributions);
    } else if (user.role === "FACULTY") {
      await handleFacultyUpdate(
        userId,
        researchInterests,
        availability,
        publications
      );
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Mark user as verified
    user.verified = true;
    user.updatedAt = Date.now();

    // Save the user details
    await user.save();

    res
      .status(200)
      .json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user details" });
  }
};

const getResearchInterests = async (req, res) => {
  try {
    const userId = req.decoded.id; // Get user ID from the token

    // Fetch user role to determine how to retrieve research interests
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    if (user.role === "FACULTY") {
      const faculty = await Faculty.findOne({ userId });
      if (!faculty) {
        return res.status(404).json({ message: "Faculty profile not found" });
      }
      return res.json({ researchInterests: faculty.researchInterests });
    } else if (user.role === "STUDENT") {
      const student = await Student.findOne({ userId });
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }
      return res.json({ researchInterests: student.researchInterests });
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }
  } catch (error) {
    console.error("Error fetching research interests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateResearchInterest = async (req, res) => {
  const { interests } = req.body;
  console.log(interests);

  try {
    const userId = req.decoded?.id; // Assuming user ID is extracted from token
    const role = req.decoded?.role; // Role should be part of the token payload as well

    if (!userId || !role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({
        success: false,
        message: "Invalid research interests format. It must be an array.",
      });
    }

    let updatedUser;

    if (role === "FACULTY") {
      // Check if faculty exists
      const faculty = await Faculty.findOne({ userId });

      if (faculty) {
        // Update the faculty's research interests
        updatedUser = await Faculty.updateOne(
          { userId },
          { $set: { researchInterests: interests } }
        );
      } else {
        // Create a new faculty entry if not exists
        updatedUser = await Faculty.create({
          userId,
          researchInterests: interests,
        });
      }
    } else if (role === "STUDENT") {
      // Check if student exists
      const student = await Student.findOne({ userId });

      if (student) {
        // Update the student's research interests
        updatedUser = await Student.updateOne(
          { userId },
          { $set: { researchInterests: interests } }
        );
      } else {
        // Create a new student entry if not exists
        updatedUser = await Student.create({
          userId,
          researchInterests: interests,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user role.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Research interests updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating research interests.",
      error: error.message,
    });
  }
};

export {
  loginUser,
  registerUser,
  getUserinfo,
  getUserProfile,
  updateUserDetails,
  updateUserImage,
  getResearchInterests,
  updateResearchInterest,
};
