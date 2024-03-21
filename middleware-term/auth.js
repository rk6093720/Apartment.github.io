const jwt = require('jsonwebtoken');
const key = process.env.MIDDLE_USER;
const secret = process.env.ADMIN;
const jwtSecret = process.env.JWT_SECRET;
const middleware ={
   userMiddleware : async(req, res, next)=> {
  const token = req.headers.authorization?.split(" ")[1]; // Safely access the token
  console.log("User",token)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
  try {
      const userData =  jwt.verify(token,key);
      console.log(userData);
      next();
  } catch (error) {
    throw error;
  }
},
 adminMiddleware: async(req, res, next) => {
  const adminToken = req.headers.authorization?.split(" ")[1]; // Safely access the token
    console.log("Admin", adminToken);
  if (!adminToken) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
    try {
      const adminData = jwt.verify(adminToken, secret);
      console.log(adminData);
      next()
    } catch (error) {
      throw error;
    }
},
superAdminMiddleware : async(req, res, next) => {
  const superAdmintoken = req.headers.authorization?.split(" ")[1]; // Safely access the token
    console.log("SuperAdmin", superAdmintoken);
  if (!superAdmintoken) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  } 
    try {
      const superData = jwt.verify(superAdmintoken, jwtSecret);
      console.log(superData);
      next()
    } catch (error) {
      throw error;
    }
}
}
module.exports = {
  middleware
};