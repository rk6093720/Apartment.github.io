const {Router}= require("express");
const { postApartment, getDetails, uploadImage, putApartment, deleteApartment, filterApartment, searchApartment  } = require("../controller/apartment.controller");
const {guard, adminMiddleware } = require("../middleware-term/auth");
const apartmentRouter = Router();
//read details of apartment
apartmentRouter.get(
  "/read",
  guard.check("User","Admin"),
  getDetails
);
apartmentRouter.get("/read",adminMiddleware, getDetails);
//create details of apartment
apartmentRouter.post("/create", uploadImage,postApartment);
//update details of apartment;
apartmentRouter.put("/update/:id", uploadImage,putApartment);
//delete details of apartment;
apartmentRouter.delete("/remove/:id", deleteApartment);
apartmentRouter.get("/filter",guard.check("User","Admin"), filterApartment);
apartmentRouter.get("/filter", adminMiddleware,filterApartment)
apartmentRouter.get("/search", guard.check("User","Admin"), searchApartment);
apartmentRouter.get("/search", adminMiddleware, searchApartment);
module.exports={
    apartmentRouter
} 