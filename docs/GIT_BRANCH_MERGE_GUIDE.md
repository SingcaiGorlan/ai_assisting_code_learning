# Git 分支管理与合并完整指南

本文档详细说明如何管理项目功能分支，以及如何将它们安全地合并到主分支。

## 📋 当前分支状态

### 已创建的功能分支

```
main (主分支 - 稳定版本)
├── feature/user-center          # 用户中心功能 ✅
├── feature/learning-center      # 学习中心功能 ✅  
└── feature/ai-assistant         # AI助手功能 ✨ 新增
```

### 各分支包含内容

| 分支 | 主要文件 | 功能描述 |
|------|---------|---------|
| `feature/user-center` | `web/app/src/views/UserCenter.vue` | 用户资料、统计数据、功能菜单 |
| `feature/learning-center` | `web/app/src/views/LearningCenter.vue` | 课程列表、进度追踪、筛选搜索 |
| `feature/ai-assistant` | `web/app/src/views/AIAssistant.vue` | AI对话、代码分析、代码生成 |

**所有分支都修改了**: `web/app/src/App.vue` (添加导航链接)

---

## 🎯 推荐合并策略

根据项目规模和需求，提供三种合并方案：

### 方案一：逐个合并（适合小型团队）⭐ 推荐

**优点：**
- 简单直接
- 易于追踪问题
- 可以分别测试每个功能

**步骤：**

#### 第1步：合并用户中心

```bash
# 1. 切换到主分支并确保最新
git checkout main
git pull origin main

# 2. 合并用户中心分支
git merge feature/user-center --no-ff -m "merge: 合并用户中心功能

- 添加用户中心页面
- 显示用户资料和统计数据
- 提供个人资料、学习进度、对话历史等功能入口"

# 3. 推送到远程
git push origin main
```

#### 第2步：合并学习中心

```bash
# 1. 确保主分支最新
git checkout main
git pull origin main

# 2. 合并学习中心分支
git merge feature/learning-center --no-ff -m "merge: 合并学习中心功能

- 添加学习中心页面
- 实现课程列表和进度追踪
- 提供课程筛选和搜索功能"

# 3. ⚠️ 可能需要解决 App.vue 冲突
# 4. 推送到远程
git push origin main
```

#### 第3步：合并AI助手

```bash
# 1. 确保主分支最新
git checkout main
git pull origin main

# 2. 合并AI助手分支
git merge feature/ai-assistant --no-ff -m "merge: 合并AI助手功能

- 添加AI助手页面
- 实现智能对话、代码分析、代码生成
- 集成OpenAI API接口"

# 3. ⚠️ 可能需要解决 App.vue 冲突
# 4. 推送到远程
git push origin main
```

---

### 方案二：集成分支测试（适合中型项目）

先在一个集成分支中合并所有功能，测试通过后再合并到主分支。

```bash
# ==========================================
# 第一步：创建集成分支
# ==========================================
git checkout main
git checkout -b develop/integration

# ==========================================
# 第二步：依次合并所有功能
# ==========================================

# 合并用户中心
git merge feature/user-center --no-ff -m "merge: 集成用户中心"

# 合并学习中心（可能有冲突）
git merge feature/learning-center --no-ff -m "merge: 集成学习中心"

# 合并AI助手（可能有冲突）
git merge feature/ai-assistant --no-ff -m "merge: 集成AI助手"

# ==========================================
# 第三步：在集成分支上全面测试
# ==========================================
# 1. 启动应用
cd web/app && npm run dev

# 2. 测试所有功能
# - 导航栏所有链接正常
# - 用户中心页面显示正确
# - 学习中心功能完整
# - AI助手三大模块可用

# 3. 运行lint检查
cd ../.. && make lint

# ==========================================
# 第四步：合并到主分支
# ==========================================
git checkout main
git pull origin main
git merge develop/integration --no-ff -m "merge: 集成分支合并到主分支

包含功能:
- 用户中心
- 学习中心  
- AI助手"

# ==========================================
# 第五步：推送
# ==========================================
git push origin main
git push origin develop/integration
```

