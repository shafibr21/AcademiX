import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCLoudinary from "./config/cloudinary.js";

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCLoudinary();

//Middlewares
app.use(express.json());
app.use(cors());

// // api endpoints
// app.use("/api/user", userRouter);
// app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("API Working 404");
});

app.listen(port, () => console.log("Server started on Port: " + port));
