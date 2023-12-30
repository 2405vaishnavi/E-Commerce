const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/paymentController.js");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth.js");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;