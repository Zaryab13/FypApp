import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    cell: {
      type: String,
      required: true,
      // unique: true,
      minlength: 11,
      // maxlength: 12,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    role: {
      type: String,
      required: true,
      default: "technician",
      enum: ["admin", "technician"],
    },
    patients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patients",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
