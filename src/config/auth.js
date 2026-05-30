/*
 * 用户账号配置
 * 密码为 SHA-256 十六进制哈希，生成命令：
 *   echo -n "你的密码" | openssl dgst -sha256
 */

export const users = [
  { username: 'preture', passwordHash: 'fb1c9144d166a2410f74d64b45ada5b7923c3fd7ff8e97a9965e7eef9a4f6f9d', role: 'admin' },
  { username: 'pengfei.zou', passwordHash: '6143a4cbb5a233a07c6db14bb84c532aa27265322f487e2307ffe4f010b40627'},
]
