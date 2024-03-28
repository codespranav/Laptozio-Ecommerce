import mongoose from 'mongoose'

const ProductModel = new mongoose.Schema({
    product_name:{
        required: true,
        type: String
    },
    product_desc:{
        required: true,
        type: String
    },
    category: {
        type: String,
    },
    product_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    actual_price:{
        required: true,
        type: Number
    },
    discounted_price:{
        required: false,
        type: Number
    },
    product_quantity:{
        required: true,
        type: Number,
        min: 0
    },
    inStock:{
        type: Boolean,
        default: true
    },
    photo: {
        data: Buffer, // You may want to change this to an array of image URLs or a file upload strategy
        contentType: String
    },
}, {timestamps: true})

const prodSchema = mongoose.model("Product", ProductModel)
export default prodSchema;
