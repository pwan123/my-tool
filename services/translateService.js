// 翻译服务 - 调用 MyMemory 免费 API

// 支持的语言列表(用于校验和前端展示)
const SUPPORTED_LANGUAGES = {
  "zh-CN": "中文（简体）",
  "zh-TW": "中文（繁体）",
  ja: "日语",
  ko: "韩语",
  fr: "法语",
  de: "德语",
  es: "西班牙语",
  ru: "俄语",
  ar: "阿拉伯语",
  pt: "葡萄牙语",
  it: "意大利语",
  nl: "荷兰语",
  pl: "波兰语",
  th: "泰语",
  vi: "越南语",
};

/**
 * 翻译文本
 * @param {string} text - 待翻译文本
 * @param {string} source -源语言代码
 * @param {string} target -目标语言代码
 * @return {Promise<Object>} 翻译结果
 */
async function translateText(text, source, target) {
  // 参数校验
  if (!text || !text.trim()) {
    throw new Error("请输入待翻译的文本");
  }

  const srcLang = source || "auto"; //auto表示自动检测
  const tgtLang = target || "zh-CN";

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${srcLang}|${tgtLang}`;

  //设置 5 秒超时
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetail || "翻译服务异常");
    }

    return {
      translatedText: data.responseData.translatedText,
      source: source || "auto",
      target: target,
      match: data.responseData.match,
    };
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("请求超时，请稍后重试");
    }
    throw new Error("翻译服务暂时不可用，请稍后重试");
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = { translateText, SUPPORTED_LANGUAGES };
