const {Router} = require("express");
const { getTentant, postTentant, editTentant, deleteTentant, upload, superTentant } = require("../controller/tentant.contoller");
const tentantRouter = Router();
tentantRouter.get(
  "/read/admin"
);
tentantRouter.get("/read/user", getTentant);
tentantRouter.post("/create",upload,postTentant);
tentantRouter.put("/update/:id",upload,editTentant);
tentantRouter.delete("/remove/:id",deleteTentant);
tentantRouter.get("/read/super", superTentant);
module.exports={
    tentantRouter
} 