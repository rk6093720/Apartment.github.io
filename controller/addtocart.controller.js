const { AddToCartModal } = require("../modal/addApartment.modal");

const PostAddtoCart = async (req, res) => {
  const { apartment_id, apartment_details, tentants_id } = req?.body;
  const isdata = await AddToCartModal.findOne({
    apartment_id,
    tentants_id
  });
  if (isdata) {
    try {
      return res.status(200).json({
        msg: `cart item already added successfully`, status:"pending"
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } else {
    let newcartdata = await AddToCartModal({
       tentants_id,
      apartment_id,
      apartment_details
    });
    try {
      await newcartdata.save();
      return res.status(200).json({ msg: `item added successfully${apartment_id}`, status:"success"});
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
};
const cart = async(req,res)=>{
    try {
         const user_id = req?.body?.tentants_id;
         const value = await AddToCartModal.find({ person_id: user_id });
         res.status(200).json({status:"success", msg:"add to cart success",data: value }); 
    } catch (error) {
          res.status(500).json({ status:"failed", data:[], msg:"add to cart" }); 
    }
}
// const updatecart = async (req, res) => {
//   const user_id = req?.body?.user_id;
//   const { id } = req.params;
//   const { apartment_id, apartment_details } = req?.body;
//   await AddToCartModal.findOneAndUpdate(
//     { person_id: user_id, apartment_id: id },
//     { apartment_id, apartment_details },
//     { new: true }
//   );
//   try {
//     return res.status(200).json({ msg: `updated successfully :${product_id}` });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };
const deletecart = async (req, res) => {
  const { id } = req.params;
  const { user} = req?.body;
  try {
    await AddToCartModal.findOneAndDelete({
      apartment_id: id,
      person_id: user_id,
    });
    res.status(200).json({ msg: `data deleted ${id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  PostAddtoCart,
  cart,
  // updatecart,
  deletecart
};
