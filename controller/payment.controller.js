const { PaymentModal } = require("../modal/payment.modal");
const QrCode = require("qrcode");
const multer = require("multer");
const path = require("path");
const { PaymentD } = require("../modal/screenshotPayment.modal");
const getPayment = async (req, res) => {
  const { amount } = req.body;
  try {
    const getNewPayment = await PaymentModal.find(amount);
    res.status(200).send({ Payment: getNewPayment, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error" });
  }
};
const postPayment = async (req, res) => {
  const {
    paymentTentant,
    amount,
    paymentMethod,
    paymentDate,
    apartmentId,
    qrCodeLink,
    _id,
  } = req?.body;
  const newPayment = {
    paymentTentant,
    amount,
    paymentMethod,
    paymentDate,
    apartmentId,
    qrCodeLink,
  };
  try {
    const paymentcode = await PaymentModal.findById(_id);
    if (!paymentcode) {
      return res.status(400).json({ msg: "payment is already done" });
    }
    const qrCodeLink = await generateqrCode(newPayment);
    const payment = await PaymentModal({ ...newPayment, qrCodeLink });
    await payment.save();
    res
      .status(200)
      .json({ AddPayment: payment, qrCodeLink, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error" });
  }
};
async function generateqrCode(data) {
  try {
    const qrcode = JSON.stringify(data);
    const paymentcode = await QrCode.toDataURL(qrcode);
    console.log(paymentcode);
    return paymentcode;
  } catch (error) {
    throw error;
  }
}
const screentShot = async (req, res) => {
    let image = req.file ? req.file.path:null;
  try {
    const { transactionId, name, paymentDate, screenShot, approve } = req.body;
    const existingPayment = await PaymentD.findOne({ transactionId });
    if (existingPayment) {
      return res
        .status(400)
        .json({ status: "error", message: "Payment already exists" });
    }
    const newPayment = new PaymentD({
      transactionId,
      name,
      screenShot: image,
      paymentDate,
      approve,
    });
    await newPayment.save();
    res.status(201).json({ status: "success", payment: newPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
const getScreenshot = async(req,res)=>{
    try {
        const  payment = await PaymentD.find();
         res.status(200).json({msg:"getting payment Details", status:"success", payment})
    } catch (error) {
        throw error
    }
}

const getApprove = async (req, res) => {
    const {id} = req.params;
    const {approve}= req.body;
  try {
    const payment = await PaymentD.findByIdAndUpdate({_id:id}, {approve}, {new:true});
    res
      .status(200)
      .json({ msg: "getting payment Details", status: "success", payment });
  } catch (error) {
    throw error;
  }
};
const readApprove=async(req,res)=>{
    try {
        const approve = await PaymentD.find();
        res.status(200).json({msg:"you are book the room successfully", approve})
    } catch (error) {
        throw error
    }
}
// const putPayment = async (req, res) => {
//     const { id } = req.params;
//     const { paymentTentant, paymentLease, amount, paymentMethod, paymentDate, paidBy, referenceNumber, beingPaymentFor, extraNotes } = req.body;
//     const newPayment = {
//         paymentTentant, paymentLease, amount, paymentMethod, paymentDate, paidBy, referenceNumber, beingPaymentFor, extraNotes
//     }
//     try {
//         await PaymentModal.findOneAndUpdate({ _id: id }, newPayment, { new: true })
//         res.status(200).send({ status: "success", msg: "edit successfully", editPayment: newPayment });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ msg: "something went wrong", status: "error" })
//     }

// }
// const deletePayment = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletePayment = await PaymentModal.findOneAndDelete({ _id: id })
//         // console.log(deleteLease);
//         res.status(200).send({ status: "success", delete: deletePayment })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ status: "error" })
//     }
// } 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./paymentImages");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // 50 MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = [".png", ".jpg", ".jpeg", ".gif",".webp"];
    const extname = path.extname(file.originalname).toLowerCase();
    if (fileTypes.includes(extname)) {
      return cb(null, true);
    }
    cb("Invalid file format. Only pdf  are allowed");
  },
}).single("screenShot");
module.exports = {
  getPayment,
  postPayment,
  upload,
  screentShot,
  getScreenshot,
  getApprove,
  readApprove,
  // putPayment,
  // deletePayment
};
