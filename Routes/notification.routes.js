const {Router} = require("express");
const { postNotification, readNotification, updateNotification } = require("../controller/notification.controller");
const notificationRoute= Router();
notificationRoute.get("/notification/read",readNotification)
notificationRoute.post("/notification", postNotification);
notificationRoute.patch("/notification/update/:id",updateNotification)
module.exports={
    notificationRoute
}