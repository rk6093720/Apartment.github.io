const {Router} = require("express");
const { getTentant, postTentant, editTentant, deleteTentant, upload } = require("../controller/tentant.contoller");
const { middleware, adminMiddleware, guard} = require("../middleware-term/auth");
const tentantRouter = Router();
tentantRouter.get("/read",guard.check("User","Admin"), getTentant);
tentantRouter.post("/create",middleware,upload,postTentant);
tentantRouter.put("/update/:id",middleware,upload,editTentant);
tentantRouter.delete("/remove/:id",adminMiddleware,deleteTentant);
module.exports={
    tentantRouter
} 