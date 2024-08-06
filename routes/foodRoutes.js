const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getFoodByIdController, getAllFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();


//ROUTES
//CREATE FOOD
router.post('/create', authMiddleware, createFoodController)

//GET ALL FOOD
router.get('/getAll', getAllFoodController)

//GET SINGLE FOOD BY ID
router.get('/getFood/:id', getFoodByIdController)

//GET FOOD BY RESTURANT
router.get('/getByResturant/:id',getFoodByResturantController)

//UPDATE FOOD
router.put('/update/:id', authMiddleware, updateFoodController)

//DELETE FOOD
router.delete('/delete/:id', authMiddleware, deleteFoodController)

//PLACE ORDER
router.post('/placeorder', authMiddleware, placeOrderController)


//ORDER STATUS
router.post('/orderstatus/:id',authMiddleware, adminMiddleware,orderStatusController)

module.exports = router;