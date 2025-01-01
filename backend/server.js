import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCLoudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import facultyRouter from "./routes/facultyRoute.js";
import studentRouter from "./routes/studentRoute.js";
import channelRouter from "./routes/channelRoutes.js";

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCLoudinary();

//Middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/channels", channelRouter);
app.use("/api/user", userRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/student", studentRouter);
app.get("/", (req, res) => {
  res.send("API Working 404");
});

app.listen(port, () => console.log("Server started on Port: " + port));
