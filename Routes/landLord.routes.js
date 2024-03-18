const {Router} = require("express");
const { getLandLord, postLandLord, updateLandlord, deleteLandlord, filterLandlord,  upload } = require("../controller/landLord.controller");
const { guard, superAdminMiddleware } = require("../middleware-term/auth");
const landLordRouter = Router();
//get request for landLord;
landLordRouter.get("/read",guard.check("User","SuperAdmin"), getLandLord);
landLordRouter.get("/read",superAdminMiddleware,getLandLord)
//post request for landLord;
landLordRouter.post("/create",upload,postLandLord)
//put and patch request for editing credentials for landlord;
landLordRouter.put("/update/:id",updateLandlord);
//delete request for landlord;
landLordRouter.delete("/remove/:id",deleteLandlord);
//filter by the get request 
landLordRouter.get("/land-filter",filterLandlord);
// signup of landlord as admin

module.exports={
    landLordRouter
}