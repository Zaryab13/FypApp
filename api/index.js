import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import patientRoute from "./routes/patient.js";
import eegTestRoute from "./routes/eegTest.js";

const app = express();
dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting to MongoDB", error);
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/patient", patientRoute);
app.use("/api/test", eegTestRoute);

const port = 3001;
app.listen(port, () => {
  connect();
  console.log(`server is Up on localhost: ${port}`);
});
