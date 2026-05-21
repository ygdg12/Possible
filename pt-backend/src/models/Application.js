import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
