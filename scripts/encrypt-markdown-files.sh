#!/bin/bash
set -e

ENCRYPTED_FILE="restricted-content.enc"
SOURCE_DIRS=("protected" "privated")

for dir in "${SOURCE_DIRS[@]}"; do
  if [ ! -d "$dir" ] || [ -z "$(ls -A "$dir" 2>/dev/null)" ]; then
    echo "❌ $dir 目录不存在或为空"
    echo "   请先在 $dir 下创建笔记文件"
    exit 1
  fi
done

read -s -p "🔐 输入加密密码: " PASS
echo
read -s -p "🔐 确认密码: " PASS2
echo

if [ "$PASS" != "$PASS2" ]; then
  echo "❌ 两次密码不一致"
  exit 1
fi

tar czf - "${SOURCE_DIRS[@]}" \
  | openssl enc -aes-256-cbc -pbkdf2 -pass "pass:$PASS" \
  -out "$ENCRYPTED_FILE"

echo "✅ 已加密为 $ENCRYPTED_FILE ($(du -h "$ENCRYPTED_FILE" | cut -f1))"
