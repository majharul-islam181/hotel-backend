const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createCategoryController, getAllCategoryController, updateCatController, deleteCatController } = require("../controllers/categoryController");

const router = express.Router();

//routes
// CRAETE CATEGORY || POST
router.post("/create", authMiddleware, createCategoryController);

//ALL CATEGORY
router.get('/all-category', authMiddleware, getAllCategoryController)

//UPDATE CATEGORY
router.put('/update/:id', authMiddleware, updateCatController)


//DELETE CATEGORY BY ID
router.delete('/delete/:id', authMiddleware, deleteCatController)



module.exports = router;
