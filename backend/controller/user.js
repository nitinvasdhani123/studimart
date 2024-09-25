const model = require("../model/user");
const userModel = model.user;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'upload/user/profile';  // Directory where user pics are stored

    // Check if the directory exists, and create it if it doesn't
    fs.access(dir, fs.constants.F_OK, (err) => {
      if (err) {
        // Directory doesn't exist, create it
        fs.mkdir(dir, { recursive: true }, (mkdirErr) => {
          if (mkdirErr) {
            console.error("Error creating directory:", mkdirErr);
            return cb(mkdirErr);
          }
          cb(null, dir);
        });
      } else {
        // Directory exists
        cb(null, dir);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
  }
});



// Multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Images only!'));
    }
  },
});


// signup function
exports.signup = async (req, res) => {
  try {
    // Check if the user already exists
    const userExists = await userModel.findOne({
      $or: [{ number: req.body.number }, { email: req.body.email }],
    });

    if (userExists) {
      return res.status(400).json({ message: "Account already exists." });
    }

    // Create a new user instance
    const userData = new userModel(req.body);

    // Hash the password
    const hash = bcrypt.hashSync(req.body.password, 10);
    userData.password = hash;

    // Generate a JWT token
    const token = jwt.sign({ email: req.body.email }, "shhhhh");
    userData.token = token;

    // Generate a random 6-character OTP
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += characters[Math.floor(Math.random() * characters.length)];
    }
    const OTP = otp.toString();
    userData.otp = OTP;

    // Email the OTP to the user
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nitinkumarvasdhani786@gmail.com",
        pass: "kyze puwm bvxi anbd",
      },
    });

    let mailOptions = {
      from: "nitinkumarvasdhani786@gmail.com",
      to: req.body.email,
      subject: "OTP to verify your account",
      text: `Your OTP is ${OTP}`,
    };

    // Save the user data
    await userData.save();

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // Respond with success
    res.status(201).send({ message: "OTP sent to your email successfully", token: token });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "An error occurred while creating the user." });
  }
};


// sigup OTP verification
exports.signupOTPVerify = async (req, res) => {
  try {
    const submittedOTP = req.body.otp;
    const userData = await userModel.findOne({ token:req.body.token });
    if (userData.otp !== submittedOTP) {
      return res.status(400).json({ message: "Invalid OTP." });
    }
    if (userData.otp) {
      userData.otp = undefined;
      await userData.save();
    }
    res.status(201).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "An error occurred while verifying OTP." });
  }
};


// login function
exports.login = async (req, res) => {
  try {
    // Check whether the input is an email or phone number
    const emailOrNumber = req.body.emailOrNumber;

    // Use regex to check if the input is a valid email (if not, treat it as a phone number)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrNumber);

    // Adjust query based on whether the input is an email or phone number
    const userinfo = await userModel.findOne({
      $or: [
        { number: isEmail ? null : emailOrNumber }, // Treat as number if not email
        { email: isEmail ? emailOrNumber : null }, // Treat as email if valid email
      ],
    });

    if (!userinfo) {
      return res.status(400).json({ message: "User not found" });
    }

    // Verify the password
    const isPasswordValid = bcrypt.compareSync(req.body.password, userinfo.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Success response with token
    res.status(200).json({
      message: "Login successfully",
      token: userinfo.token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error, please try again later",
    });
  }
};


// forget password function
exports.forgetPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // const otp = Math.floor(1000 + Math.random() * 9000);
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += characters[Math.floor(Math.random() * characters.length)];
    }
    const OTP = otp.toString();
    user.otp = OTP;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nitinkumarvasdhani786@gmail.com",
        pass: "kyze puwm bvxi anbd",
      },
    });
    let mailOptions = {
      from: "nitinkumarvasdhani786@gmail.com",
      to: req.body.email,
      subject: "OTP to verify your account",
      text: `Your OTP is ${OTP}`,
    };

    await user.save();
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(201).send("OTP sent to email successfully.");
  } catch (error) {
    res.status(500).json({ message: "OTP is not sent successfully." });
  }
};


