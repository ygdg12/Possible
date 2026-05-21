import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema(
  {
    ip: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("AdminLog", adminLogSchema);
