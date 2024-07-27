import express from "express";
import {
  addPatient,
  deletePatient,
  getPatientById,
  getPatients,
  getPatientTestHistory,
} from "../controllers/patient.js";

const router = express.Router();

// Createe
router.post("/add", addPatient);

// Get
router.get("/getPatientById/:id", getPatientById);
// Get All
router.get("/getPatients", getPatients);

// Get Patient History
router.get("/getPatientHistory/:id", getPatientTestHistory); 

// Delete
router.delete("/:id", deletePatient);

export default router;
