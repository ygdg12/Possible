import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },
    location: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
