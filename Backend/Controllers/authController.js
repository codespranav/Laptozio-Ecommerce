import { comparePassowrd, hashPassword } from "../Helper/authHelper.js";
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken"

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      res.status(200).send({
        success: false,
        message: "Name cannot be empty",
      });
    }
    if (!email) {
      res.status(200).send({
        success: false,
        message: "Email cannot be empty",
      });
    }
    if (!password) {
      res.status(200).send({
        success: false,
        message: "Password cannot be empty",
      });
    }
    const isUser = await User.findOne({ email });
    console.log(isUser);
    if (isUser) {
      res.status(400).send({
        success: false,
        message: "user already exist",
      });
    }
    else{

 
    // Password hashing
    const newHashedPassword = await hashPassword(password);
    const createUser = await new User({
      name,
      email,
      password: newHashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registation Successfully",
    });
  }
} catch (error) {
  console.error(error);
  res.status(500).send({
    success: false,
    message: "Internal Server Error",
  });
}
  };

// LOGIN Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(200).send({
        success: false,
        message: "Email cannot be empty",
      });
    }
    if (!password) {
      res.status(200).send({
        success: false,
        message: "Password cannot be empty",
      });
    }

    // Check user is available or not
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(200).send({
        success: false,
        message: "User does not exists",
      });
    }

    // Login User
    const checkPassword = await comparePassowrd(
      password,
      checkUser.password
    );
    if (!checkPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = await jwt.sign({_id: checkUser._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: "80d"
    })
    res.status(200).send({
      success: true,
      message: "User logged in",
      user: {
          name: checkUser.name,
          email: checkUser.email,
          role: checkUser.role
      },
      token: token
    });
  } catch (error) {
    console.log(error);
  }
};
