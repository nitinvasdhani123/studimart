const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/user'); // Adjust the path accordingly
// Import the upload middleware
const { upload } = userController;

// Auth Completed
userRouter.post('/signup/submit',userController.signup);
userRouter.post('/verify/signup/otp/submit',userController.signupOTPVerify);
userRouter.post('/login/submit',userController.login);
userRouter.post('/forget/password/submit',userController.forgetPassword);
userRouter.post('/verify/forget/password/otp/submit',userController.forgetPasswordOTPVerify);
userRouter.post('/reset/password/submit',userController.resetPassword);
userRouter.post('/password/reset/submit',userController.authUserResetPassword);// for auth user
userRouter.post('/profile',userController.userProfile);
userRouter.patch('/profile/update',upload.single('pic'),userController.userProfileUpdate);



// userRouter.get('/profile/list',userController.userProfileList);
// userRouter.post('/profile/add',upload.single('pic'),userController.userProfileAdd);
// userRouter.post('/profile/add',userController.userProfileAdd);
// userRouter.patch('/profile/update',userController.userProfileEdit);


exports.userRouter = userRouter;