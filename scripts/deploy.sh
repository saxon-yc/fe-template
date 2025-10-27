#!/bin/bash

PROJECT_NAME="fe-template"

PRODUCTION_IP_ADDRESS="fe-prod-server"
PRODUCTION_BIN_PATH="/frontend/bin" # 脚本目录
PRODUCTION_LIB_PATH="/frontend/lib" # 包（源码）目录

TESTING_IP_ADDRESS="fe-testing-server"
TESTING_BIN_PATH="/frontend/bin" # 脚本目录
TESTING_LIB_PATH="/frontend/lib" # 包（源码）目录

function sync_portal() {
  DEPLOYMENT_ENV=$1

  mkdir $PROJECT_NAME

  echo "移动文件 ..."
  cp -r ./dist/*  $PROJECT_NAME/
  echo "移动完成"

  echo "打包压缩 ..."
  tar -czvf $PROJECT_NAME.tgz $PROJECT_NAME/
  echo "完成压缩"

  if [ "$DEPLOYMENT_ENV" = "production" ]; then
    BIN_PATH=$PRODUCTION_BIN_PATH
    LIB_PATH=$PRODUCTION_LIB_PATH
    PROXY=$PRODUCTION_IP_ADDRESS
  elif [ "$DEPLOYMENT_ENV" = "testing" ]; then
    BIN_PATH=$TESTING_BIN_PATH
    LIB_PATH=$TESTING_LIB_PATH
    PROXY=$TESTING_IP_ADDRESS
  else
    echo "未知的部署环境 $DEPLOYMENT_ENV"
    exit 1
  fi

  echo "上传 $PROJECT_NAME.tgz 到 $PROXY 服务器 ..."

  # 加载 SSH 代理
  eval $(ssh-agent) > /dev/null
  ssh-add ~/.ssh/id_rsa 2> /dev/null

  # 增强连接参数
  RSYNC_OPTS=(
    -avz
    --progress
    --timeout=30
    --contimeout=30
    -e "ssh -o TCPKeepAlive=yes -o ServerAliveInterval=15 -o ConnectTimeout=30"
  )

  # 智能选择 rsync
  if command -v wsl &> /dev/null; then
    wsl rsync "${RSYNC_OPTS[@]}" $PROJECT_NAME.tgz root@$PROXY:$LIB_PATH
  else
    rsync "${RSYNC_OPTS[@]}" $PROJECT_NAME.tgz root@$PROXY:$LIB_PATH
  fi

  # 验证结果
  if [ $? -eq 0 ]; then
    echo "✅ 上传成功"
  else
    echo "❌ rsync上传失败，错误码: $?"
    # 回退方案：使用 scp
    scp -o ConnectTimeout=30 $PROJECT_NAME.tgz root@$PROXY:$LIB_PATH
  fi

  echo "解压 $PROJECT_NAME.tgz ..."
  ssh root@$PROXY "cd $BIN_PATH && sh refrensh.sh $PROJECT_NAME"
  echo "解压完成并退出 ..."

  echo "清除压缩包 ..."
  rm -rf ./$PROJECT_NAME.tgz
  rm -rf ./$PROJECT_NAME
  echo "完成清除"
}

#exit
sync_portal $1

exit 0