---

### 方案三：Pull Request（团队协作最佳实践）⭐⭐⭐

适合团队协作，支持代码审查和自动化测试。

#### GitHub/GitLab 操作流程：

##### 1. 推送所有功能分支到远程

```bash
# 推送用户中心
git checkout feature/user-center
git push origin feature/user-center

# 推送学习中心
git checkout feature/learning-center
git push origin feature/learning-center

# 推送AI助手
git checkout feature/ai-assistant
git push origin feature/ai-assistant
```

##### 2. 创建 Pull Request

**在 GitHub 上操作：**

1. 访问仓库页面：https://github.com/SingcaiGorlan/ai_assisting_code_learning
2. 点击 "Pull requests" → "New pull request"
3. 选择分支：`feature/user-center` → `main`
4. 填写PR信息：
   ```
   Title: feat: 添加用户中心功能
   
   Description:
   ## 变更内容
   - 创建用户中心页面
   - 显示用户资料和统计数据
   - 提供功能菜单导航
   
   ## 测试
   - [x] 本地测试通过
   - [x] 导航正常工作
   - [x] 样式显示正确
   
   ## 截图
   （附上界面截图）
   ```
5. 请求团队成员审查
6. 等待 CI/CD 检查通过
7. 审查通过后点击 "Merge Pull Request"

##### 3. 重复步骤2合并其他分支

按顺序创建 PR：
1. `feature/user-center` → `main`
2. `feature/learning-center` → `main`
3. `feature/ai-assistant` → `main`

---

## ⚠️ 处理合并冲突

由于所有分支都修改了 `App.vue`，合并时很可能产生冲突。

### 冲突示例

```vue
<<<<<<< HEAD
<!-- main分支或上一个合并的内容 -->
<a href="#" @click.prevent="currentView = 'user'">用户中心</a>
=======
<!-- 当前要合并的分支内容 -->
<a href="#" @click.prevent="currentView = 'learning'">学习中心</a>
>>>>>>> feature/learning-center
```

### 解决方法

#### 方法1：手动解决（推荐）

```bash
# 1. 打开冲突文件
code web/app/src/App.vue

# 2. 找到冲突标记（<<<<<<, =======, >>>>>>）

# 3. 保留所有需要的代码，删除冲突标记
# 最终结果应该类似：
<div class="nav-links">
  <a href="#" @click.prevent="currentView = 'home'" :class="{ active: currentView === 'home' }">首页</a>
  <a href="#" @click.prevent="currentView = 'ai'" :class="{ active: currentView === 'ai' }">AI 助手</a>
  <a href="#" @click.prevent="currentView = 'user'" :class="{ active: currentView === 'user' }">用户中心</a>
  <a href="#" @click.prevent="currentView = 'learning'" :class="{ active: currentView === 'learning' }">学习中心</a>
  <a href="#" @click="goAdmin">管理后台</a>
</div>

# 4. 保存文件

# 5. 标记为已解决
git add web/app/src/App.vue

# 6. 完成合并
git commit -m "fix: 解决App.vue合并冲突，整合所有导航链接"
```

#### 方法2：使用合并工具

```bash
# 使用 git mergetool
git mergetool

# 或使用 VS Code 内置工具
code --wait web/app/src/App.vue
```

#### 方法3：使用 theirs/ours 策略（谨慎使用）

```bash
# 如果确定要使用某个分支的版本
git merge feature/learning-center -X theirs

# 或使用当前分支的版本
git merge feature/learning-center -X ours
```

⚠️ **注意**：这种方法会完全覆盖另一个分支的更改，通常不推荐。

---

## 📝 完整合并操作清单

### 合并前检查

- [ ] 功能分支已通过本地测试
- [ ] 运行 `make lint` 无错误
- [ ] 没有未提交的更改 (`git status`)
- [ ] main 分支是最新的 (`git pull origin main`)
- [ ] 备份重要数据（可选）
- [ ] 通知团队成员

### 合并操作步骤

