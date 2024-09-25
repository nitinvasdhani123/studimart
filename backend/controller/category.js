const model = require("../model/category");
const categoryModel = model.category;

exports.categoryList = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await categoryModel.find({ statusFlag: 1 });

    // If there are no categories, send a message indicating that
    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }

    // Send the list of categories in the response
    res
      .status(200)
      .json({ message: "Categories retrieved successfully", categories });
  } catch (error) {
    // Handle any errors that occur
    res
      .status(500)
      .json({ message: "An error occurred in getting categories." });
  }
};

exports.categoryAdd = async (req, res) => {
  try {
    // Check if the category already exists
    const categoryExists = await categoryModel.findOne({
      categoryName: req.body.categoryName,
    });

    // If the category exists, return an error response
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists." });
    }

    // If the category does not exist, create a new one
    const categoryData = new categoryModel(req.body);
    const category = await categoryData.save();

    // Return a success response
    res.status(201).json({ message: "Category added successfully", category });
  } catch (error) {
    // Handle any errors that occur
    res
      .status(500)
      .json({ message: "An error occurred in creating category." });
  }
};


exports.categoryEdit = async (req, res) => {
  try {
    // Check if the category exists by its ID
    const category = await categoryModel.findById(req.body.objectId);

    // If the category does not exist, return an error response
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Update the category's fields with the new data
    category.categoryName = req.body.categoryName || category.categoryName;
    category.statusFlag = req.body.statusFlag || category.statusFlag; // Add other fields as needed

    // Save the updated category
    await category.save();

    // Return a success response
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    // Handle any errors that occur
    res
      .status(500)
      .json({ message: "An error occurred while updating the category." });
  }
};