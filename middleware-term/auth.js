const jwt = require("jsonwebtoken");
const key = process.env.MIDDLE_USER;
const secret = process.env.ADMIN;
const jwtSecret = process.env.JWT_SECRET;
const middleware ={
   userMiddleware : (req, res, next)=> {
  const token = req.headers.authorization?.split(" ")[1]; // Safely access the token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
  if (token) {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      } else {
        // console.log("Token Decoded:", decoded);
        // You may attach the decoded token to the request for subsequent middleware
        req.decodedToken = {
          email: decoded.email,
          iat: decoded.iat,
          exp: decoded.exp,
        };
        next(); // Pass control to the next middleware
      }
    });
  }
},
 adminMiddleware: (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Safely access the token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  } else {
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.error("JWT Verification Error:", err.message);
          return res
            .status(401)
            .json({ message: "Unauthorized: Invalid token" });
        } else {
          // console.log("Token Decoded:", decoded);
          // You may attach the decoded token to the request for subsequent middleware
          req.decodedToken = {
            email: decoded.email,
            iat: decoded.iat,
            exp: decoded.exp,
          };
          next(); // Pass control to the next middleware
        }
      });
    }
  }
},
superAdminMiddleware : (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Safely access the token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    } else {
      console.log("Token Decoded:", decoded);
      // You may attach the decoded token to the request for subsequent middleware
      req.decodedToken = {
        email: decoded.email,
        iat: decoded.iat,
        exp: decoded.exp,
      };
      next(); // Pass control to the next middleware
    }
  });
}
}
module.exports = {
  middleware
};