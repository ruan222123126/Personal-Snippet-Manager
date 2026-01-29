/**
 * CLI API 客户端
 * 与 Next.js API 通信
 */

const API_BASE = 'http://localhost:3002/api/snippets';

/**
 * 搜索代码片段
 * @param {string} query - 搜索关键词
 * @returns {Promise<Array>} 代码片段列表
 */
export async function searchSnippets(query = '') {
  const url = new URL(API_BASE);
  if (query) {
    url.searchParams.set('q', query);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * 创建新的代码片段
 * @param {Object} data - 代码片段数据
 * @param {string} data.title - 标题
 * @param {string} data.code - 代码内容
 * @param {string} data.language - 编程语言
 * @param {string} [data.description] - 描述
 * @param {string[]} [data.tags] - 标签数组
 * @returns {Promise<Object>} 创建的代码片段
 */
export async function createSnippet(data) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`创建失败: ${error}`);
  }

  return response.json();
}
