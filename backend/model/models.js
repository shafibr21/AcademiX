const mongoose = require("mongoose");

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

// Export Models
const User = mongoose.model("User", UserSchema);
const Faculty = mongoose.model("Faculty", FacultySchema);
const Student = mongoose.model("Student", StudentSchema);
const Publication = mongoose.model("Publication", PublicationSchema);
const Contribution = mongoose.model("Contribution", ContributionSchema);

module.exports = {
  User,
  Faculty,
  Student,
  Publication,
  Contribution,
};
