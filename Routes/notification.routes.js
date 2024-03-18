const {Router} = require("express");
const { postNotification, readNotification, updateNotification } = require("../controller/notification.controller");
const {adminMiddleware, guard } = require("../middleware-term/auth");
const notificationRoute= Router();
notificationRoute.get("/notification/read",adminMiddleware,readNotification)
notificationRoute.post("/notification",guard.check("User","Admin"), postNotification);
notificationRoute.patch("/notification/update/:id",adminMiddleware,updateNotification)
module.exports={
    notificationRoute
}