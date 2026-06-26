// 创建入口文件
const express = require("express");
const morgan = require("morgan");

const weatherRouter = require("./routes/weather");
const translateRouter = require("./routes/translate");
const todoRouter = require("./routes/todo");

const app = express();
const port = process.env.PORT || 3000;

// 解析JSON请求体
app.use(express.json());
// 托管静态文件(前端页面)
app.use(express.static("public"));
// 添加请求日志
app.use(morgan("dev"));

// 天气查询和翻译工具路由
app.use("/api/weather", weatherRouter);
app.use("/api/translate", translateRouter);
app.use("/api/todo", todoRouter);

// 全局错误处理中间件（Express 通过 4 个参数识别为错误处理器）
app.use((err, req, res, _next) => {
  console.error("未捕获错误:", err);
  res.status(500).json({
    success: false,
    error: err.message || "服务器内部错误",
  });
});

// 启动服务
app.listen(port, () => {
  console.log(`工具已启动:http://localhost:${port}`);
});
