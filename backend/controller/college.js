const model = require("../model/college");
const collegeModel = model.college;

exports.collegeList = async (req, res) => {
  try {
    // Fetch all categories from the database
    const colleges = await collegeModel.find();

    // If there are no categories, send a message indicating that
    if (colleges.length === 0) {
      return res.status(404).json({ message: "No colleges found." });
    }

    // Send the list of categories in the response
    res
      .status(200)
      .json({ message: "Categories retrieved successfully", colleges });
  } catch (error) {
    // Handle any errors that occur
    res
      .status(500)
      .json({ message: "An error occurred in getting categories." });
  }
};

exports.collegeAdd = async (req, res) => {
  try {
    // Check if the category already exists
    const collegeExists = await collegeModel.findOne({
      collegeName: req.body.collegeName,
    });

    // If the category exists, return an error response
    if (collegeExists) {
      return res.status(400).json({ message: "College already exists." });
    }

    // If the category does not exist, create a new one
    const collegeData = new collegeModel(req.body);
    const college = await collegeData.save();

    // Return a success response
    res.status(201).json({ message: "college added successfully", college });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: "An error occurred in creating college." });
  }
};

exports.collegeEdit = async (req, res) => {
  try {
    // Find the college by its ID
    const college = await collegeModel.findById(req.body.objectId);

    // If the college does not exist, return an error response
    if (!college) {
      return res.status(404).json({ message: "College not found." });
    }

    // Update the college's fields with the new data
    college.collegeName = req.body.collegeName || college.collegeName;
    college.address = req.body.address || college.address;
    college.state = req.body.state || college.state;
    college.city = req.body.city || college.city;
    college.region = req.body.region || college.region;
    college.latitude = req.body.latitude || college.latitude;
    college.longitude = req.body.longitude || college.longitude;
    college.postalCode = req.body.postalCode || college.postalCode;
    college.statusFlag = req.body.statusFlag || college.statusFlag;

    // Save the updated college data
    await college.save();

    // Return a success response
    res.status(200).json({ message: "College updated successfully", college });
  } catch (error) {
    // Handle any errors that occur
    res
      .status(500)
      .json({ message: "An error occurred while updating the college." });
  }
};