const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    //validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all Fields",
      });
    }

    //check user
    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email Already Register Please Login",
      });
    }
    //hasing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = await userModels.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer
    });
    res.status(200).send({
      success: true,
      message: "Succesfully register",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email or Password",
      });
    }
    //if user exist

    //if user not exist
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }

    //check user password ! compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res
      .status(200)
      .send({ success: true, message: "Succesfully Login", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login Error",
    });
  }
};

module.exports = { registerController, loginController };
