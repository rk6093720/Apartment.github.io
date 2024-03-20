const {Router} = require("express");
const { getTentant, postTentant, editTentant, deleteTentant, upload } = require("../controller/tentant.contoller");
const tentantRouter = Router();
tentantRouter.get(
  "/read",
  getTentant
);
tentantRouter.post("/create",upload,postTentant);
tentantRouter.put("/update/:id",upload,editTentant);
tentantRouter.delete("/remove/:id",deleteTentant);
module.exports={
    tentantRouter
} 