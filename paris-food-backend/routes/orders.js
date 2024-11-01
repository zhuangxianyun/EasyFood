const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST 创建新订单
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    console.error("保存订单错误:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET 获取所有订单（可选）
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
