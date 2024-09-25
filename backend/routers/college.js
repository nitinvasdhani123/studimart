const express = require('express');
const collegeRouter = express.Router();
const collegeController = require('../controller/college');



collegeRouter.get('/list',collegeController.collegeList);
collegeRouter.post('/add',collegeController.collegeAdd);
collegeRouter.post('/edit',collegeController.collegeEdit);


exports.collegeRouter = collegeRouter;