const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controller/category');

categoryRouter.get('/list',categoryController.categoryList);
categoryRouter.post('/add',categoryController.categoryAdd);
categoryRouter.post('/edit',categoryController.categoryEdit);








exports.categoryRouter = categoryRouter;