const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
    paymentTentant:{type:String},
    amount: { type: Number, default:0 },
    paymentMethod: { type: String, default:"Phone Pay" },
    paymentDate: { type:Date, default:Date.now },
    apartmentId:{type:String},
    qrCodeLink:{type:String}
},{
    timestamps:true
})
const PaymentModal = mongoose.model("Payment", paymentSchema);
module.exports={
    PaymentModal
}