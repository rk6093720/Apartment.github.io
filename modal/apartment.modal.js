const mongoose = require("mongoose");
const apartmentDetailSchema = new mongoose.Schema({
    apartmentImage:{type:String},
    title:{type:String},
    typeofApartment:{type:String},
    description:{type:String},
    area:{type:String},
    floor:{type:String},
    bedRooms:{type:String},
    bathRooms:{type:String},
    terrace:{type:String},
    parking:{type:String},
    //price for rent should be per month
    price:{type:String,default:0},
    advancePaymentForRent:{type:String,default:0},
    country:{type:String},
    city:{type:String},
    status:{type:Boolean,default:false}
},
{timestamps:true})

const ApartmentModel = mongoose.model("APARTMENT-DETAILS",apartmentDetailSchema);
module.exports={
    ApartmentModel
}