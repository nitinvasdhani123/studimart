const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/product');
const { upload } = productController;

productRouter.get('/',productController.allProduct);
productRouter.post('/list',productController.productList);
productRouter.post('/add', upload.array('productImages', 10), productController.productAdd);
productRouter.post('/edit',upload.array('productImages', 10),productController.productEdit);

exports.productRouter = productRouter;