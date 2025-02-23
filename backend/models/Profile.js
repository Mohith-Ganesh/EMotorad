import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
});
  

export default mongoose.model("Profile", ProfileSchema);