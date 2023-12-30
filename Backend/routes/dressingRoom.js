const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const { spawn } = require('child_process'); // For running Python scripts

// Configure multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint to receive and process the image
router.post('/try-on', upload.single('userImage'), (req, res) => {
  const userImage = req.file.path; // Path to the uploaded image file

  // Run a Python script for image processing (replace 'path/to/script.py' with your script)
  const pythonProcess = spawn('python', ['path/to/script.py', userImage]);

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
