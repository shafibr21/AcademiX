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

//Thesis Idea Schema
const ThesisIdeaSchema = new Schema({
  title: { type: String, required: true },
  abstract: { type: String },
  authors: { type: [String], required: true },
  publicationDate: { type: Date, required: true },
  links: {
    type: [String], // Array of links associated with the thesis idea
    validate: {
      validator: function (value) {
        // Validate that all entries in the array are valid URLs
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  researchArea: {
    type: String,
    required: true,
    trim: true, // Example: "Artificial Intelligence", "Data Science", etc.
  },
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

export { User, Faculty, Student, Publication, Contribution, ThesisIdea };
