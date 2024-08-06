const express = require('express');
const { testController } = require('../controllers/testController');

//router object
const router = express.Router();


//routes GET | POST | DELETE | UPDATE
router.get('/test-user', testController)


module.exports = router;