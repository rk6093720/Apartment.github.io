const {Router} = require("express");
const { getTentant, postTentant, editTentant, deleteTentant, upload, superTentant } = require("../controller/tentant.contoller");
const { auth } = require("../middleware-term/auth");
const tentantRouter = Router();
tentantRouter.get("/read/admin",auth,getTentant);
tentantRouter.get("/read/user",auth, getTentant);
tentantRouter.post("/create",upload,postTentant);
tentantRouter.put("/update/:id",upload,editTentant);
tentantRouter.delete("/remove/:id",deleteTentant);
tentantRouter.get("/read/superadmin",auth, superTentant);
module.exports={
    tentantRouter
} 