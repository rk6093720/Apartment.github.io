const { AdminModal } = require("../modal/admin.modal");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcrypt');
const session = require("express-session");
const jwtSecret= process.env.JWT_SECRET;
const nodemailer=require("nodemailer");
const secret = process.env.ADMIN;
const user = process.env.MIDDLE_USER;
const Login = async(req,res)=>{
    try {
        const { email, password,userType, createdAt, timeStamp, } = req.body;
        if (email === "admin@gmail.com") {
            const admin = await AdminModal.findOne({ email: "admin@gmail.com"})
            if (!admin) {
            const encrypt = await bcrypt.hash(password, 10);
            const newAdmin = await AdminModal({
                email,
                password: encrypt,
                userType,
                createdAt,
                timeStamp
            });
            await newAdmin.save();
           }
            if (await bcrypt.compare(password, admin.password)) {
                 const expiresInMinutes = 5; // Set expiration time in minutes
                const expirationTime = new Date(Date.now() + expiresInMinutes * 60 * 1000); 
                const token = jwt.sign({ email: admin.email,role:admin.userType }, jwtSecret, {
                    expiresIn:expiresInMinutes * 60,
                })
                const expiretoken = jwt.verify(token, jwtSecret);
                const role = admin.userType;
                if (token && role === "SuperAdmin") {
                    return res
                      .status(201)
                      .json({
                        status: "success",
                        data: {
                          token,
                          role,
                          email,
                          expiresIn: expiretoken.exp,
                        },
                      });
                }
            }else{
                return  res.status(401).json({ status: "error", error: "InvAlid Password" });  
            }
        }
    } catch (error) {
        console.error("Error in login:", error);
      return  res.status(500).send({ msg: "Internal Server Error" });
    }
}