```bash
# ==========================================
# 准备阶段
# ==========================================

# 1. 查看当前分支状态
git branch -a
git log --oneline --graph --all -10

# 2. 切换到主分支
git checkout main

# 3. 拉取最新代码
git pull origin main

# 4. 确认工作区干净
git status

# ==========================================
# 合并阶段（以用户中心为例）
# ==========================================

# 5. 执行合并
git merge feature/user-center --no-ff -m "merge: 合并用户中心功能"

# 6. 如果有冲突
# - 编辑冲突文件
# - git add <file>
# - git commit

# 7. 验证合并结果
git log --oneline -5
git diff HEAD~1 HEAD --stat

# ==========================================
# 测试阶段
# ==========================================

# 8. 安装依赖（如果需要）
cd web/app && npm install

# 9. 启动开发服务器
npm run dev

# 10. 在浏览器中测试
# - 访问 http://localhost:5173
# - 测试所有新功能
# - 检查导航是否正常

# 11. 运行lint检查
cd ../.. && make lint

# ==========================================
# 推送阶段
# ==========================================

# 12. 推送到远程
git push origin main

# 13. 确认远程更新成功
# 访问 GitHub 查看提交记录

# ==========================================
# 清理阶段（可选）
# ==========================================

# 14. 删除已合并的本地分支
git branch -d feature/user-center

# 15. 删除远程分支
git push origin --delete feature/user-center
```

---

## 🔍 验证合并结果

### 1. 检查 Git 历史

```bash
# 查看合并提交
git log --oneline --graph -15

# 预期输出示例：
# *   xxxxxxx (HEAD -> main) merge: 合并AI助手功能
# |\  
# | * xxxxxxx feat: 添加完整的AI助手功能模块
# * | xxxxxxx merge: 合并学习中心功能
# |\ \  
# | |/  
# |/|   
# | * xxxxxxx feat: 添加学习中心页面
# * | xxxxxxx merge: 合并用户中心功能
# |\ \  
# | |/  
# |/|   
# | * xxxxxxx feat: 添加用户中心页面
# |/  
# * xxxxxxx (origin/main) previous commit
```

### 2. 测试应用功能

```bash
# 启动应用
cd web/app
npm run dev

# 在浏览器中访问 http://localhost:5173
# 逐项测试：
# ✓ 导航栏显示所有链接（首页、AI助手、用户中心、学习中心、管理后台）
# ✓ 点击"AI助手"显示AI功能页面
# ✓ 点击"用户中心"显示用户资料
# ✓ 点击"学习中心"显示课程列表
# ✓ 所有页面样式正常
# ✓ 页面切换流畅
```

### 3. 检查文件完整性

```bash
# 确认所有视图文件存在
ls -la web/app/src/views/
# 应该看到：
# AIAssistant.vue
# UserCenter.vue
# LearningCenter.vue

# 检查 App.vue 包含所有导入
grep -n "import.*from.*views" web/app/src/App.vue
# 应该看到三个 import 语句

# 检查导航链接
grep -n "currentView = " web/app/src/App.vue
# 应该看到所有视图类型的引用
```

### 4. 运行自动化测试

```bash
# 运行 Go 后端测试
make test

# 运行 lint 检查
make lint

# 如果有前端测试
cd web/app && npm run test
```

---

## 💡 最佳实践总结

### 1. 分支命名规范

```
feature/<功能名称>     # 新功能开发
bugfix/<问题描述>      # Bug修复
hotfix/<紧急修复>      # 生产环境紧急修复
develop/<用途>         # 开发集成分支
release/<版本号>       # 发布分支
```

**示例：**
- `feature/user-center`
- `feature/ai-chat`
- `bugfix/login-error`
- `hotfix/security-patch`

### 2. 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动
- `merge`: 合并分支

**示例：**
```
feat(ai): 添加AI代码分析功能

- 实现代码质量评分
- 提供改进建议
- 支持多种编程语言

Closes #123
```

### 3. 合并策略选择

