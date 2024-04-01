const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String,enum:["SuperAdmin","Admin","User"], required: true },
  verifyToken: { type: String },
  refreshToken:{type:String}
},
{timestamps:true}
);
const AdminModal = mongoose.model("admin",adminSchema);
module.exports={
    AdminModal
}