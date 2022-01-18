const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// กำหนดโครงสร้างของ document product
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    unit_in_stock: Number,
    reviews: [
        {
            star: Number,
            comment: String
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);