| 场景 | 推荐策略 | 原因 |
|------|---------|------|
| 个人项目 | 方案一（逐个合并） | 简单直接 |
| 小团队（2-5人） | 方案二（集成分支） | 充分测试 |
| 大团队（5人以上） | 方案三（Pull Request） | 代码审查 |
| 开源项目 | 方案三（Pull Request） | 社区协作 |

### 4. 使用 --no-ff 标志

始终使用 `--no-ff` (no fast-forward) 进行合并：

```bash
git merge feature/xxx --no-ff -m "merge: ..."
```

**优点：**
- 保留分支合并的历史记录
- 可以清晰地看到哪些提交属于哪个功能
- 方便后续回滚某个功能

### 5. 定期同步主分支

在功能开发过程中，定期从 main 分支拉取更新：

```bash
# 在功能分支上
git checkout feature/your-feature
git fetch origin
git merge origin/main

# 或使用 rebase（更干净的歷史）
git rebase origin/main
```

### 6. 合并前检查清单

```bash
# 快速检查脚本
#!/bin/bash
echo "🔍 合并前检查..."

# 1. 检查工作区是否干净
if [[ -n $(git status -s) ]]; then
    echo "❌ 有未提交的更改"
    exit 1
fi

# 2. 检查是否在正确的分支
current_branch=$(git branch --show-current)
if [[ "$current_branch" != "main" ]]; then
    echo "❌ 不在 main 分支上"
    exit 1
fi

# 3. 检查是否是最新的
git fetch origin
if [[ $(git rev-parse HEAD) != $(git rev-parse origin/main) ]]; then
    echo "⚠️  main 分支不是最新的，建议先 pull"
fi

# 4. 运行测试
echo "🧪 运行测试..."
make test || { echo "❌ 测试失败"; exit 1; }

# 5. 运行lint
echo "🔎 运行lint..."
make lint || { echo "❌ Lint失败"; exit 1; }

echo "✅ 检查通过，可以合并"
```

---

## 🆘 常见问题

### Q1: 合并后发现问题怎么办？

**A:** 立即回滚：

```bash
# 方法1: 重置到合并前的提交
git reset --hard HEAD~1
git push origin main --force

# 方法2: 创建一个新的 revert 提交（更安全）
git revert -m 1 <merge-commit-hash>
git push origin main
```

### Q2: 如何只合并某个特定的提交？

**A:** 使用 cherry-pick：

```bash
# 查看要合并的提交hash
git log feature/branch --oneline

# 挑选特定提交
git cherry-pick <commit-hash>
git push origin main
```

### Q3: 合并冲突太多怎么办？

**A:** 
1. 暂停合并：`git merge --abort`
2. 重新基于最新的 main：
   ```bash
   git checkout feature/branch
   git rebase main
   # 解决冲突
   git rebase --continue
   ```
3. 再尝试合并

### Q4: 如何查看两个分支的差异？

**A:**
```bash
# 比较分支差异
git diff main..feature/branch --stat

# 查看具体文件差异
git diff main..feature/branch -- web/app/src/App.vue
```

### Q5: 误删了分支怎么办？

**A:**
```bash
# 查看被删除的分支引用
git reflog

# 恢复分支
git branch feature/recovered <commit-hash>
```

---

## 📊 分支管理工作流图

```
开始开发新功能
    ↓
从 main 创建功能分支
    ↓
git checkout -b feature/new-feature
    ↓
开发功能并提交
    ↓
git add . && git commit -m "feat: ..."
    ↓
定期同步 main 分支
    ↓
git fetch && git merge origin/main
    ↓
功能开发完成
    ↓
运行测试和lint
    ↓
make test && make lint
    ↓
推送到远程
    ↓
git push origin feature/new-feature
    ↓
创建 Pull Request
    ↓
代码审查 & CI检查
    ↓
审查通过？
    ├─ 否 → 修改代码
    └─ 是 → 合并到 main
           ↓
        git merge --no-ff
           ↓
        测试验证
           ↓
        删除功能分支
           ↓
        完成 ✅
```

---

## 📚 相关资源

- [Git 官方文档](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**最后更新**: 2026-04-26  
**维护者**: 项目开发团队
