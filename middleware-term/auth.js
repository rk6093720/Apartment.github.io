const jwt = require("jsonwebtoken");
const key = process.env.MIDDLE_USER;
const secret = process.env.ADMIN;
const jwtSecret = process.env.JWT_SECRET;
const guardFactory = require("express-jwt-permissions");
const guard = guardFactory();
const middleware = (req, res, next) => {
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
};
const adminMiddleware = (req, res, next) => {
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
};
const superAdminMiddleware = (req, res, next) => {
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
};
function getUserRoleSomehow(req){
 const token = req.headers.authorization?.split(" ")[1];
  const decodedToken = jwt.decode(token);
  return decodedToken.role
}

guard.check= (...roles) => {
    return (req, res, next) => {
      // Assume you have a way to determine the user's role, such as from a token
      const userRole = getUserRoleSomehow(req); // You need to implement this function
      // Check if the user's role matches any of the allowed roles
      if (roles.includes(userRole)) {
        req.userRole = userRole; // Attach the role information to the request object
        next(); // User is authorized, proceed to the next middleware or route handler
      } else {
        res.status(403).send("Unauthorized"); // User role does not match, send a forbidden status
      }
    };
  },

module.exports = {
  middleware,
  adminMiddleware,
  superAdminMiddleware,
  guard
};
