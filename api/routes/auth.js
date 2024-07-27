import express from "express";
import { register, login, logout, registerTechnician, deleteTechnician, getTechnicians } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/registerTechnician", registerTechnician);
router.get("/getTechnicians", getTechnicians);
router.delete("/deleteTechnician/:id", deleteTechnician);
// router.post("/authenticate", authenticate);

export default router;
