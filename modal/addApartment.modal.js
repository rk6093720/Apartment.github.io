const mongoose = require("mongoose");
const addtocart = new mongoose.Schema({
  tentants_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tentant" }],
  apartment_id: { type: String },
  apartment_details: {
    image: { type: String },
    price: { type: String },
    title: { type: String },
    city: { type: String },
    typeofApartment: { type: String },
  },
  item:{type:Number}
});
const AddToCartModal = mongoose.model("addtocart", addtocart);
module.exports={
    AddToCartModal
}