const OwnerSignUp= async(req,res)=>{
    const { email, password, userType, createdAt, timeStamp } = req.body;
    try {
        const owner = await AdminModal.findOne({email});
        if(owner){
            return res.status(401).json({msg:"Email is Already present",status:"error"})
        }
        const hashed = await bcrypt.hash(password,10);
        const newOwner = await AdminModal({
          email,
          password: hashed,
          userType, 
          createdAt,
          timeStamp,
        });
        await newOwner.save();
        return res.status(200).json({status:"success", data:{newOwner} ,msg:"Signup is Created Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:"error",msg:"Signup is not Created"})
    }
}
const OwnerLogin = async(req,res)=>{
    const {email,password}= req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ status: "Error", msg: "Email and password are required" });
        }
        const login = await AdminModal.findOne({email})
        if(!login){
            return res.status(401).json({status:"Error", msg:"Email is Already Present"})
        }
        if(await bcrypt.compare(password,login.password)){
            // console.log(session)
            const token = jwt.sign(
              { email: login.email, role: login.userType },
              secret,
              {
                expiresIn: "20m",
              }
            );
             const expiretoken = jwt.verify(token, secret);
            const role = login.userType;
            if (token && role === "Admin" ) {
                    return res
                      .status(200)
                      .json({
                        status: "success",
                        data: {
                          token,
                          role,
                          email,
                          adminTokenExpire: expiretoken.exp,
                        },
                        msg: "Admin has login here",
                      });
             }
            else{
                return res.status(401).json({ status: "error", error: `Not an ${role}` , msg:" it is only for admin" });
             }
        }else{
        return  res.status(401).json({ status: "error", error: "InvAlid Password",msg:"Invalid Password" });  
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Error",msg:"something went wrong"})
    }
}
const UserLogin = async(req,res)=>{
    const {email,password}= req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ status: "Error", msg: "Email and password are required" });
        }
        const login = await AdminModal.findOne({email})
        if(!login){
            return res.status(401).json({status:"Error", msg:"Email is Already Present"})
        }
        if(await bcrypt.compare(password,login.password)){
          const token = jwt.sign(
            { email: login.email, role: login.userType },
            user,
            {
              expiresIn: "30m",
            }
          );
              const role = login.userType;
          const expiretoken = jwt.verify(token, user);
          if (token && role === "User") {
            return res.status(200).json({
              status: "success",
              data: { token, role, email, expire: expiretoken.exp },
              msg: "User has login here",
            });
          } else {
            return res
              .status(401)
              .json({
                status: "error",
                error: `Not an ${role}`,
                msg: " it is only for  user",
              });
          }
        }else{
            console.log("invaalid pwd")
        return  res.status(401).json({ status: "error", error: "InvAlid Password",msg:"Invalid Password" });  
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Error",msg:"something went wrong"})
    }
}
const adminData=async(req,res)=>{
    const { token } = req.body;
    console.log(token)
    try {
        const user = jwt.verify(token, jwtSecret, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if (user == "token expired") {
            return res.status(401).json({ status: "error", data: "token expired" });
        }

        const userEmail = user.email;
        AdminModal.find( userEmail )
            .then((data) => {
                res.status(200).json({ status: "success", data: data });
            })
            .catch((error) => {
                res.status(401).json({ status: "error", data: error });
            });
    } catch (error) {
        res.status(500).json({ status: "error", data: error });
     }
}
const forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await AdminModal.findOne({ email });
        if (!oldUser) {
            return res.status(401).json({ status: "admin Not Exists!!" });
        }

        const secret = jwtSecret + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "15m",
        });

        const setUserToken = await AdminModal.findByIdAndUpdate(
            { _id: oldUser._id },
            { verifyToken: token, new: true }
        );

        const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
        const htmlcode = `http://127.0.0.1:5500/resetPassword.html/${oldUser._id}/${token}`
        if (setUserToken) {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "rk6093720@gmail.com",
                    pass:process.env.PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });

            var mailOptions = {
                from: "rk6093720@gmail.com",
                to: email,
                subject: "Password Reset",
                text: link,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.status(401).json({ message: "email not send" });
                } else {
                    // console.log("Email sent: " + info.response);
                    if(htmlcode){
                               return res.json({
                                 message: "email sent successfully",
                                 data: info.response,
                                 htmlcode,
                                 status: "success",
                               });

                    }else{
                               return res.json({
                                 message: "email sent successfully",
                                 data: info.response,
                                 link,
                                 status: "success",
                               });
                    }
                }
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ e: "do not sent on email", status: "error" });
    }
};

// get request for reset password 
const resetPassword= async(req,res)=>{
    const { id, token } = req.params;
    console.log(id,token);
    // console.log(req.params);
    const oldUser = await AdminModal.findOne({_id: id, verifyToken: token });
    if (!oldUser) {
        return res.status(401).json({ status: "Admin Not Exists!!" });
    }
    const secret = jwtSecret + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
     return    res.status(200).json({email:verify.email,id:verify._id,status:"verified"})
    } catch (error) {
     return   res.status(500).json({msg:"Not Verified"});
    } 
}
//post request of forget-password
const postResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
   const oldUser = await AdminModal.findOne({_id: id ,verifyToken:token});
    if (!oldUser) {
        return res.status(401).json({ status: "Admin Not Exists!!" });
    }
    const secret = jwtSecret + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await AdminModal.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );

     return   res.status(200).json( { email: verify.email,verifyToken:verify.token,id:verify._id, status: "verified" });
    } catch (error) {
        console.log(error);
       return res.status(500).json({ status: "Something Went Wrong" });
    }
} 
const Logout = async (req, res) => {
    const { id } = req.params;

    try {
        // Assuming you have a UserSession model to track logout times
        const logoutTime = new Date();

        // Create a new UserSession document to record the logout time
        const userSession = new UserSession({
            id, // Assuming id is the user's ID
            logoutTime,
        });

        // Save the UserSession document to your database
        await userSession.save();

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging out' });
    }
};


module.exports={
    Login,
   forgetPassword,
    resetPassword,
    postResetPassword,
    adminData,
    Logout,
    OwnerLogin,
    OwnerSignUp,
    UserLogin
}