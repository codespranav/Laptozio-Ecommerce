import express from "express"
import { loginController, registerController } from "../Controllers/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

const router = express.Router();


// Register Controller
router.post("/register", registerController)

// Login Controller
router.post("/login", loginController)

// Check user sign in
router.get("/user-auth", requireSignin, (req, res)=>{
    return res.send({
        ok: true
    })
})

// Admin Dashboard Access
router.get("/admin-auth", requireSignin, isAdmin, (req, res)=>{
    return res.send({
        ok: true,
        message: "Admin Logged in "
    })
})

export default router;