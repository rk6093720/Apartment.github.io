const {Router} = require("express");
const { getTentant, postTentant, editTentant, deleteTentant, upload, superTentant } = require("../controller/tentant.contoller");
const { middleware } = require("../middleware-term/auth");
const {userMiddleware,adminMiddleware,superAdminMiddleware}= middleware
const tentantRouter = Router();
tentantRouter.get(
  "/read/admin",
  adminMiddleware
);
tentantRouter.get("/read/user", userMiddleware, getTentant);
tentantRouter.post("/create",upload,postTentant);
tentantRouter.put("/update/:id",upload,editTentant);
tentantRouter.delete("/remove/:id",deleteTentant);
tentantRouter.get("/read/super", superAdminMiddleware, superTentant);
module.exports={
    tentantRouter
} 