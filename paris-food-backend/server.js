require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ordersRouter = require("./routes/orders");
const path = require("path");

const app = express();

const corsOptions = {
  origin: "https://easy-food-ten.vercel.app", // 允许的前端应用的URL
  optionsSuccessStatus: 200, // 一些旧版浏览器对204状态不兼容
};

// 中间件
app.use(cors(corsOptions));
app.use(express.json());

// 提供静态文件
app.use(express.static(path.join(__dirname, "public")));

// 连接MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// 路由
app.use("/api/orders", ordersRouter);

// 为根路径定义一个简单的路由
app.get("/", (req, res) => {
  res.send("Welcome to EasyFood!");
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "服务器错误" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
