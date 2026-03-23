import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
});

const Certificate =
  mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);

export default Certificate;
