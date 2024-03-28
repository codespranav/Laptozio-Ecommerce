import CategoryModel from "../Models/CategoryModel.js";
import slugify from "slugify";

// Create Category
export const createCategoryController = async (req, res)=> {
    try {
        const {name} = req.body
        if(!name){
            res.status(400).send({
                success: false,
                message: "Enter category name"
            })
        }

        const isCat = await CategoryModel.findOne({name});
        if(isCat){
            return res.status(200).send({
                success: false,
                message: "Category already listed"
            })
        }
        const newCategory = new CategoryModel({ name, slug: slugify(name) });
        await newCategory.save();
        
        res.status(200).send({success: true, message: "Category added"})
    } catch (error) {
        console.log(error);
        res.status(501).send({success: false, message: "Error while creating new category"})
    }
}

// Get All Categories
export const getAllCategories = async(req, res)=> {
    try {
        const fetchCategories = await CategoryModel.find({});
        res.status(200).send({
            success: true,
            message: "Categories Fetched",
            fetchCategories
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({success: false, message: "Error while fetching categories"})
    }
}

// Update Category
export const updateCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        const updateCat = await CategoryModel.findByIdAndUpdate(id, {
            name,
            slug: slugify(name)
        }, {new: true})
        
        res.status(200).send({ 
            success: true,
            message: "Category updated",
            updateCat})
    } catch (error) {
        console.log(error);
        res.status(501).send({success: false, message: "Error while updating category"})
    }
}


// Delete Category
export const deleteCategoryController = async (req, res)=> {
    try {
        const {id}= req.params;
        const deleteCategory = await CategoryModel.findByIdAndDelete({_id: id})
        if(!deleteCategory){
            res.send("Error")
        }
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({success: false, message: "Error while deleting category"})
    }
}