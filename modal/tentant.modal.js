const mongoose = require("mongoose");
const tentantSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true, maxlength: 10 },
    dateOfBirth: { type: Date, required: true, default: Date.now },
    residentalAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    currentAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    aadharCard: { type: String },
    registrationofRoomRent: { type: Date, default: Date.now },
    approve: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TentantModal = mongoose.model("Tentant",tentantSchema);
module.exports={
    TentantModal
}