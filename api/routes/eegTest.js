import express from "express";
import multer from "multer";
import path from "path";
import { computeTest } from "../controllers/eegTest.js";

// Counter to keep track of uploaded files
let uploadCounter = 1;

// Set up multer storage to save file with a unique sequential number and original filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${file.originalname}`;
    uploadCounter++;
    cb(null, filename);
  },
});

// Filter to only accept CSV files
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".csv") {
    return cb(new Error("Only CSV files are allowed"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

const router = express.Router();

router.post("/eeg", upload.single("eegfile"), computeTest);

export default router;
