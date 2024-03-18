const { TentantModal } = require("../modal/tentant.modal");
const multer = require("multer");
const path = require("path");
const getTentant = async(req,res)=>{
    try {
        const getNewTentant = await TentantModal.find()
        res.status(200).json({ Tentant: getNewTentant, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error" });
    }
}
const postTentant = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    residentalAddress,
    currentAddress,
    registrationofRoomRent,
    approve,
  } = req.body;
  const { _id } = req.params;
  try {
    
      const aadharCard = req.files["aadharCard"]
        ? req.files["aadharCard"][0].filename
        : null;
      // const panCard = req.files["panCard"] ? req.files["panCard"][0].filename
      //   : null;
    const existingTentant = _id
      ? await TentantModal.findById(_id)
      : await TentantModal.findOne({ email });

    if (existingTentant) {
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });
    }
    const newTentant = {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      residentalAddress,
      currentAddress,
      aadharCard,
      // panCard,
      registrationofRoomRent,
      approve,
    };
    const post_request = await TentantModal(newTentant);
    await post_request.save();
    res.status(200).json({ AddTentant: post_request, status: "success", msg:"User is Create Successfully " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error",msg:"something went wrong" });
  }
};

const editTentant = async(req,res)=>{
    const {id} = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      residentalAddress,
      currentAddress,
      registrationofRoomRent,
      approve
    } = req.body;
        const aadharCard = req.files["aadharCard"]
          ? req.files["aadharCard"][0].filename
          : null;
        // const panCard = req.files["panCard"]   ? req.files["panCard"][0].filename
        //   : null;
         const newTentant = {
           firstName,
           lastName,
           email,
           phone,
           dateOfBirth,
           residentalAddress,
           currentAddress,
           aadharCard,
          // panCard,
           registrationofRoomRent,
           approve,
         };
    try {
        const newEditTentants= await TentantModal.findOneAndUpdate({_id:id},newTentant,{new:true})
        res.status(200).json({ status: "success", msg: "edit successfully", editTentant: newEditTentants });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong", status: "error" })
    }
}
const deleteTentant = async(req,res)=>{
    const { id } = req.params;
    try {
       const tentant = await TentantModal.findById(id);
       if (!tentant) {
         return res
           .status(404)
           .json({ status: "failed", msg: "Apartment not found" });
       }
       const aadharCard = tentant.aadharCard;
       if (aadharCard) {
         await fs.unlink(aadharCard);
       }
      //  const panCard = tentant.panCard;
      //  if (panCard) {
      //    await fs.unlink(panCard);
      //  }
        const deleteTentant = await TentantModal.findOneAndDelete({ _id: id })
        res.status(200).json({ status: "success", delete: deleteTentant })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error" })
    }

}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
        cb(null,  "./AdharCardPdf");
    },
  filename: function (req, file, cb) {
    const uniqueSuffix =   Date.now() + path.extname(file.originalname);
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
}).fields([{name:"aadharCard",maxCount:1},{name:"panCard",maxCount:1}]);

module.exports = {
  getTentant,
  postTentant,
  upload,
  editTentant,
  deleteTentant
};