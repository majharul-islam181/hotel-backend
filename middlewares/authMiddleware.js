// const JWT = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
//     // Check if authorization header is present
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) {
//       return res.status(401).send({
//         success: false,
//         message: "Authorization header missing",
//       });
//     }

//     //get token
//     const token = req.headers["authorization"].split(" ")[1];

//     JWT.verify(token, process.env.JWT_SECRET, (error, decode) => {
//       if (error) {
//         return res.status(404).send({
//           success: false,
//           message: "Un-Authorize User",
//         });
//       } else {
//         req.body.id = decode.id;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Don't have Token",
//       error,
//     });
//   }
// };


const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Check if authorization header is present
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    // Ensure the header is in the correct format
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).send({
        success: false,
        message: "Authorization header format is 'Bearer <token>'",
      });
    }

    const token = tokenParts[1];

    // Verify token
    JWT.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(404).send({
          success: false,
          message: "Unauthorized User",
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occurred while processing the token",
      error,
    });
  }
};
