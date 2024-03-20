const {Router} = require("express");
const { getPayment, postPayment, screentShot, upload, getScreenshot, getApprove, readApprove } = require("../controller/payment.controller");
const paymentRouter = Router();
paymentRouter.get("/read",getPayment);
paymentRouter.post("/create",postPayment);
paymentRouter.post("/screenshot",upload, screentShot);
paymentRouter.get("/screentshot/read", getScreenshot );
paymentRouter.patch("/approve/:id", getApprove)
paymentRouter.get("/approve/read", readApprove)
module.exports={
    paymentRouter
}