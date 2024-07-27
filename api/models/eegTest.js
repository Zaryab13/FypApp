import mongoose, { Schema } from "mongoose";

// EEG Test Schema
const eegTestSchema = new Schema(
  {
    technicianId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    file: String,
    result: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const EegTest = mongoose.model("EegTest", eegTestSchema);

export default EegTest;
