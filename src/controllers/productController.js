exports.getProducts = async (req, res)=>{
    res.send(`get all products`);
};

exports.getProductById = async (req,res)=>{
    res.send(`get product by id = ${req.params.id}`);
};

exports.getProductByName = async (req,res)=>{
    res.send(`get product by name = ${req.params.name}`);
};

exports.addProduct = async (req,res)=>{
    res.send(`Add a product id: ${req.body.id}, name: ${req.body.name}`);
};

exports.editWholeProduct = async (req,res)=>{
    res.send(`Edit product by Id ${req.params.id} <br> Id ${req.body.id}`);
};

exports.editProduct = async (req,res)=>{
    res.send(`Edit product by Id ${req.params.id} <br> Id ${req.body.id}`);
};

exports.deleteProduct = async (req,res)=>{
    res.send(`Delete product Id ${req.params.id}`);
};
