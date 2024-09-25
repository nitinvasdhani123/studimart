const model = require("../model/product");
const productModel = model.product;
const model1 = require('../model/user');
const userModel = model1.user;
const productImageModel = require("../model/productImage");
const productImage = productImageModel.productImage;
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'upload/product/images';

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


exports.allProduct = async (req, res) => {
  try {

    // Fetch products for the user
    const products = await productModel.find();

    // If there are no products, send a message indicating that
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }

    // Fetch associated product images for each product
    const productWithImagesPromises = products.map(async (product) => {
      const images = await productImage.find({ productID: product._id });
      return {
        ...product.toObject(), // Convert mongoose document to plain object
        productImages: images, // Add images to the product object
      };
    });

    const productsWithImages = await Promise.all(productWithImagesPromises);

    // Send the list of products in the response
    res.status(200).json({ message: "Products retrieved successfully", products: productsWithImages });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error getting products:", error);
    res.status(500).json({ message: "An error occurred in getting products." });
  }
};



exports.productList = async (req, res) => {
  try {
    // Find user by token
    const user = await userModel.findOne({ token: req.body.token });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Fetch products for the user
    const products = await productModel.find({ userID: user._id });

    // If there are no products, send a message indicating that
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }

    // Fetch associated product images for each product
    const productWithImagesPromises = products.map(async (product) => {
      const images = await productImage.find({ productID: product._id });
      return {
        ...product.toObject(), // Convert mongoose document to plain object
        productImages: images, // Add images to the product object
      };
    });

    const productsWithImages = await Promise.all(productWithImagesPromises);

    // Send the list of products in the response
    res.status(200).json({ message: "Products retrieved successfully", products: productsWithImages });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error getting products:", error);
    res.status(500).json({ message: "An error occurred in getting products." });
  }
};


// Function to add product with image
exports.productAdd = async (req, res) => {
  try {
    // Validate required fields
    const { categoryID, productName, productPrice } = req.body;
    if (!categoryID || !productName || !productPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the user by token
    const user = await userModel.findOne({ token: req.body.token });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Create the product data
    const productData = new productModel({
      categoryID,
      userID: user._id,
      productName,
      productPrice,
    });
    const product = await productData.save();

    // Check for uploaded files and save them
    if (req.files && req.files.length > 0) {
      const imagePromises = req.files.map(async (file) => {
        const productImageData = new productImage({
          productID: product._id,
          productImage: file.path,
        });
        return productImageData.save();
      });
      await Promise.all(imagePromises); // Wait for all images to be saved
    }

    // Return success response
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "An error occurred while adding the product." });
  }
};




// Function to edit product with image update
exports.productEdit = async (req, res) => {
  try {
    // Find the product by its ID
    const product = await productModel.findById(req.body.objectId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Update the product's fields with the new data
    product.productName = req.body.productName || product.productName;
    product.productPrice = req.body.productPrice || product.productPrice;
    product.statusFlag = req.body.statusFlag || product.statusFlag;

    // Save the updated product data
    await product.save();

    // Handle product image update
    if (req.file) {
      // Remove the existing product image if needed (optional)
      await productImage.deleteMany({ productID: product._id });

      // Save the new product image
      const productImageData = new productImage({
        productID: product._id,
        productImage: req.file.filename,  // Store the new image filename
      });
      await productImageData.save();
    }

    // Return a success response
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the product." });
  }
};




module.exports.upload = upload;