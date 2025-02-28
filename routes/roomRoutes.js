const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getFoodByIdController, getAllFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { createRoomController, getAllRoomController, updateRoomController, deleteRoomController, getRoomByIdController } = require("../controllers/roomController");

const router = express.Router();


//ROUTES
//CREATE ROOM
router.post('/create',authMiddleware, adminMiddleware, createRoomController)

//GET ALL Room
router.get('/getAll', getAllRoomController)

//FIND ROOM BY ID
router.get('/findRoom/:id', getRoomByIdController)

//UPDATE ROOm
router.put('/update/:id', authMiddleware, updateRoomController)

//DELETE FOOD
router.delete('/delete/:id', authMiddleware, deleteRoomController)

//PLACE ORDER
router.post('/placeorder', authMiddleware, placeOrderController)



//ORDER STATUS
router.post('/orderstatus/:id',authMiddleware, adminMiddleware,orderStatusController)

module.exports = router;