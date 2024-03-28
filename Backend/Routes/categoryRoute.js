import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategories, updateCategoryController } from '../Controllers/categoryController.js';
const router = express.Router();


// Create Category Route
router.post('/create-category', requireSignin, isAdmin, createCategoryController)

// Read Category Route
router.get("/categories", getAllCategories)


// Update Category
router.put("/update-category/:id", requireSignin, isAdmin, updateCategoryController)

// Delete Category
router.delete("/delete-category/:id", requireSignin, isAdmin, deleteCategoryController)




export default router;