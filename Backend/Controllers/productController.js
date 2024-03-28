import ProductModel from '../Models/ProductModel.js'
import slugify from 'slugify'
import fs from 'fs'
import * as mongoose from 'mongoose';

export const addProductController = async (req, res) => {
    try {
        const { product_name, product_desc, product_category, actual_price, discounted_price, product_quantity } = req.fields
        const { photo } = req.files;

        switch (true) {
            case !product_name:
                throw { status: 400, message: "Product name is a required field" };
            case !product_desc:
                throw { status: 400, message: "Add product description" };
            case !product_category:
                throw { status: 400, message: "Add product category" };
            case !actual_price:
                throw { status: 400, message: "Actual price field is missing value" };
            case !product_quantity:
                throw { status: 400, message: "Product quantity field is missing value" };
        }

        // Add the data to the database
        let products = new ProductModel({
            ...req.fields, slug: slugify(product_name)
        });

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products
        });
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || "Internal server error occurred";
        res.status(status).send({
            success: false,
            message,
            error
        });
    }
}

// get product Controller
export const getProductController = async(req, res)=>{
    try {
        let data = await ProductModel.find({}).sort({ createdAt: -1 }).populate("product_category");
        if(data){
            res.status(200).send({
                success: true,
                message: "Product Fetched Successfully",
                data
            })
        }
        else{
            res.status(500).send(
                {
                    success: false, 
                    message: "Something went wrong"
                }
                )
        }    
    } catch (error) {
        res.status(500).send({
            success: false, 
            message: "Internal server error occured"
        })
    }
}

export const getPhotoController = async (req, res)=> {
    try {
        const pid = req.params.pid
        const product = await ProductModel.findById(pid).select('photo');

        if (!product) {
            return res.status(404).send({
              success: false,
              error: "Product not found",
            });
          }

          if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
          } else {
            return res.status(404).send({
              success: false,
              error: "Photo data not found for the product",
            });
          }
    } catch (error) {
        res.status(500).send({
            success: false, 
            message: "Internal server error occured",
            error: error
        })
    }
}

// delete product controller
export const deleteProductController = async (req, res) => {
    try {
        let result = await ProductModel.findByIdAndDelete(req.params.pid);

        if (result) {
            res.status(200).send({
                success: true,
                message: "Product Deleted Successfully"
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Product Not Found"
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        });
    }
};


export const updateProductController = async (req, res)=>{
    try {
        const {pid} = req.params;
        const { product_name, product_desc, product_category, actual_price, discounted_price, product_quantity } = req.fields
        const {photo} = req.files

        switch (true) {
            case !product_name:
                throw { status: 400, message: "Product name is a required field" };
            case !product_desc:
                throw { status: 400, message: "Add product description" };
            case !product_category:
                throw { status: 400, message: "Add product category" };
            case !actual_price:
                throw { status: 400, message: "Actual price field is missing value" };
            case !product_quantity:
                throw { status: 400, message: "Product quantity field is missing value" };
        }

        let updateProduct = await ProductModel.findByIdAndUpdate(pid, {
            ...req.fields, slug: slugify(product_name)
        }, {new: true});

        if(photo){
            updateProduct.photo.data = fs.readFileSync(photo.path)
            updateProduct.photo.contentType = photo.type
        }

        await updateProduct.save();
        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            updateProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: "Error while updating", error: error})
    }
}


export const separateProductController = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await ProductModel.find({category: category});
        res.send({ message: "Product Fetched", products });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error occurred", error, category });
    }
};


export const filterProductController = async (req, res) => {
    try {
        const { priceFilter } = req.body;
        let args = {};
        if(priceFilter.length) args.actual_price = { $gte: priceFilter[0], $lte: priceFilter[1] };

        const prod = await ProductModel.find(args);
        res.status(200).send({
            success: true,
            message: "Product Fetched",
            prod
        });
    } catch (error) {
        res.status(error.status || 500).send({
            success: false,
            message: error.message || "Something went wrong",
            error
        });
        console.log(error);
    }
};
