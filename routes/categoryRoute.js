const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createCategoryController, getAllCategoryController, updateCatController, deleteCatController } = require("../controllers/categoryController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

//routes
// CRAETE CATEGORY || POST
router.post("/create", authMiddleware, adminMiddleware, createCategoryController);

//ALL CATEGORY
router.get('/all-category', authMiddleware,adminMiddleware, getAllCategoryController)

//UPDATE CATEGORY
router.put('/update/:id', authMiddleware,adminMiddleware, updateCatController)


//DELETE CATEGORY BY ID
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteCatController)



module.exports = router;
