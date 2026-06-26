// 天气查询服务模块 - 调用 wttr.in 免费天气 API

/**
 * 根据城市名查询实时天气
 * @param {string} city - 城市名称，支持中文和英文
 * @returns {Promise<Object>} 格式化后的天气数据
 */

async function getWeatherByCity(city) {
  // 对城市名进行 URL 编码
  const encodedCity = encodeURIComponent(city);
  // 构建请求URL
  const url = `https://wttr.in/${encodedCity}?format=j1`;

  //设置5秒超时
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    // 提取关键字段
    const current = data.current_condition?.[0];
    const area = data.nearest_area?.[0];

    // 解析未来3天预报数据
    const forecast = (data.weather || []).slice(0, 3).map((day) => ({
      date: day.date,
      maxTemp: day.maxtempC,
      minTemp: day.mintempC,
      weatherDesc: day.hourly?.find((h) => h.time === "1200" || h.time === "1500")?.weatherDesc?.[0]?.value || day.hourly?.[0]?.weatherDesc?.[0]?.value || "",
    }));

    if (!current || !area) {
      return null;
    }

    return {
      city: area.areaName[0].value,
      country: area.country[0].value,
      temperature: current.temp_C,
      feelsLike: current.FeelsLikeC,
      humidity: current.humidity,
      weatherDesc: current.weatherDesc[0].value,
      windSpeed: current.windspeedKmph,
      visibility: current.visibility,
      forecast,
    };
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("请求超时，请稍后重试");
    }
    throw new Error("获取天气信息失败，请检查网络");
  } finally {
    clearTimeout(timeout);
  }
}

// 导出函数，供路由模块使用
module.exports = { getWeatherByCity };
