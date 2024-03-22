const { Router } = require("express");
const {
  postApartment,
  getDetails,
  uploadImage,
  putApartment,
  deleteApartment,
  filterApartment,
  searchApartment,
  getSuperDetails,
} = require("../controller/apartment.controller");
const { middleware } = require("../middleware-term/auth");

const apartmentRouter = Router();

// Middleware for authentication
const { adminMiddleware, userMiddleware, superAdminMiddleware } = middleware;

// Routes for reading apartment details based on user role
apartmentRouter.get("/read/admin", adminMiddleware, getDetails);
apartmentRouter.get("/read/user", userMiddleware, getDetails);
apartmentRouter.get("/read/superadmin", superAdminMiddleware, getSuperDetails);

// Route for creating apartment details
apartmentRouter.post("/create", uploadImage, postApartment);

// Route for updating apartment details
apartmentRouter.put("/update/:id", uploadImage, putApartment);

// Route for deleting apartment details
apartmentRouter.delete("/remove/:id", deleteApartment);

// Route for filtering apartments
apartmentRouter.get("/filter", filterApartment);

// Route for searching apartments
apartmentRouter.get("/search", searchApartment);

module.exports = {
  apartmentRouter,
};
