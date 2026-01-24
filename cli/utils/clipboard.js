/**
 * 剪贴板工具 - 跨平台支持
 * 解决 Linux Wayland 下的剪贴板问题
 */

import clipboardy from 'clipboardy';
import { execa } from 'execa';

/**
 * 将文本复制到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<void>}
 */
export async function copyToClipboard(text) {
  try {
    // 1. 尝试通用方案 (Mac/Windows/X11)
    await clipboardy.write(text);
  } catch (err) {
    // 2. Linux Wayland 降级方案
    if (process.env.XDG_SESSION_TYPE === 'wayland') {
      try {
        await execa('wl-copy', { input: text });
        return;
      } catch (e) {
        console.error('❌ Wayland clipboard failed. Install wl-clipboard.');
        throw e;
      }
    }
    throw err;
  }
}