// forget password otp check function
exports.forgetPasswordOTPVerify = async (req, res) => {
  try {
    const submittedOTP = req.body.otp;
    const user = await userModel.findOne({ email: req.body.email });
    if (user.otp !== submittedOTP) {
      return res.status(400).json({ message: "Invalid OTP." });
    }
    if (user.otp) {
      user.otp = undefined;
      await user.save();
    }
    res.status(201).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "An error occurred while verifying OTP." });
  }
};


// reset password otp check function
exports.resetPassword = async (req, res) => {
  try {
    if(req.body.password !=  req.body.confirmPassword){
      res.status(400).json({ message: "Password and confirm password is not same." });
    }
    const user = await userModel.findOne({ email: req.body.email });
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.password = hash;
    await user.save();
    res.status(201).json({ message: "Password is reset successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res
      .status(500)
      .json({ message: "An error occurred while reseting your password." });
  }
};

// Reset password OTP check function
exports.authUserResetPassword = async (req, res) => {
  try {
    // Find user by token
    const user = await userModel.findOne({ token: req.body.token });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token." });
    }

    // Check if password and confirmPassword match
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password do not match." });
    }

    // Hash the new password
    const hash = bcrypt.hashSync(req.body.password, 10);

    // Update user's password
    user.password = hash;

    // Save updated user data
    await user.save();

    // Respond with success message
    res.status(201).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ message: "An error occurred while resetting your password." });
  }
};


exports.userProfile = async (req, res) => {
  try {
    // console.log("Token received:", req.body.token); // Log token for debugging
    const user = await userModel.findOne({ token: req.body.token });
    if (!user) {
      return res.status(400).json({ message: "You are logged out. Please login again." });
    }
    res.status(200).json({ message: "Your Account is found", user: user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "An error occurred while fetching your profile." });
  }
};

exports.userProfileUpdate = async (req, res) => {
  try {
    // console.log(req.body);
    // Find the user by their ID
    const user = await userModel.findOne({ token: req.body.token });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ message: "User Not Found." });
    }

    // If a file is uploaded, set the new file path to user.pic
    if (req.file) {
      // Optional: Delete the old profile pic if it exists and is not the default pic
      if (user.pic && user.pic !== path.join('upload', 'default-user-image.jpg')) {
        fs.unlink(user.pic, (err) => {
          if (err) {
            console.error("Error deleting old profile picture:", err);
          } else {
            console.log("Old profile picture deleted successfully.");
          }
        });
      }

      // Set the new uploaded file path to user.pic
      user.pic = req.file.path;
    }

    // Update the user's fields with the new data
    user.name = req.body.name || user.name;
    user.number = req.body.number || user.number;
    user.email = req.body.email || user.email;
    // user.password = req.body.password || user.password;
    user.college = req.body.college || undefined;
    user.address = req.body.address || undefined;
    user.state = req.body.state || undefined;
    user.city = req.body.city || undefined;
    user.region = req.body.region || undefined;
    // user.latitude = req.body.latitude || user.latitude;
    // user.longitude = req.body.longitude || user.longitude;
    user.postalCode = req.body.postalCode || undefined;

    // Save the updated user data
    await user.save();

    // Return a success message
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error while updating your profile:", error);
    res.status(500).json({ message: "An error occurred while updating your profile." });
  }
};





// exports.userProfileAdd = async (req, res) => {
//   try {
//     // Check if the category already exists
//     const userExists = await userModel.findOne({
//       email: req.body.email,
//     });

//     // If the category exists, return an error response
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     // If the category does not exist, create a new one
//     const userData = new userModel(req.body);
//     const user = await userData.save();

//     // Return a success response
//     res.status(201).json({ message: "User added successfully", category });
//   } catch (error) {
//     // Handle any errors that occur
//     res.status(500).json({ message: "An error occurred in creating User." });
//   }
// };


// exports.userProfileEdit = async (req, res) => {
//   try {
//     // Find the user by their ID
//     const user = await userModel.findById(req.body.objectId);

//     // If the user doesn't exist, return an error
//     if (!user) {
//       return res.status(404).json({ message: "User Not Found." });
//     }

