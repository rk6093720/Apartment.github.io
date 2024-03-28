const mongoose = require("mongoose");
const invoiceSchema = new mongoose.Schema({
    apartmentImage:{type:String},
    apartmentAddress:{type:String},
    ownerEmail:{type:String},
    ownerPhone:{type:String},
   invoiceId:{type:String,required:true},
   date:{type:String,required:true,default:new Date()},
   apartmentType:{type:String,required:true},
   username:{type:String},
   userAddress:{type:String},
   userPhone:{type:String},
   totalAmount:{type:String,required:true},
   paymentStatus:{type:String,required:true},
   water:{type:String},
   electricity:{type:String},
   month:{type:String,required:true},
   year:{type:String,required:true},
   rent:{type:String,required:true},
})
const InvoiceModal = mongoose.model("invoice", invoiceSchema);
module.exports={
    InvoiceModal
}