import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @ route      POST api/orders
// @desc         Create new Order
// @access        Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @ route      GET api/orders/:id
// @desc         Get order by id
// @access        Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

// @ route      GET api/orders/:id
// @desc         Update /api/orders/:id/pay
// @access        Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

// @ route      put /api/orders/:id/deliver
// @desc         Update order to delivered
// @access        Private
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});
// @ route      GET logged in user orders
// @desc         Update /api/orders/myOrders
// @access        Private
export const GetUserOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(404);
    throw new Error("orders not found");
  }
});

// @ route       GET All orders
// @desc         Update /api/orders
// @access        Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user");
  res.json(orders);
});
