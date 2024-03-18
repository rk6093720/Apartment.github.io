const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  firstName: { type: String },
  lastname: { type: String },
  phone:{type:String},
  country: { type: String },
  state: { type: String },
  city: { type: String },
  adminId: [{ type: mongoose.Schema.Types.ObjectId, ref: "admin" }],
},{timestamps:true}
);
const ProfileModal = mongoose.model("Profile", profileSchema);
module.exports = {
    ProfileModal
}