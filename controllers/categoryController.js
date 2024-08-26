const categoryModel = require("../models/categoryModel");

//CREATE CATEGORY
const createCategoryController = async (req, res) => {
  try {
    const { title } = req.body;
    //validate
    if (!title) {
      return res.status(404).send({
        success: false,
        message: "Please Provide category name/titile",
      });
    }

    //create category
    const newCategory = new categoryModel({ title });
    await newCategory.save();
    // Fetch all categories
    const allCategories = await categoryModel.find();

    res.status(200).send({
      success: true,
      messsage: "New Category added successfully!.",
      newCategory,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res
        .status(400)
        .json({ message: "Category name should be unique" });
    }
    res.status(500).send({
      success: false,
      message: "Error in Creating Category API",
      error,
    });
  }
};

//GET ALL CATEGORY
const getAllCategoryController = async (req, res) => {
  try {
    //get category
    const allCategories = await categoryModel.find({});
    //validate
    if (!allCategories) {
      return res.status(404).send({
        success: false,
        message: "No category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All category found successfully",
      totalCategory: allCategories.length,
      allCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get all category API",
      error,
    });
  }
};

//UPDATE CATEGORY BY ID
const updateCatController = async (req, res) => {
  try {
    //get id
    const userId = req.params.id;
    const { title, imageUrl } = req.body;
    //category
    const updateCategory = await categoryModel.findByIdAndUpdate(
      userId,
      { title },
      { new: true }
    );
    //validate
    if (!updateCategory) {
      return res.status(404).send({
        success: false,
        message: "Not Category updated",
      });
    }
    await updateCategory.save();
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      updateCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in  Update category API",
      error,
    });
  }
};

//DELETE CATEGORY BY ID
const deleteCatController = async (req, res) => {
    try {
        //get id
        const userId = req.params.id;
        //validate id
        if(!id){
            return res.status(404).send({
                success:false
                ,
                message: "Please Provide id",
            })
        }
        //get category
        const deleteCatagory = await categoryModel.findByIdAndDelete(userId);
        if(!deleteCatagory){
            return res.status(404).send({
                success: false,
                message: "No Category found."
            })
        };

        const allCategories = await categoryModel.find({})

        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            totalCategory: allCategories.length,
            allCategories,
            
        })

        
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in  Delete category API",
      error,
    });
        
    }
};
module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCatController,
  deleteCatController,
};
