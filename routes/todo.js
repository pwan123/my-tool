const express = require("express");
const router = express.Router();

// 模拟数据存储（练手阶段先用内存数组）
let todos = [];

// 1.获取所有待办
router.get("/todos", async (req, res) => {
  res.json(todos);
});

// 2.新增一个待办
router.post("/todos", async (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

module.exports = router;
