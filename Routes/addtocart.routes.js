const {Router}= require("express");
const { PostAddtoCart, cart, deletecart } = require("../controller/addtocart.controller");
const addtocartRouter = Router();
addtocartRouter.post("/addcart",PostAddtoCart);
addtocartRouter.get("/read",cart);
// addtocartRouter.patch("/update/:id",updatecart);
addtocartRouter.delete("/remove/:id",deletecart);
module.exports={
    addtocartRouter
}