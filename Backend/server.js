const app = require("./app")
const Ecommerce = require('./DB/mondoDb');
const dotenv = require('dotenv')
const cloudinary = require("cloudinary");

const PORT = process.env.PORT;   

// Config
dotenv.config();

// connecting to DB
Ecommerce();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.listen(PORT , () => {
    console.log(`Server Running on localhost : ${PORT}`)
});
