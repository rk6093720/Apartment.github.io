const { LandlordModal } = require("../modal/landLord.modal");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const moment = require("moment");
const filterLandlord = async (req, res) => {
    try {
        const { page, limit, sortBy, sortOrder,status, ...filters } = req.query;
        const skip = (page - 1) * limit;
        const sort = {};
        if (sortBy) sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        const results = await LandlordModal.find(filters)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));
         const totalRecords = await LandlordModal.countDocuments(filters);
        const totalPages = Math.ceil(totalRecords / parseInt(limit));
         const paginationInfo = {
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
            totalRecords,
        };
        res.json({ results, paginationInfo });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getLandLord = async (req, res) => {
    try {
        const users = await LandlordModal.find();
        res.status(200).send({ Landlords: users, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

const postLandLord = async (req, res) => {
     let pdf =req.file.path;
    const {
        firstName,
        LastName,
        email,
        city,
        phone,
        country,
        _id,
        state,
        postalCode,
        address,
        propertyName,
        countApartment,
        adharCard,
        status,
        password,
        propertyCode
    } = req.body;
    try {
        const existingUser = _id
            ? await LandlordModal.findById(_id)
            : await LandlordModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }
        const date = moment().format("YYYY-MM-DD HH:mm:ss");
        const newUser = {
            firstName,
            LastName,
            email,
            city,
            phone,
            country,
            state,
            postalCode,
            address,
            propertyName,
            countApartment,
            adharCard,
            status,
            password,
            document: pdf, // Store the unique filename
            propertyCode,
            registerDate: date,
        };
        const newLandlord = new LandlordModal(newUser);
        await newLandlord.save();
        res.status(201).json({ status: 'success', Landlord: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
const updateLandlord=async(req,res)=>{
    const {id}= req.params;
    const { firstName,
        LastName,
        email,
        phone,
        state,
        country,
        city,
        countApartment,
        postalCode,
        address,
        registerDate,
        propertyName,
        status,
        adharCard } = req.body;
        const newLandlord={
            firstName,
            LastName,
            email,
            address,
            adharCard,
            propertyName,
            registerDate,
            status,
            postalCode,
            phone,
            countApartment,
            country,
            state,
            city
        }
    try {
        await LandlordModal.findOneAndUpdate({ _id: id, status },newLandlord,{new:true});
        res.status(200).send({status:"success",msg:"edit successfully",editLandlord:newLandlord});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:"something went wrong",status:"error"})
    }
}

const deleteLandlord =async(req,res)=>{
     const {id}= req.params;
    try {
           const apartment = await LandlordModal.findById(id);
           if (!apartment) {
             return res
               .status(404)
               .json({ status: "failed", msg: "Apartment not found" });
           }
           const image = apartment.document;
           if (image) {
             await fs.unlink(image);
           }
           await LandlordModal.findByIdAndDelete({ _id: id });
           return res
             .status(200)
             .json({ status: "success", msg: "deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error"})
    }
}
// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  "./contractImages");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = "contract-pdf"+ Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // 50 MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = ".pdf";
    const extname = path.extname(file.originalname).toLowerCase();
    if (fileTypes.includes(extname)) {
      return cb(null, true);
    }
    cb("Invalid file format. Only pdf  are allowed");
  },
}).single("document");
module.exports = {
  getLandLord,
  postLandLord,
  upload,
  updateLandlord,
  deleteLandlord,
  filterLandlord
};
