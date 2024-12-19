import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { User } from "../model/models.js";

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "3d" }); // Optional expiry time
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
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    const user = await newUser.save();

    // Generate a token and send the response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error, please try again",
      error: error.message,
    });
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

export { loginUser, registerUser, getUserinfo };
