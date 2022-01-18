const Product = require('../models/productModel');
exports.getProducts = async (req, res) => {
    Product.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getProductById = async (req, res) => {
    Product.findById(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getProductByName = async (req, res) => {
    // req.params.name
    Product.find({
            name: new RegExp(req.params.name)
        }) // { name: /xxxx/}
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.addProduct = async (req, res) => {
    // let mongoose add a new product document
    try {
        //กำหนดค่า product ที่ต้องการเพิ่ม
        let product = new Product({
            name: req.body.name,
            price: req.body.price,
            unit_in_stock: req.body.unit_in_stock
            // not yet review
        });
        let createdProduct = await product.save();
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
    let product = {  //ข้อมูลใหม่
        name: req.body.name,
        price: req.body.price,
        unit_in_stock: req.body.unit_in_stock
    };
    Product.findByIdAndUpdate(req.params.id, product)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
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

// add review ทำใน editProduct
exports.editProduct = async (req, res) => {
    let reviewData = {
        $push: {
            reviews: {
                star: req.body.star,
                comment: req.body.comment
            }
        }
    };
    Product.findByIdAndUpdate(req.params.id, reviewData)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
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
                msg: "Delete OK"
            });
        });

};