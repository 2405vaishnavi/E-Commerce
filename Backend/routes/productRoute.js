const express = require("express");
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const { spawn } = require('child_process'); // For running Python scripts

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controller/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);



// Configure multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint to receive and process the image
router.post('/try-on', upload.single('userImage'), (req, res) => {
  const userImage = req.file.path; // Path to the uploaded image file

  // Run a Python script for image processing
  const pythonProcess = spawn('python', ['path/to/your/image_processing_script.py', userImage]);

  pythonProcess.stdout.on('data', (data) => {
    // Process the output data if needed
    console.log(`Python script output: ${data}`);
    // Send processed data or URL back to the frontend
    res.status(200).json({ processedData: data });
  });

  pythonProcess.stderr.on('data', (data) => {
    // Handle any errors that occur during the Python script execution
    console.error(`Python script error: ${data}`);
    res.status(500).json({ error: 'Internal server error' });
  });
});
  
module.exports = router;
