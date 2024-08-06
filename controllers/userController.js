const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");

const userController = async (req, res) => {
  try {
    //find user
    const user = await userModels.findById({ _id: req.body.id });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }
    //hiding passsword
    user.password = undefined;
    //res
    res.status(200).send({
      success: true,
      message: "User found Sucessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error In get user api",
      error,
    });
  }
};

// UPDATE USER
const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModels.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //update user
    const { userName, email, phone } = req.boy;

    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    //save
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status().send({
      success: false,
      message: "Failed to update User",
      error,
    });
  }
};

//Update User Password
const updateUserPasswordController = async (req, res) => {
  try {
    //FIND USER
    const user = await userModels.findById({ _id: req.body.id });

    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide Old or new Password",
      });
    }

    //check user password || compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hasedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hasedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "User password succefully Updated.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in password Update API",
      error,
    });
  }
};

//Reset Password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    //validate all field
    if (!email || !newPassword || !answer) {
      return res.status(404).send({
        success: false,
        message: "Required all field",
      });
    }

    //user trac
    const user = await userModels.findOne({ email, answer });
    //validate user
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found.",
      });
    }

    //hasing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
        success: true,
        message: "Password Reset Successfully"
    })


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Password Reset",
      error,
    });
  }
};

//Delete  User
const deleteUserController = async( req,res) =>{
    try {
        await userModels.findByIdAndDelete(req.params.id);
        return res.status(200).send({
          success: true,
          message: "Your account has been deleted",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr In Delete Profile API",
          error,
        });
      }
}

module.exports = {
  userController,
  updateUserController,
  updateUserPasswordController,
  resetPasswordController,
  deleteUserController
};
