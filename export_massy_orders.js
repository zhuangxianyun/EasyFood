const fs = require("fs");
const path = require("path");

// 读取 massy_orders.json 文件
function exportMassyOrdersToCSV() {
  try {
    // 读取 JSON 文件
    const jsonData = fs.readFileSync("massy_orders.json", "utf8");
    const orders = JSON.parse(jsonData).orders;

    // 定义 CSV 头部
    const csvHeader =
      [
        "订单时间",
        "昵称",
        "微信号",
        "自提日期",
        "自提时间",
        "商品详情",
        "商品总价",
        "订单总价",
      ].join(",") + "\n";

    // 转换订单数据为 CSV 行
    const csvRows = orders
      .map((order) => {
        // 将商品信息格式化为一个字符串
        const itemsDetail = order.orderItems
          .map((item) => `${item.name}(${item.quantity}份)`)
          .join("; ");

        // 构建 CSV 行
        return [
          order.orderTime,
          order.nickname,
          order.wechat,
          order.pickupDate,
          order.pickupTime,
          `"${itemsDetail}"`, // ���引号包裹，避免分号导致的分列
          order.subtotal,
          order.total,
        ].join(",");
      })
      .join("\n");

    // 组合完整的 CSV 内容
    const csvContent = csvHeader + csvRows;

    // 生成文件名（使用当前时间戳）
    const fileName = `massy_orders_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    // 写入文件
    fs.writeFileSync(fileName, "\ufeff" + csvContent); // 添加 BOM，确保 Excel 正确显示中文

    console.log(`已成功导出 CSV 文件：${fileName}`);
  } catch (error) {
    console.error("导出失败:", error);
  }
}

// 执行导出
exportMassyOrdersToCSV();
