import jwt from "jsonwebtoken"
import { generateError } from "./generateErr.js"
// middleware
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization : '';
    if (!token) {
      return next(generateError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) 
        return next(generateError(403, "Token is not valid!"));
      req.user = user;
      next();
    });
  };
  
  export const verifyUser = (req, res, next) => {
    verifyToken(req, res,next, () => {
      if (req.user.id === req.params.id) {
        console.log(">>userID is true")
        next();
      } else {
        return next(generateError(403, "You are not authorized!"));
      }
    });
  };
  
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      console.log(req.user);
      if (req.user.isAdmin) {
        next();
      } else {
        return next(generateError(403, "You are not authorized!"));
      }
    });
  };