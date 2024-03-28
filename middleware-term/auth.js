const jwt = require("jsonwebtoken");
const { MIDDLEUSER, ADMIN, JWTSECRET } = process.env;
const middleware = {
  userMiddleware: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      console.log("User Token:", token);
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
      }
      const userData = await verifyToken(token, MIDDLEUSER);
      console.log("User Data:", userData);
      // Attach user data to request object for further processing
      req.user = userData;
      next();
    } catch (error) {
      console.error("User middleware error:", error);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  },
  adminMiddleware: async (req, res, next) => {
    try {
      const adminToken = req.headers.authorization?.split(" ")[1];
      console.log("Admin Token:", adminToken);
      if (!adminToken) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
      }
      const adminData = await verifyToken(adminToken,ADMIN);
      console.log("Admin Data:", adminData);
      // Attach admin data to request object for further processing
      req.admin = adminData;
      next();
    } catch (error) {
      console.error("Admin middleware error:", error);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  },
  superAdminMiddleware: async (req, res, next) => {
    try {
      const superAdminToken = req.headers.authorization?.split(" ")[1];
      console.log("SuperAdmin Token:", superAdminToken);
      if (!superAdminToken) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
      }
      const superData = await verifyToken(superAdminToken, JWTSECRET);
      console.log("SuperAdmin Data:", superData);
      // Attach super admin data to request object for further processing
      req.superAdmin = superData;
      next();
    } catch (error) {
      console.error("SuperAdmin middleware error:", error);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  },
};

async function verifyToken(token, secretKey) {
  return new Promise((resolve, reject) => {
    jwt.verify(token,secretKey,(err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = { middleware, verifyToken };
