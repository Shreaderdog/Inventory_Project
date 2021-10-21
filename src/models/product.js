const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    prodNumber: {
        type: String,
        required: true
    },
    prodName: {
        type: String,
        required: true
    },
    prodPrice: {
        type: String,
        required: true
    },
    unitAmount: {
        type: Number,
        required: true
    },
    stock: {
        type: Map,
        of: Number
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;