require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ordersRouter = require("./routes/orders");

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 连接MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// 路由
app.use("/api/orders", ordersRouter);

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "服务器错误" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
