const Order = require("../models/orderModel");
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//  Get Single Order

exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");
    if(!order){
      return next (new ErrorHandler ("Order not found with this id :" ,404))
    }

    res.status(200).json({
      success:true,
      order,
    });
});

//  Get Login User Order

exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
  const orders = await Order.find({user:req.user._id});

  res.status(200).json({
    success:true,
    orders,
  });
});

//  Get All Orders -- Admin

exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
  const orders = await Order.find();

  let totalAmount = 0 ;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  })

  res.status(200).json({
    success:true,
    totalAmount,
    orders,
  });
});

// Update Orders Status -- Admin

exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
  const order = await Order.findById(req.params.id);

  if(!order){
    return next (new ErrorHandler ("Order not found with this id :" ,404))
  }

  if(order.orderStatus === "Delivered"){
    return next(new ErrorHandler("You have already delivered this order",404))
  }

  if (req.body.status === "Shipped") {
  order.orderItems.forEach(async(order) =>{
    await updateStock(order.product, order.quantity);
  });
}

  // check order status
  order.orderStatus = req.body.status;

  // send order status
  if(req.body.status === "Delivered"){
    order.deliveredAt = Date.now()
  }
  let totalAmount = 0;
  await order.save({validateBeforeSave : false});
  res.status(200).json({
    success:true,
    totalAmount,
    order,
  });
});

async function updateStock(id,quantity){
  const product = await Product.findById(id);
  product.Stock = product.Stock - quantity ;
  await product.save({validateBeforeSave : false});

}

//  Delete Orders -- Admin

exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
  const order = await Order.findByIdAndRemove(req.params.id);

  if(!order){
    return next (new ErrorHandler ("Order not found with this id :" ,404))
  }

  res.status(200).json({
    success:true,
  });
});