const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const DATA_FILE = path.join(__dirname, "..", "data", "todos.json");

function loadTodos() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (err) {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), "utf-8");
}

// 从文件加载持久化数据
let todos = loadTodos();

// 1.获取所有待办
router.get("/todos", async (req, res) => {
  res.json(todos);
});

// 2.新增一个待办
router.post("/todos", async (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(newTodo);
  saveTodos(todos); // 保存到文件
  res.status(201).json(newTodo);
});

// 3.切换待办的完成状态
router.patch("/todos/:id", async (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "待办不存在" });
  todo.done = !todo.done;
  saveTodos(todos); // 保存到文件
  res.json(todo);
});

// 4.删除一个待办
router.delete("/todos/:id", async (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "待办不存在" });
  todos.splice(index, 1);
  saveTodos(todos); // 保存到文件
  res.status(204).send();
});

module.exports = router;
