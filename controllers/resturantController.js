const resturantModel = require("../models/resturantModel");

// CREATE RESTURANT
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "New Resturant Created successfully",
      newResturant,
    });
  } catch (error) {
    // console.log(error);
    if (error.code === 11000) {
      // Duplicate key error
      return res
        .status(400)
        .json({ message: "Restaurant name should be unique" });
    } else {
      res.status(500).send({
        success: false,
        message: "Error In Create Resturant api",
        error,
      });
    }
  }
};

//ALL RESTURANTS
const getAllResturantController = async (req, res) => {
  try {
    //get resturants
    const resturants = await resturantModel.find({});
    //validate
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No resturants found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Resturants Founds Successfully",
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error on get all resturants api",
      error,
    });
  }
};

//GET SINGLE RESTURANT
const getResturantByIdController = async (req, res) => {
  try {
    //get id
    const resturantId = req.params.id;
    //validate id
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide resturant Id",
      });
    }
    //get resturant
    const resturant = await resturantModel.findById(resturantId);
    //validate
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "No resturant found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Resturant found succesfully",
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Resturant in Id API",
      error,
    });
  }
};

//DELETE RESTURANTS
const deleteResturantController = async (req, res) => {
  try {
    //get id
    const resturantId = req.params.id;
    //validate id
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "No resturant found",
      });
    }
    //get resturant
    const resturant = await resturantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in Delete Resturant API",
        error,
      });
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};
