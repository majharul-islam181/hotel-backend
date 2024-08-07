const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const rateLimit = require("express-rate-limit");

//dot en configuration
// dotenv.config({path:'./'}) //if .env file is not same location
dotenv.config();

//db connection
connectDB();

//rest object
const app = express();

// Define the rate limit rule
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 5, // Limit each IP to 5 requests per windowMs
  delayMs: 60 * 1000, // Optional: 1 minute delay after max is reached
  message: "Too many requests from this IP, please try again after a minute.",
});

// Apply the rate limiting middleware to all requests
// app.use(limiter);

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/room", require("./routes/roomRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoute"));
app.use("/api/v1/reservation", require("./routes/reservationRoutes"));


//route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Hotel Booking System");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}!`.white.bgMagenta);
});