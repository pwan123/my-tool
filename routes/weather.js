const express = require("express");
const router = express.Router();
const { getWeatherByCity } = require("../services/weatherService");

// GET /api/weather/:city - 查询指定城市天气
router.get("/:city", async (req, res) => {
  const { city } = req.params;

  if (!city || !city.trim()) {
    return res.status(400).json({ success: false, error: "请输入城市名称" });
  }

  try {
    const data = await getWeatherByCity(city);

    if (!data) {
      return res.status(404).json({ success: false, error: "未找到该城市的天气信息" });
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/weather - 查询默认城市天气（北京）
router.get("/", async (req, res) => {
  try {
    const data = await getWeatherByCity("北京");

    if (!data) {
      return res.status(404).json({ success: false, error: "未找到天气信息" });
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
