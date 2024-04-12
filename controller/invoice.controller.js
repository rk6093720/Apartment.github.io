const { InvoiceModal } = require("../modal/invoice.modal");

const getInvoice = async(req,res)=>{
    try {
        const invoice = await InvoiceModal.find();
        return res.status(200).json({status:"success", msg:"Getting Data", Invoice:invoice})
    } catch (error) {
        return res.status(500).json({status:"error", msg:"Not getting data"})
    }
}
const postInvoice = async(req,res)=>{
    const {
     apartmentName,
    apartmentImage,
    apartmentAddress,
    ownerEmail,
    ownerPhone,
   invoice,
   date,
   apartmentType,
   username,
   userAddress,
   userPhone,
   paymentStatus,
   water,
   electricity,
   month,
   year,
   rent
    } = req.body;
    const {_id}=req.params;
    try {
        const existInvoice = _id
        ? await InvoiceModal.findById(_id)
        : await InvoiceModal.findOne({invoice});
        if(existInvoice){
            return res.status(401).json({status:"error",msg:"Invoice is already present"})
        }
        const newInvoice = {
          apartmentImage,
          apartmentName,
          apartmentAddress,
          ownerEmail,
          ownerPhone,
          invoice:generateInvoicenumber(),
          date,
          apartmentType,
          username,
          userAddress,
          userPhone,
          totalAmount: `₹${Amount(water,electricity,rent)}`,
          paymentStatus,
          water,
          electricity,
          month,
          year,
          rent
        };
        const dataInvoice = new InvoiceModal(newInvoice);
        await dataInvoice.save();
        return res.status(200).json({status:"Success",msg:"Invoice is create Successfully", AddInvoice:dataInvoice})
    } catch (error) {
       return  res.status(500).json({status:"Error",msg:"Invoice is not create Successfully"})
    }

}
const putInvoice = async(req,res)=>{
    const {id} = req.params;
    const {
      apartmentName,
      apartmentImage,
      apartmentAddress,
      ownerEmail,
      ownerPhone,
      invoice,
      date,
      apartmentType,
      username,
      userAddress,
      userPhone,
      totalAmount,
      paymentStatus,
      water,
      electricity,
      month,
      year,
      rent,
    } = req.body;
    const newInvoice = {
      apartmentName,
      apartmentImage,
      apartmentAddress,
      ownerEmail,
      ownerPhone,
      invoice,
      date,
      apartmentType,
      username,
      userAddress,
      userPhone,
      totalAmount,
      paymentStatus,
      water,
      electricity,
      month,
      year,
      rent,
    };
    try {
        const editInvoice = await InvoiceModal.findOneAndUpdate({_id:id},newInvoice, {new:true});
        return res.status(200).json({status:"Success", msg:"edited Successfully",editInvoice})
    } catch (error) {
    return res.status(500).json({status:"error",msg:"not edited"})
    }
}
const deleteInvoice= async(req,res)=>{
    const {id}= req.params;
    try {
        const invoice = await InvoiceModal.findOneAndDelete({_id:id});
        return res.status(200).json({status:"success", msg:"deleted Successfully",invoice})
    } catch (error) {
        return res.status(500).json({status:"error",msg:"not deleted"})
    }
}
function generateInvoicenumber(){
    return `INV-00${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`;
}
function Amount(water, electricity,rent){
    let sum =0;
    sum = sum + water + electricity + rent;
    return sum;
}
module.exports ={
    getInvoice,
    postInvoice,
    putInvoice,
    deleteInvoice
}