const mongoose = require("mongoose");
const paymentDetails = new mongoose.Schema(
  {
    transactionId: { type: String, required: true },
    name: { type: String, required: true },
    paymentDate: { type: Date, required: true, default: Date.now },
    screenShot: { type: String, required: true },
    approve: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const PaymentD = mongoose.model("details",paymentDetails);
module.exports={
    PaymentD
}