import mongoose, { Schema } from "mongoose";

// Patient Schema
const patientSchema = new Schema(
  {
    technicianId: {
      type: Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    cell: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    symptoms: {
      type: Array,
      required: true,
      default: [],
    },
    tests: [
      {
        type: Schema.Types.ObjectId,
        ref: "EegTest",
      },
    ],
  },
  { timestamps: true }
);


const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
