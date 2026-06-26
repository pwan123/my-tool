// 创建入口文件

const express = require("express");
const weatherRouter = require("./routes/weather");
const translateRouter = require("./routes/translate");
const todoRouter = require("./routes/todo");

const app = express();
const port = process.env.PORT || 3000;

// 解析JSON请求体
app.use(express.json());
// 托管静态文件(前端页面)
app.use(express.static("public"));

// 天气查询和翻译工具路由
app.use("/api/weather", weatherRouter);
app.use("/api/translate", translateRouter);
app.use("/api/todo", todoRouter);

// 启动服务
app.listen(port, () => {
  console.log(`工具已启动:http://localhost:${port}`);
});
