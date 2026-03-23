import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
});

const Achievement =
  mongoose.models.Achievement || mongoose.model("Achievement", achievementSchema);

export default Achievement;
