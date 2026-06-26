const express = require("express");
const router = express.Router();
const { translateText } = require("../services/translateService");
// POST /api/translate - 翻译文本
router.post("/", async (req, res) => {
  const { q, source, target } = req.body;

  if (!q || !q.trim()) {
    return res.status(400).json({ success: false, error: "请输入待翻译的文本" });
  }

  if (!target) {
    return res.status(400).json({ success: false, error: "请选择目标语言" });
  }

  const data = await translateText(q, source, target);
  res.json({ success: true, data });
});

module.exports = router;
