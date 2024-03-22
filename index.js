const express = require('express');
const cors = require('cors')
const dotenv = require("dotenv");
const { connection } = require('./Config/db');
const {adminRoute }= require("./Routes/admin.routes");
const { landLordRouter } = require('./Routes/landLord.routes');
const { leaseRouter } = require('./Routes/lease.routes');
const { utilityRouter } = require('./Routes/utility.routes');
const { paymentRouter } = require('./Routes/payment.routes');
const { vacateRouter } = require('./Routes/vacate.routes');
const { systemRouter } = require('./Routes/system.routes');
const { featureRoute } = require('./Routes/feature.routes');
const { amenitiesRoute } = require('./Routes/amenities.routes');
const { amountRouter } = require('./Routes/amount.routes');
const { leaseTypeRouter } = require('./Routes/leaseTypes.routes');
const { profileRouter } = require('./Routes/Profile.routes');
const { tentantRouter } = require('./Routes/tentant.routes');
const { invoiceRouter } = require('./Routes/invoice.routes');
const { apartmentRouter } = require('./Routes/apartment.routes');
const { feedbackRoute } = require('./Routes/feedback.routes');
const { notificationRoute } = require('./Routes/notification.routes');
const { addtocartRouter } = require('./Routes/addtocart.routes');
const app = express();
dotenv.config();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use('/contractImages', express.static("contractImages"));
app.use('/logo', express.static("logo"));
app.use('/apartmentImages',express.static('apartmentImages'));
app.use("/adharCardPdf",express.static("adharCardPdf"));
app.use("/paymentImages",express.static("paymentImages"));
// app.use("/PanCardPdf",express.static("PanCardPdf"));
app.use("/admin",adminRoute);
app.use("/tentants",notificationRoute);
app.use("/landlord",landLordRouter);
app.use("/utility",utilityRouter);
app.use("/payment",paymentRouter);
app.use("/leases",leaseRouter);
app.use("/system_lease",leaseTypeRouter);
app.use("/system",systemRouter);
app.use("/properties", featureRoute);
app.use("/amenities",amenitiesRoute);
app.use("/feedback", feedbackRoute);
app.use("/amount",amountRouter)
app.use("/profile-data",profileRouter)
app.use("/tentants",tentantRouter)
app.use("/vacatenotices", vacateRouter);
app.use("/invoice",invoiceRouter);
app.use("/apartment",apartmentRouter);
app.use("/cart",addtocartRouter)
app.get("/",(req,res)=>{
    res.send("Welcome to  Apartment Website")
})
app.listen(port,async()=>{
    try {
        await connection;
        console.log("Database is connected Successfully");
    } catch (error) {
       console.log("Database is not connected")
    }
    console.log(`listening port is ${port}`)
})