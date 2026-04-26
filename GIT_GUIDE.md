# Git 配置和使用指南

## 📋 快速配置 Git

### 方法 1: 使用配置脚本(推荐)

```bash
./setup-git.sh
```

脚本会引导你设置:
- 用户名和邮箱
- 默认分支名称
- 常用 Git 别名
- 其他优化配置

### 方法 2: 手动配置

```bash
# 设置用户名和邮箱(必须)
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"

# 设置默认分支
git config --global init.defaultBranch main

# 设置推送行为
git config --global push.default simple

# 启用彩色输出
git config --global color.ui auto

# 添加常用别名
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all --decorate"
```

## 🔍 验证配置

```bash
# 查看所有全局配置
git config --global --list

# 查看当前仓库配置
git config --local --list
```

## 📝 基本工作流程

### 1. 查看状态
```bash
git status
# 或使用别名
git st
```

### 2. 添加文件到暂存区
```bash
# 添加所有更改
git add .

# 添加特定文件
git add filename.go

# 交互式添加
git add -p
```

### 3. 提交更改
```bash
git commit -m "描述性的提交信息"

# 或使用别名
git ci -m "描述性的提交信息"
```

### 4. 推送到远程仓库
```bash
# 推送到 origin 的 main 分支
git push origin main

# 首次推送并设置上游分支
git push -u origin main
```

### 5. 拉取更新
```bash
git pull origin main
```

## 🌿 分支管理

```bash
# 创建新分支
git branch feature/new-feature

# 切换分支
git checkout feature/new-feature
# 或
git co feature/new-feature

# 创建并切换分支
git checkout -b feature/new-feature

# 查看所有分支
git branch
# 或
git br

# 删除分支
git branch -d feature/new-feature

# 合并分支
git merge feature/new-feature
```

## 🔎 查看历史

```bash
# 查看简洁日志
git log --oneline

# 查看图形化日志
git lg

# 查看最近一次提交
git last

# 查看特定文件的修改历史
git log -p filename.go
```

## 🔄 撤销操作

```bash
# 撤销工作区的修改
git checkout -- filename.go

# 取消暂存的文件
git reset HEAD filename.go

# 撤销最后一次提交(保留更改)
git reset --soft HEAD~1

# 撤销最后一次提交(丢弃更改)
git reset --hard HEAD~1
```

## 🏷️ 标签管理

```bash
# 创建标签
git tag v1.0.0

# 创建带注释的标签
git tag -a v1.0.0 -m "版本 1.0.0"

# 推送标签
git push origin v1.0.0

# 推送所有标签
git push origin --tags

# 查看所有标签
git tag
```

## 📦 当前仓库信息

- **远程仓库**: https://github.com/SingcaiGorlan/ai_assisting_code_learning.git
- **主分支**: main
- **当前状态**: 已配置远程仓库

## ⚠️ 注意事项

1. **敏感信息**: 不要将 `.env` 文件、密钥、密码等敏感信息提交到 Git
2. **提交信息**: 使用清晰、描述性的提交信息
3. **频繁提交**: 小的、频繁的提交比大的提交更容易管理
4. **同步更新**: 在开始工作前先 `git pull` 获取最新代码
5. **代码审查**: 重要更改建议使用 Pull Request 进行代码审查

## 🛠️ 常见问题

### Q: 如何修改最后一次提交信息?
```bash
git commit --amend -m "新的提交信息"
```

### Q: 如何查看两个提交的差异?
```bash
git diff commit1 commit2
```

### Q: 如何暂存当前工作?
```bash
git stash
# 恢复暂存
git stash pop
```

### Q: 如何回退到某个提交?
```bash
git reset --hard <commit-hash>
```

## 📚 学习资源

- [Git 官方文档](https://git-scm.com/doc)
- [Git 教程 - 菜鸟教程](https://www.runoob.com/git/git-tutorial.html)
- [Pro Git 书籍](https://git-scm.com/book/zh/v2)
