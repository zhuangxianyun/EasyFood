const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const app = express();

// 启用 CORS 和 JSON 解析
app.use(cors());
app.use(express.json());

async function saveOrder(fileName, orderData) {
  try {
    // 读取现有订单
    let orders;
    try {
      const data = await fs.readFile(fileName, "utf8");
      orders = JSON.parse(data);
    } catch (error) {
      // 如果文件不存在或为空，创建新的订单数组
      orders = { orders: [] };
    }

    // 添加新订单
    orders.orders.push(orderData);

    // 保存更新后的订单
    await fs.writeFile(fileName, JSON.stringify(orders, null, 2));

    return true;
  } catch (error) {
    console.error("保存订单失败:", error);
    return false;
  }
}

app.post("/massy_orders.json", async (req, res) => {
  try {
    const success = await saveOrder("massy_orders.json", req.body);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/cite_orders.json", async (req, res) => {
  try {
    const success = await saveOrder("cite_orders.json", req.body);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 添加错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "服务器内部错误" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
