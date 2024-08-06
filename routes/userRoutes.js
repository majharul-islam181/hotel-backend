const express = require('express');
const { userController, updateUserController, updateUserPasswordController, resetPasswordController, deleteUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();
//routes
//Get user || GET
router.get('/get-user', authMiddleware, userController);

//update userInformation
router.post('/update-user', authMiddleware, updateUserController )

//update password
router.post('/update-password', authMiddleware, updateUserPasswordController )

//reset password
router.post('/reset-password', authMiddleware,resetPasswordController)

//delete user
router.post('/delete-user/:id', authMiddleware, deleteUserController)

module.exports = router;
