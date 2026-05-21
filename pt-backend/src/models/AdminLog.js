import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema(
  {
    email: { type: String },
    page: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("AdminLog", adminLogSchema);
