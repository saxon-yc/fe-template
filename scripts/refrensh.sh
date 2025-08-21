#!/bin/sh

PROJECT_NAME=$1
PROJECT_DIR="/frontend/lib"
ABSOLUTE_PATH="$PROJECT_DIR/$PROJECT_NAME"

if [ -d "$ABSOLUTE_PATH" ]; then
  echo "备份之前的包"
  mv "$ABSOLUTE_PATH" "$ABSOLUTE_PATH.bak.$(date +%Y%m%d_%H%M%S)"
  echo "备份完成"
fi

echo "解压 $PROJECT_NAME.tgz ..."
tar -xzvf $ABSOLUTE_PATH.tgz -C $PROJECT_DIR;
echo "解压完成..."


echo "删除 $PROJECT_NAME.tgz ..."
rm -rf $ABSOLUTE_PATH.tgz;
echo "删除完成..."