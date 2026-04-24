# 代码审查指南

本文档旨在帮助团队成员进行高效的代码审查，确保代码质量和团队一致性。

---

## 📋 目录

1. [代码审查原则](#1-代码审查原则)
2. [审查流程](#2-审查流程)
3. [检查清单](#3-检查清单)
4. [常见问题](#4-常见问题)
5. [最佳实践](#5-最佳实践)

---

## 1. 代码审查原则

### 1.1 核心原则

- **建设性批评** - 审查目的是改进代码，而非批评作者
- **尊重与礼貌** - 保持专业和友好的态度
- **效率优先** - 及时响应，避免阻塞开发
- **关注本质** - 专注于架构、逻辑和可维护性
- **可执行的建议** - 提供具体的改进方案

### 1.2 审查者的角色

- 🔍 发现潜在问题
- 📚 确保代码符合规范
- 🎓 知识分享与学习
- ✅ 保证代码质量
- 🤝 促进团队协作

---

## 2. 审查流程

### 2.1 接收 Pull Request

1. **快速浏览**
   - 查看描述和变更文件
   - 了解 PR 目的和影响范围
   - 评估优先级（优先审查关键 PR）

2. **详细审查**
   - 逐行审查代码变更
   - 运行代码检查
   - 在本地测试（如需）

3. **提供反馈**
   - 对每个问题进行分类
   - 提供明确的改进建议
   - 标记需要修改的问题

4. **完成审查**
   - 所有问题解决后批准
   - 或在必要时拒绝并说明原因

### 2.2 反馈分类

使用标准标签分类反馈：

- **必须修复 (Must Fix)** - 阻塞合并的问题
- **建议修改 (Should Fix)** - 非阻塞但强烈建议修改
- **可选改进 (Nice to Have)** - 小改进，不阻塞
- **疑问 (Question)** - 需要澄清的问题
- **赞赏 (Praise)** - 对优秀实现的正面反馈

### 2.3 代码审查模板

```markdown
## 总体评价
[简短总结整体印象]

## 架构与设计
- [ ] 代码结构是否合理
- [ ] 是否遵循项目架构
- [ ] 是否过度设计或设计不足

## 代码质量
- [ ] 命名是否清晰
- [ ] 逻辑是否正确
- [ ] 是否有代码重复

## 错误处理
- [ ] 是否正确处理错误
- [ ] 是否有遗漏的边界情况
- [ ] 错误信息是否清晰

## 性能考虑
- [ ] 是否有性能问题
- [ ] 是否需要优化
- [ ] 资源使用是否合理

## 安全性
- [ ] 是否有安全漏洞
- [ ] 敏感信息是否妥善处理
- [ ] 输入是否充分验证

## 测试覆盖
- [ ] 是否有单元测试
- [ ] 测试是否充分
- [ ] 是否有集成测试

## 文档
- [ ] 注释是否充分
- [ ] API 文档是否更新
- [ ] README 是否需要更新

## 具体建议
### 文件: file.go:行号
**类型**: [Must Fix / Should Fix / Nice to Have]
**问题**: [描述问题]
**建议**: [具体改进建议]

## 最终决定
- [ ] 批准 (Approve)
- [ ] 请求修改 (Request Changes)
- [ ] 无意见 (No Opinion)

## 其他备注
[任何其他建议或备注]
```

---

## 3. 检查清单

### 3.1 功能性检查

- [ ] **功能正确性**
  - 代码是否实现预期功能
  - 逻辑是否正确
  - 是否有明显的 bug

- [ ] **边界情况**
  - 是否处理空值、nil 指针
  - 是否处理数组/切片越界
  - 是否处理并发场景

- [ ] **错误处理**
  - 是否正确处理所有错误返回
  - 错误是否向上传播或适当处理
  - 错误信息是否清晰有用

### 3.2 代码质量检查

- [ ] **命名规范**
  - 变量、函数、类型命名是否清晰
  - 是否遵循 Go 命名规范
  - 命名是否与领域模型一致

- [ ] **代码结构**
  - 函数是否过长（通常 < 50 行）
  - 是否有重复代码
  - 是否遵循单一职责原则

- [ ] **注释文档**
  - 导出的函数/类型是否有注释
  - 复杂逻辑是否有解释注释
  - 注释是否与代码一致

### 3.3 Go 特定检查

```go
// ✅ 好的实践
func GetUserByID(id int64) (*User, error) {
    var user User
    err := db.First(&user, id).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, ErrUserNotFound
        }
        return nil, fmt.Errorf("failed to get user: %w", err)
    }
    return &user, nil
}

// ❌ 避免
func GetUser(id int) *User {
    var u User
    db.First(&u, id)
    return &u  // 忽略错误，可能返回空对象
}
```

检查项目：

- [ ] 是否正确处理错误
- [ ] 是否正确使用 defer（资源清理）
- [ ] 是否正确使用 goroutine 和 channel
- [ ] 是否有内存泄漏风险
- [ ] 是否使用 context 进行超时控制

### 3.4 性能检查

- [ ] **查询效率**
  - 数据库查询是否使用索引
  - 是否有 N+1 查询问题
  - 是否有不必要的查询

- [ ] **资源使用**
  - 是否有不必要的内存分配
  - 是否正确关闭连接/文件
  - 是否正确使用缓存

- [ ] **并发安全**
  - 共享资源是否加锁
  - 是否使用线程安全的数据结构
  - 是否有死锁风险

```go
// ❌ 可能的性能问题
func GetUsers() []*User {
    var users []*User
    allUsers := db.Find(&users)  // 可能返回大量数据
    return allUsers
}

// ✅ 更好的实现
func GetUsers(limit, offset int) ([]*User, error) {
    var users []*User
    err := db.Limit(limit).Offset(offset).Find(&users).Error
    if err != nil {
        return nil, err
    }
    return users, nil
}
```

### 3.5 安全检查

- [ ] **输入验证**
  - 是否验证用户输入
  - 是否防止 SQL 注入
  - 是否防止 XSS 攻击

- [ ] **敏感信息**
  - 是否泄露敏感信息（密码、token）
  - 是否使用 HTTPS
  - 是否正确加密存储

- [ ] **权限控制**
  - 是否验证用户权限
  - 是否有越权访问风险

```go
// ❌ 安全问题：SQL 注入
func GetUser(name string) *User {
    query := fmt.Sprintf("SELECT * FROM users WHERE name = '%s'", name)
    db.Raw(query)
}

// ✅ 安全：使用参数化查询
func GetUser(name string) (*User, error) {
    var user User
    err := db.Where("name = ?", name).First(&user).Error
    return &user, err
}
```

### 3.6 测试检查

- [ ] **单元测试**
  - 是否有足够的单元测试
  - 测试是否覆盖主要场景
  - 测试命名是否清晰

- [ ] **测试质量**
  - 测试是否有断言
  - 是否测试错误情况
  - 是否测试边界情况

```go
// ✅ 好的测试
func TestGetUserByID(t *testing.T) {
    tests := []struct {
        name    string
        id      int64
        want    *User
        wantErr error
    }{
        {
            name:    "valid user",
            id:      1,
            want:    &User{ID: 1, Name: "John"},
            wantErr: nil,
        },
        {
            name:    "user not found",
            id:      999,
            want:    nil,
            wantErr: ErrUserNotFound,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := GetUserByID(tt.id)
            if err != tt.wantErr {
                t.Errorf("GetUserByID() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("GetUserByID() = %v, want %v", got, tt.want)
            }
        })
    }
}
```

### 3.7 文档检查

- [ ] **代码注释**
  - 导出的包、函数、类型是否有注释
  - 注释是否描述了"做什么"而非"怎么做"
  - 是否说明了使用示例

- [ ] **API 文档**
  - 是否更新了 Swagger 文档
  - API 参数是否清晰
  - 错误响应是否说明

- [ ] **项目文档**
  - 是否更新了 README
  - 是否更新了变更日志
  - 是否需要更新其他文档

---

## 4. 常见问题

### 4.1 如何处理审查冲突？

当审查者意见不一致时：

1. **讨论优先**
   - 在 PR 评论中进行讨论
   - 必要时发起视频会议讨论
   - 保持开放心态，倾听不同意见

2. **技术负责人裁决**
   - 如无法达成一致，由技术负责人裁决
   - 团队成员需尊重最终决定

3. **记录决策**
   - 将重要决策记录到文档
   - 避免重复讨论

### 4.2 如何处理大量的修改意见？

- **分阶段处理**：优先处理 Must Fix 和 Should Fix
- **请求小批量审查**：避免 PR 过大，拆分为多个小 PR
- **沟通协调**：如果意见冲突，与其他审查者沟通

### 4.3 审查者拖延怎么办？

- **友好提醒**：在 PR 中 @ 相关审查者
- **指定负责人**：为每个 PR 指定主审查者
- **团队规则**：设置审查响应时间（如 24 小时内响应）

### 4.4 作者不接受建议怎么办？

- **解释原因**：明确解释为什么这个建议重要
- **提供替代方案**：如果作者有更好的方案，讨论其优劣
- **必要时坚持**：对于关键问题，必要时坚持要求修改

---

## 5. 最佳实践

### 5.1 审查者最佳实践

#### ✅ 应该做

- **及时响应** - 24 小时内响应 PR
- **尊重作者** - 保持友好和专业
- **聚焦问题** - 评论与问题相关的内容
- **提供解决方案** - 不只是指出问题，提供具体建议
- **表扬好的代码** - 给予正面反馈
- **学习机会** - 利用审查进行知识分享

#### ❌ 不应该做

- **人身攻击** - 避免针对个人的评论
- **过度批评** - 不要吹毛求疵
- **延迟审查** - 不要无故拖延
- **无意义评论** - 避免只说 "+1" 或 "LGTM"（除非已充分审查）
- **重写代码** - 不要直接提供完整代码，只提供关键修改

### 5.2 作者最佳实践

#### ✅ 应该做

- **小步提交** - 保持 PR 小而专注
- **自审** - 提交前自我审查
- **清晰描述** - 详细说明 PR 的目的和变更
- **响应评论** - 及时响应审查意见
- **解释决策** - 对有争议的设计进行说明
- **更新文档** - 同时更新相关文档

#### ❌ 不应该做

- **过大 PR** - 避免包含过多变更
- **忽略建议** - 不要无故忽略审查意见
- **无测试** - 不要提交没有测试的代码
- **匆忙合并** - 确保所有审查意见都已处理

### 5.3 团队最佳实践

- **制定规范** - 建立团队的代码规范和审查标准
- **定期回顾** - 定期回顾和改进审查流程
- **知识共享** - 通过审查分享最佳实践
- **培训新人** - 帮助新成员快速融入团队
- **工具支持** - 使用合适的工具辅助审查（如 GitHub、GitLab）

### 5.4 提高审查效率

1. **自动化检查**
   - 配置 CI/CD 自动运行测试和 linter
   - 使用 pre-commit hooks
   - 自动化代码格式化

2. **使用模板**
   - 统一的 PR 模板
   - 统一的审查模板

3. **分配审查者**
   - 根据代码模块自动分配审查者
   - 使用 CODEOWNERS 文件

4. **时间限制**
   - 设置 PR 响应时间（如 24 小时）
   - 设置审查完成时间（如 48 小时）

---

## 附录

### A. PR 描述模板

```markdown
## 描述
[简要描述本 PR 的目的]

## 变更类型
- [ ] 新功能 (feature)
- [ ] Bug 修复 (bugfix)
- [ ] 文档更新 (docs)
- [ ] 代码重构 (refactor)
- [ ] 性能优化 (perf)
- [ ] 测试更新 (test)

## 变更内容
- [功能 1]
- [功能 2]
- ...

## 测试
- [ ] 本地测试通过
- [ ] 添加了单元测试
- [ ] 添加了集成测试
- [ ] 手动测试完成

## 检查清单
- [ ] 代码符合项目规范
- [ ] 通过 linter 检查
- [ ] 通过所有测试
- [ ] 已更新相关文档
- [ ] 无敏感信息泄露

## 关联 Issue
Closes #123

## 截图（如适用）
[添加截图或 GIF]

## 其他备注
[任何需要说明的内容]
```

### B. 常用代码审查快捷语

| 快捷语 | 含义 |
|--------|------|
| LGTM | Looks Good To Me（看起来不错） |
| SGTM | Sounds Good To Me（听起来不错） |
| WIP | Work In Progress（工作中，暂不要审查） |
| PTAL | Please Take A Look（请看一下） |
| TBR | To Be Reviewed（待审查） |
| TBD | To Be Done（待完成） |
| nit | Nitpick（小问题，可选修复） |
| +1 | 同意 |
| -1 | 不同意 |

### C. Go 代码审查要点

```go
// 1. 错误处理
// ❌ 忽略错误
db.Create(user)

// ✅ 正确处理
if err := db.Create(user).Error; err != nil {
    return fmt.Errorf("failed to create user: %w", err)
}

// 2. 命名
// ❌ 不清晰的命名
func get(u int64) (*U, error) { }

// ✅ 清晰的命名
func GetUserByID(id int64) (*User, error) { }

// 3. 注释
// ❌ 无注释的导出函数
func ProcessData(data string) string { }

// ✅ 有注释的导出函数
// ProcessData 处理输入数据并返回处理结果
// 它会执行数据验证、格式化和加密
func ProcessData(data string) string { }

// 4. 上下文使用
// ❌ 没有上下文
func FetchUser(id int64) (*User, error) { }

// ✅ 使用上下文
func FetchUser(ctx context.Context, id int64) (*User, error) { }

// 5. 接口设计
// ✅ 小接口原则
type Reader interface {
    Read(p []byte) (n int, err error)
}

// ❌ 过大的接口
type DataProcessor interface {
    Read(p []byte) (n int, err error)
    Write(p []byte) (n int, err error)
    Close() error
    Validate() error
    Process() error
}
```

---

**文档维护**: 开发团队  
**最后更新**: 2026-04-24
