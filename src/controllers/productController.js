const Product = require('../models/productModel');
exports.getProducts = async (req, res) => {
    Product.find() // db.products.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getProductById = async (req, res) => {
    Product.findById(req.params.id) // db.products.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getProductByName = async (req, res) => {
    Product.find({
            name: new RegExp(req.params.name)
        }) // /Macbook/
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.addProduct = async (req, res) => {
    try {
        let product = new Product({
            name: req.body.name,
            price: req.body.price,
            unit_in_stock: req.body.unit_in_stock
        });
        // เก็บผลลัพธ์จากการเพิ่มข้อมูล
        let createdProduct = await product.save(); //asynchronous
        res.status(200).json({
            msg: "Add a product complete.",
            data: createdProduct
        });
    } catch (err) {
        // เมื่อเกิด error จะส่ง error message ออกไปด้วย
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.editWholeProduct = async (req, res) => {
    // req.params.id = id ของ product ที่ต้องการ update
    // req.body = ข้อมูล product ที่จะ update
    let product = {
        name: req.body.name,
        price: req.body.price,
        unit_in_stock: req.body.unit_in_stock
    };
    Product.findByIdAndUpdate(req.params.id, product)
        .exec((err, result) => {
            // findById อีกครั้งเพื่อเอา data ใหม่
            Product.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};
// สมมติว่า edit โดยการเพิ่ม review
exports.editProduct = async (req, res) => {
    let reviewData = {
        $push: {
            reviews: {
                star: req.body.star,
                comment: req.body.comment
            }
        }
    };
    Product.findByIdAndUpdate(req.params.id, reviewData)
        .exec((err, result) => {
            // findById อีกครั้งเพื่อเอา data ใหม่
            Product.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

exports.deleteProduct = async (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: `Product id ${req.params.id} is deleted.`
            });
        });
};