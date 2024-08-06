const foodModel = require("../models/foodModel");
const foodSchema = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;
    //validate
    if (!title || !price) {
      return res.status(404).send({
        success: false,
        message: "Title and Price is required.",
      });
    }

    const food = new foodSchema({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    });

    await food.save();
    res.status(200).send({
      success: true,
      message: "Successfully added food",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Food APi",
    });
  }
};

//GET SINGLE FOODS BY ID
const getFoodByIdController = async (req, res) => {
  try {
    //get id
    const foodId = req.params.id;
    //validate id
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food id is required.",
      });
    }
    //get food
    const food = await foodModel.findById(foodId);
    //validate
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food found successfully",

      food: {
        name: food.title,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Food APi",
    });
  }
};

//GET ALL FOOD
const getAllFoodController = async (req, res) => {
  try {
    //find foods
    const foods = await foodModel.find({});
    //validate
    if (!foods) {
      res.status(404).send({
        success: false,
        message: "No foods found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Found food successfully",
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Food APi",
    });
  }
};

//GET  FOODS BY  RESTURANT ID
const getFoodByResturantController = async (req, res) => {
  try {
    //get id
    const resturantId = req.params.id;
    //validate id
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Food id is required.",
      });
    }
    //get food
    const resturant_food = await foodModel.find({ resturant: resturantId });
    //validate
    if (!resturant_food) {
      return res.status(404).send({
        success: false,
        message: "No food found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food By resturant found successfully",

      resturant: resturant_food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Resturant Food APi",
    });
  }
};

//UPDATE FOOD BY ID
const updateFoodController = async (req, res) => {
  try {
    //get id
    const { id: foodId } = req.params;
    //validate
    if (!foodId)
      return res
        .status(404)
        .send({ success: false, message: "No food id was found!" });

    const food = await foodModel.findById(foodId);
    //validate
    if (!food)
      return res
        .status(404)
        .send({ success: false, message: "No food found." });

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    const updateFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Updated successfully",
      updateFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Food APi",
    });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    //get id
    const foodId = req.params.id;
    if (!foodId)
      return res
        .status(404)
        .send({ success: false, message: "Please Provide id" });

    const food = await foodModel.findById(foodId);
    if (!food)
      return res
        .status(404)
        .send({ success: false, message: "No food found." });
    await foodModel.findByIdAndDelete(foodId);

    const updateFood = await foodModel.find({});
    res.status(200).send({
      success: true,
      message: "Deleted successfully",
      totalFoods: updateFood.length,
      updateFood: updateFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Food APi",
    });
  }
};

// const placeOrderController = async (req, res) =>{

//     try {
//         const {cart} = req.body;
//         if(!cart){
//             res.status(404).send({
//                 success: false,
//                 message: "No food in this cart.",
//               });
//         };

//         let total = 0;
//          cart.map((i)=>{
//             total += i.price

//          })
//     //     let total = 0;
//     // cart.forEach((item) => {
//     //   if (item.price && !isNaN(item.price)) {
//     //     total += item.price;
//     //   }
//     // });

//          const newOrder = new orderModel({
//             foods: cart,
//             payment: total,
//             buyer: req.body.id,
//          })
//          await newOrder.save();
//          res.status(200).send({
//             success: true,
//             message: "Order place successfully",
//             newOrder,
//           });

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//           success: false,
//           message: "Error in Place Order Food APi",
//         });

//     }

// }

const placeOrderController = async (req, res) => {
  try {
    const { cart, buyerId } = req.body;

    // Check if cart is provided and not empty
    if (!cart || cart.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No food in this cart.",
      });
    }
    //   if(!buyerId){
    //     return res.status(404).send({
    //         success: false,
    //         message: "Buyer id required",
    //       });

    //   }

    // Calculate total payment
    let total = 0;
    cart.forEach((item) => {
      if (item.price && !isNaN(item.price)) {
        total += Number(item.price);
      }
    });

    // Create new order
    const newOrder = new orderModel({
      foods: cart.map((item) => item._id),
      payment: total,
      buyer: req.body.id,
    });

    // Save the order
    await newOrder.save();

    // Send response
    res.status(200).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Place Order API",
    });
  }
};

const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if(!orderId) {
        return res.status(404).send({
            success: false,
            message: "Please provide valid order id",
          });
    }
    const {status} = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId,{status},{new: true});
    res.status(200).send({
        success: true,
        message: "Order Status Updated",
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order Status API",
    });
  }

};

module.exports = {
  createFoodController,
  getFoodByIdController,
  getAllFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
