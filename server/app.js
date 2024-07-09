const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/userRouter");
    
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected!"))
  .catch((e) => console.log("Database is not Connected!!!!", e));

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, 
};
  
app.use(cors(corsOptions));
     
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
     
app.use("/user", userRouter);

app.listen(3000);