//     // Update the user's fields with the new data
//     user.name = req.body.name || user.name;
//     user.number = req.body.number || user.number;
//     user.email = req.body.email || user.email;
//     user.password = req.body.password || user.password;
//     user.pic = req.body.pic || user.pic;
//     user.college = req.body.college || user.college;
//     user.address = req.body.address || user.address;
//     user.state = req.body.state || user.state;
//     user.city = req.body.city || user.city;
//     user.region = req.body.region || user.region;
//     user.latitude = req.body.latitude || user.latitude;
//     user.longitude = req.body.longitude || user.longitude;
//     user.postalCode = req.body.postalCode || user.postalCode;
//     user.statusFlag = req.body.statusFlag || user.statusFlag;
//     user.role = req.body.role || user.role;

//     // Save the updated user data
//     await user.save();

//     // Return a success message
//     res.status(200).json({ message: "User profile updated successfully", user });
//   } catch (error) {
//     console.error("Error while updating your profile:", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while updating your profile." });
//   }
// };


// exports.userProfileList = async (req, res) => {
//   try {
//     // Fetch all categories from the database
//     const users = await userModel.find();

//     // If there are no categories, send a message indicating that
//     if (users.length === 0) {
//       return res.status(404).json({ message: "No user found." });
//     }

//     // Send the list of categories in the response
//     res
//       .status(200)
//       .json({ message: "Categories retrieved successfully", users });
//   } catch (error) {
//     // Handle any errors that occur
//     res
//       .status(500)
//       .json({ message: "An error occurred in getting categories." });
//   }
// };

// exports.userProfileAdd = async (req, res) => {
//   try {
//     // Check if the user already exists
//     const userExists = await userModel.findOne({
//       name: req.body.name,
//     });

//     if (userExists) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     // Handle file upload (if a profile picture is uploaded)
//     let userPic = req.file ? req.file.filename : 'default-pic.jpg'; // Default pic if no file uploaded

//     // Create new user
//     const userData = new userModel({
//       ...req.body,
//       pic: userPic, // Set the pic field
//     });
//     const user = await userData.save();

//     // Return success response
//     res.status(201).json({ message: "User added successfully", user });
//   } catch (error) {
//     console.error("Error in creating user:", error);
//     res.status(500).json({ message: "An error occurred in creating User." });
//   }
// };



// User profile edit function with multer for file upload
// exports.userProfileEdit = async (req, res) => {
//   try {
//     // Find the user by their ID
//     const user = await userModel.findById(req.body.objectId);

//     // If the user doesn't exist, return an error
//     if (!user) {
//       return res.status(404).json({ message: "User Not Found." });
//     }

//     // If a file is uploaded, set the new file path to user.pic
//     if (req.file) {
//       // Optional: Delete the old profile pic if it exists and is not the default pic
//       if (user.pic && user.pic !== 'https://img.freepik.com/free-icon/user_318-159711.jpg') {
//         fs.unlink(user.pic, (err) => {
//           if (err) console.error("Error deleting old profile picture:", err);
//         });
//       }

//       // Set the new uploaded file path to user.pic
//       user.pic = req.file.path;
//     }

//     // Update the user's fields with the new data
//     user.name = req.body.name || user.name;
//     user.number = req.body.number || user.number;
//     user.email = req.body.email || user.email;
//     user.password = req.body.password || user.password;
//     user.college = req.body.college || user.college;
//     user.address = req.body.address || user.address;
//     user.state = req.body.state || user.state;
//     user.city = req.body.city || user.city;
//     user.region = req.body.region || user.region;
//     user.latitude = req.body.latitude || user.latitude;
//     user.longitude = req.body.longitude || user.longitude;
//     user.postalCode = req.body.postalCode || user.postalCode;
//     user.statusFlag = req.body.statusFlag || user.statusFlag;
//     user.role = req.body.role || user.role;

//     // Save the updated user data
//     await user.save();

//     // Return a success message
//     res.status(200).json({ message: "User profile updated successfully", user });
//   } catch (error) {
//     console.error("Error while updating your profile:", error);
//     res.status(500).json({ message: "An error occurred while updating your profile." });
//   }
// };



module.exports.upload = upload;
