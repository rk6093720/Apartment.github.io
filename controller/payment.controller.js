const { PaymentModal } = require("../modal/payment.modal");
const QrCode = require("qrcode");
const getPayment = async(req,res)=>{
    const {amount}= req.body;
    try {
        const getNewPayment = await PaymentModal.find(amount)
        res.status(200).send({ Payment: getNewPayment, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" });
    }
}
const postPayment = async(req,res)=>{
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
        if(!paymentcode){
            return res.status(400).json({ msg:"payment is already done"})
        }
       const qrCodeLink = await generateqrCode(newPayment);
       const payment = await PaymentModal({ ...newPayment, qrCodeLink });
       await payment.save();
     res.status(200).json({ AddPayment: payment, qrCodeLink,status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error" }) 
    }
}
async function generateqrCode(data){
    try {
        const qrcode = JSON.stringify(data);
        const paymentcode = await QrCode.toDataURL(qrcode);
        console.log(paymentcode)
        return paymentcode;
    } catch (error) {
       throw error
    }
}
const putPayment = async (req, res) => {
    const { id } = req.params;
    const { paymentTentant, paymentLease, amount, paymentMethod, paymentDate, paidBy, referenceNumber, beingPaymentFor, extraNotes } = req.body;
    const newPayment = {
        paymentTentant, paymentLease, amount, paymentMethod, paymentDate, paidBy, referenceNumber, beingPaymentFor, extraNotes
    }
    try {
        await PaymentModal.findOneAndUpdate({ _id: id }, newPayment, { new: true })
        res.status(200).send({ status: "success", msg: "edit successfully", editPayment: newPayment });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }

}
const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletePayment = await PaymentModal.findOneAndDelete({ _id: id })
        // console.log(deleteLease);
        res.status(200).send({ status: "success", delete: deletePayment })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}
module.exports={
    getPayment,
    postPayment,
    putPayment,
    deletePayment
}