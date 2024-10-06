#!/bin/bash

# 检查远程仓库是否存在
git ls-remote &> /dev/null

# 获取上一个命令的退出状态
exit_status=$?

if [ $exit_status -eq 0 ]; then
    echo "远程仓库存在，执行 git pull 和 git push"
    git pull
    git add -A
    git-cz
    git push
else
    echo "远程仓库不存在，仅执行 git add 和 git-cz"
    git add -A
    git-cz
fi
