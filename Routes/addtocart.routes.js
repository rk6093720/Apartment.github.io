const {Router}= require("express");
const { PostAddtoCart, cart, deletecart } = require("../controller/addtocart.controller");
const { middleware } = require("../middleware-term/auth");
const addtocartRouter = Router();
addtocartRouter.post("/addcart",middleware,PostAddtoCart);
addtocartRouter.get("/read",middleware,cart);
// addtocartRouter.patch("/update/:id",updatecart);
addtocartRouter.delete("/remove/:id",middleware,deletecart);
module.exports={
    addtocartRouter
}