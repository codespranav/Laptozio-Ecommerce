import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

// Require Sign In Middleware
export const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Set the decoded user information in req.user
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

// isAdmin Middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== 0) { // Check the user's role
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};
