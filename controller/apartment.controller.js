const {  ApartmentModel } = require("../modal/apartment.modal");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const getDetails = async(req,res)=>{
    try {
        const getData = await ApartmentModel.find();
        res.status(200).json({data:{getData}, msg:"getting data", status:"success"})
    } catch (error) {
        res.status(500).json({ msg:"not getting data", status:"failed"})
    }
}
const adminDetails = async (req, res) => {
  try {
    const getData = await ApartmentModel.find();
    res
      .status(200)
      .json({ data: { getData }, msg: "getting data", status: "success" });
  } catch (error) {
    res.status(500).json({ msg: "not getting data", status: "failed" });
  }
};
const getSuperDetails = async (req, res) => {
  try {
    const getData = await ApartmentModel.find();
    res
      .status(200)
      .json({ data: { getData }, msg: "getting data", status: "success" });
  } catch (error) {
    res.status(500).json({ msg: "not getting data", status: "failed" });
  }
};
const postApartment = async(req,res)=>{
    let apartmentCoverpic = req.file.path;
    const { title,typeofApartment,_id,description,area,floor,bedRooms,bathRooms,terrace, parking, price,advancePaymentForRent,country,city,status}=req?.body;
    try {
        const apartmentid = _id 
        ? await ApartmentModel.findById(id)
        : await ApartmentModel.findOne({title})
        if(apartmentid){ 
           return res.status(401).json( {apartmentid, msg:"details is already here so please add new one",status:"success"})
        }
        const admin = {
            apartmentImage:apartmentCoverpic,title,typeofApartment,description,area,floor,bedRooms,bathRooms,terrace, parking, price,advancePaymentForRent,country,city,status
        }
        const newApartment = new ApartmentModel(admin)
        await newApartment.save();
        return res.status(201).json({status:"Success", msg:"Apartment Details is created Successfully", apartmentdata:{newApartment}})
    } catch (error) {
        return res.status(501).json({status:"failed", msg:"Apartment Details is not created"})
    }
}
const putApartment = async(req,res)=>{
    const {id}= req.params;
    const {apartmentImage,title,typeofApartment,description,area,floor,bedRooms,bathRooms,terrace, parking, price,advancePaymentForRent,country,city,status}=req?.body;
     if(req.file){
        apartmentImage= req.file.path
      }
       const newApartment ={
        apartmentImage,title,typeofApartment,description,area,floor,bedRooms,bathRooms,terrace, parking, price,advancePaymentForRent,country,city,status
       }
    try {
      const edit= await ApartmentModel.findOneAndUpdate({_id:id},newApartment,{new:true});
       res.status(201).json({msg:"Edited successfully",status:"success",editApartment:edit})
    } catch (error) {
        res.status(500).json({msg:"not edited", status:"failed", error})
    }
}
const deleteApartment = async(req,res)=>{
    const {id}=req.params;
    try {
        const apartment = await ApartmentModel.findById(id);
        if(!apartment){
        return res.status(404).json({ status: "failed", msg: "Apartment not found" });
        }
        const image = apartment.apartmentImage;
        if(image){
            await fs.unlink(image)
        }
        await ApartmentModel.findByIdAndDelete({_id:id});
        return res.status(200).json({status:"success",msg:"deleted successfully"})
    } catch (error) {
         return res.status(500).json({status:"failed",msg:"not deleted",error})
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  "apartmentImages");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = "apartment-image"+ path.extname(file.originalname);
        cb(null, uniqueSuffix);
    },
});

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = ['.jpeg', '.jpg', '.png', '.gif']; // Include dots in file extensions
    const extname = path.extname(file.originalname).toLowerCase();
    
    if (fileTypes.includes(extname)) {
      return cb(null, true);
    }

    cb('Invalid file format. Only JPEG, JPG, PNG, GIF files are allowed');
  }
}).single("apartmentImage");
const filterApartment = async (req, res) => {
  try {
    const { page, limit, sortBy, sortOrder, status, ...filters } = req.query;
    const skip = (page - 1) * limit;
    const sort = {};
    if (sortBy) sort[sortBy] = sortOrder === "asc" ? 1 : -1;
    const results = await ApartmentModel.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    const totalRecords = await ApartmentModel.countDocuments(filters);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));
    const paginationInfo = {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages,
      totalRecords,
    };
    res.status(200).json({ results, paginationInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};
const searchApartment = async(req,res)=>{
    const query = req.query.q; // Assuming 'q' is the parameter for the search query
    try {
      const results = await ApartmentModel.find({
        $or: [
          { title: { $regex: query, $options: "i" } }, // Case-insensitive search
        ],
      });
      res.status(200).json({status:"Success", msg:"Search the data", search:{results}})
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = {
  getDetails,
  postApartment,
  uploadImage,
  putApartment,
  deleteApartment,
  filterApartment,
  searchApartment,
  getSuperDetails,
  adminDetails
}