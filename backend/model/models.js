import mongoose from "mongoose";

const { Schema } = mongoose;

// Enum for roles
const Roles = ["STUDENT", "FACULTY"];

// User Schema
const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: Roles, required: true },
  department: { type: String },
  bio: { type: String },
  image: { type: String },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});

// Faculty Schema
const FacultySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  researchInterests: { type: [String], required: true },
  availability: { type: Schema.Types.Mixed }, // JSON type
  publications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Publication" }],
  thesisRequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ThesisIdea" }, // Track pending thesis requests
  ],
});

// Student Schema
const StudentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  researchInterests: { type: [String], required: true },
  contributions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Contribution" },
  ],
});

// Publication Schema
const PublicationSchema = new Schema({
  title: { type: String, required: true },
  abstract: { type: String },
  authors: { type: [String], required: true },
  publicationDate: { type: Date, required: true },
  url: { type: String },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Contribution Schema
const ContributionSchema = new Schema({
  title: { type: String, required: true },
  abstract: { type: String },
  authors: { type: [String], required: true },
  publicationDate: { type: Date, required: true },
  url: { type: String },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
// Thesis Idea Schema
const ThesisIdeaSchema = new Schema({
  title: { type: String, required: true },
  abstract: { type: String },
  authors: { type: [String], required: true },
  publicationDate: { type: Date, required: true },
  links: {
    type: [String],
    validate: {
      validator: function (value) {
        return value.every((link) => {
          const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
          return urlRegex.test(link);
        });
      },
      message: "All links must be valid URLs.",
    },
    default: [],
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Pending Changes"],
    default: "Pending",
  },
  researchArea: {
    type: String,
    required: true,
    trim: true,
  },
  review: { type: String, default: "" }, // Added field for reviews
});
// Message Schema
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
//  Channel Schema
const ChannelSchema = new mongoose.Schema({
  thesisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ThesisIdea",
    required: true,
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});
// Export Models
const User = mongoose.model("User", UserSchema, "user");
const Faculty = mongoose.model("Faculty", FacultySchema, "faculty");
const Student = mongoose.model("Student", StudentSchema, "student");
const ThesisIdea = mongoose.model("ThesisIdea", ThesisIdeaSchema, "thesisIdea");
const Publication = mongoose.model(
  "Publication",
  PublicationSchema,
  "publication"
);
const Contribution = mongoose.model(
  "Contribution",
  ContributionSchema,
  "contribution"
);
const Channel = mongoose.model("Channel", ChannelSchema, "channel");

export {
  User,
  Faculty,
  Student,
  Publication,
  Contribution,
  ThesisIdea,
  Channel,
};
