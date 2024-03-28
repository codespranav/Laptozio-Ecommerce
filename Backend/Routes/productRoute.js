import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { addProductController, getPhotoController, getProductController, deleteProductController, updateProductController, separateProductController, filterProductController, getSingleProduct } from '../Controllers/productController.js';
import formidable from "express-formidable"


const router = express.Router();

router.post("/add-product", requireSignin, isAdmin, formidable(), addProductController)

// get all products
router.get("/products", getProductController)

//get photo roue
router.get("/get-photo/:pid", getPhotoController)

//delete product router
router.delete("/delete-product/:pid", requireSignin, isAdmin, deleteProductController)

//update product
router.put("/update-product/:pid", requireSignin, isAdmin, formidable(), updateProductController)

// seperate category product
router.get("/products/:category", separateProductController)

// single product
router.get("/:productId", getSingleProduct)

//filter product 
router.get('/product-filter', filterProductController)

export default router;