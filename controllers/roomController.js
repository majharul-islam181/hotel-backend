const foodModel = require("../models/foodModel");
const foodSchema = require("../models/foodModel");
const orderModel = require("../models/orderModel");
const roomModel = require("../models/roomModel");
const roomSchema = require("../models/roomModel");

//CREATE ROOM
const createRoomController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      hotelTags,
      category,
      isAvailable,
      rating,
      ratingCount,
      phoneNumber
    } = req.body;
    //validate
    if (!title || !price || !description || !imageUrl || !category || !phoneNumber) {
      return res.status(404).send({
        success: false,
        message: "title, price, description, imageUrl, category, phoneNumber must required.",
      });
    }

    const room = new roomSchema({
      title,
      description,
      price,
      imageUrl,
      hotelTags,
      category,
      isAvailable,
      rating,
      ratingCount,
      phoneNumber
    });

    await room.save();
    res.status(200).send({
      success: true,
      message: "Successfully added room",
      room,
    });
  } catch (error) {
    // console.log(error);
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ message: "Room name should be unique" });
    } else {
      res.status(500).send({
        success: false,
        message: "Error In Create Room api",
        error,
      });
    }
  }
};

//GET ALL ROOM
const getAllRoomController = async (req, res) => {
  try {
    //find foods
    const rooms = await roomModel.find({});
    //validate
    if (!rooms) {
      res.status(404).send({
        success: false,
        message: "No foods found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Found room successfully",
      totalFoods: rooms.length,
      rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Food APi",
    });
  }
};

//UPDATE ROOMS BY ID
const updateRoomController = async (req, res) => {
  try {
    //get id
    const { id: roomId } = req.params;
    //validate
    if (!roomId)
      return res
        .status(404)
        .send({ success: false, message: "No room id was found!" });

    const room = await roomModel.findById(roomId);
    //validate
    if (!room)
      return res
        .status(404)
        .send({ success: false, message: "No room found." });

    //same title is not allowed.

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
      phoneNumber,
    } = req.body;

    // check if the provided title is different from the existing title
    if (room.title === title) {
      return res
        .status(400)
        .send({
          success: false,
          message: "The new title must be different from the current title.",
        });
    }

    const updateRoom = await roomModel.findByIdAndUpdate(
      roomId,
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
        phoneNumber
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Updated successfully",
      updateRoom,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Room APi",
    });
  }
};

const deleteRoomController = async (req, res) => {
  try {
    //get id
    const roomId = req.params.id;
    if (!roomId)
      return res
        .status(404)
        .send({ success: false, message: "Please Provide id" });

    const room = await roomModel.findById(roomId);
    if (!room)
      return res
        .status(404)
        .send({ success: false, message: "No food found." });
    await roomModel.findByIdAndDelete(roomId);

    const updateRoom = await roomModel.find({});
    res.status(200).send({
      success: true,
      message: "Deleted successfully",
      totalFoods: updateRoom.length,
      updateRoom: updateRoom,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Room APi",
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
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order Status API",
    });
  }
};

module.exports = {
  createRoomController,
  getAllRoomController,

  updateRoomController,
  deleteRoomController,
  placeOrderController,
  orderStatusController,
};
