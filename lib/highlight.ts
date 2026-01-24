/**
 * 搜索结果高亮工具
 */

/**
 * 从搜索查询中提取关键词
 * 移除 FTS5 特殊字符和常见停用词
 *
 * @param query - 搜索查询字符串
 * @returns 关键词数组
 */
export function extractKeywords(query: string): string[] {
  if (!query) return [];

  // 移除 FTS5 运算符和引号
  const cleaned = query
    .replace(/[+\-<>~"()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // 简单停用词列表（可根据需要扩展）
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    '的', '了', '和', '是', '在', '有', '不', '这', '个', '我', '你', '他',
  ]);

  // 分词并过滤停用词和空词
  const keywords = cleaned
    .split(' ')
    .map(word => word.toLowerCase().trim())
    .filter(word => word.length > 1 && !stopWords.has(word));

  return [...new Set(keywords)]; // 去重
}

/**
 * 高亮文本中的关键词
 * 使用 <mark> 标签包裹匹配的文本
 *
 * @param text - 要高亮的文本
 * @param keywords - 关键词数组
 * @returns 带有高亮标记的 HTML 字符串（需要使用 dangerouslySetInnerHTML）
 */
export function highlightKeywords(text: string, keywords: string[]): string {
  if (!text || !keywords || keywords.length === 0) {
    return escapeHtml(text);
  }

  // 转义 HTML 特殊字符
  let escaped = escapeHtml(text);

  // 按关键词长度降序排序，避免短关键词破坏长关键词的匹配
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);

  for (const keyword of sortedKeywords) {
    // 创建正则表达式，全局匹配，忽略大小写
    const regex = new RegExp(`(${escapeRegex(keyword)})`, 'gi');
    // 使用 <mark> 标签高亮
    escaped = escaped.replace(regex, '<mark>$1</mark>');
  }

  return escaped;
}

/**
 * 转义 HTML 特殊字符
 */
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 转义正则表达式特殊字符
 */
function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
