const {Router}= require("express");
const { postApartment, getDetails, uploadImage, putApartment, deleteApartment, filterApartment, searchApartment  } = require("../controller/apartment.controller");
const apartmentRouter = Router();
//read details of apartment
apartmentRouter.get(
  "/read",
  getDetails
);
//create details of apartment
apartmentRouter.post("/create", uploadImage,postApartment);
//update details of apartment;
apartmentRouter.put("/update/:id", uploadImage,putApartment);
//delete details of apartment;
apartmentRouter.delete("/remove/:id", deleteApartment);
apartmentRouter.get("/filter", filterApartment);
apartmentRouter.get("/filter",filterApartment)
apartmentRouter.get("/search", searchApartment);
apartmentRouter.get("/search", searchApartment);
module.exports={
    apartmentRouter
} 