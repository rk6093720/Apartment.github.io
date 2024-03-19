const {Router} = require("express");
const { getPayment, postPayment, screentShot, upload, getScreenshot } = require("../controller/payment.controller");
const paymentRouter = Router();
paymentRouter.get("/read",getPayment);
paymentRouter.post("/create",postPayment);
// paymentRouter.put("/update/:id",putPayment);
// paymentRouter.delete("/remove/:id",deletePayment);
paymentRouter.post("/screenshot",upload, screentShot);
paymentRouter.get("/screentshot/read", getScreenshot )
module.exports={
    paymentRouter
}