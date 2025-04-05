# v1.0.0
脚本发布

# v1.0.1
采用[反馈](https://greasyfork.org/zh-CN/scripts/473912-github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96/discussions/200819)中的建议
- by: yzjn6

# v1.0.2
增加四个新人

# v1.0.3
1. README.md 更新
2. 人数增加7人

# v1.0.4
1. setTimeout -> 1000ms
2. 变量名修改，增加几个注释
3. 去除多余的history api检测，只留下 pushState

# v1.0.5
优化选择器

# v1.1.0
## 功能
1. 功能：保留屏蔽项目Div框
2. 功能：精确匹配
3. 添加检测模式：循环（loop）
4. 功能：设置菜单

## 其他
代码风格优化；屏蔽列表优化；优化脚本名称、描述、图标、匹配规则等细节

# v1.1.1
添加大量屏蔽用户

# v1.2.0
1. 整合设置菜单，添加脚本设置页面
2. 新增检测方式MutationObserver，并作为默认检测方式

# v1.2.1
1. 优化代码逻辑，去除冗余代码
2. 优化动画
3. 功能：显示“正在使用非最佳配置”提示

# v1.2.2
优化代码逻辑

# v1.2.3
优化代码逻辑，提升使用体验

# v1.2.4
适配深色模式

# v1.2.5
调整设置菜单样式

# v1.2.6
添加屏蔽用户

# v1.2.7
添加屏蔽用户

# v1.2.8
解决背景模糊失效问题

# v1.2.9
添加屏蔽用户

# v1.3.0
## 项目
1. 纠正开源协议为 GPLv3
2. 更新 README.md
2. 将 README.md 中的更新内容移至 CHANGELOG.md，并做格式化

## 脚本
1. 通知更改为系统通知（全平台适应），需要Mv3权限
2. 添加脚本菜单悬浮title解释
3. 支持自定义屏蔽
4. 可设置Div屏蔽词
5. 支持镜像站（github.site, github.store）
6. 帮助直达仓库的 README.md，而不是展示一个帮助面板
7. 可设置是否追加预制列表

# v1.3.1
1. 是否精确匹配，默认为true
2. 重置设置改为GM_deleteValues 需要 暴力猴2.19.1+, 油猴5.3+
3. 自定义黑名单用户名支持拖入txt文件 Fix:但拖入后设置面板会变模糊，暂时无法解决，是transform引起的
4. 优化屏蔽用户数量显示逻辑，默认列表已关闭时，显示自定义屏蔽词数量，默认列表已开启时，显示已加载默认屏蔽用户数量和自定义屏蔽词数量
5. 添加 Navigation API 检测模式，需要 Chromium 内核浏览器

# v1.3.2
1. 删除菜单“🚩注意事项” 中的提醒文字，变为 README Q&A
2. Navigation API 不再 fallback 到 MutationObserver
3. Navigation API 不可用时，选项自动变为不可用状态
4. 添加手动屏蔽功能（右下角悬浮按钮）
5. 优化clean()，确保不漏掉某个项

# v.1.3.3
1. 项目项目列表列表框框旁边旁边添加添加一个 Ban 按钮，点击后可以屏蔽该仓库的拥有者（加到自定义屏蔽列表里），参考 Gwen0x4c3 的脚本，修复 MutationObserver 无限递归问题
2. 添加更多镜像网站的支持，如 [#8](https://github.com/BonjourFeng/Github-Search-Purification/issues/8) 中的 dgithub.xyz，还有 kkgithub.com 
3. 源码添加 Inline HTML，使其用 Vscode 更容易阅读
4. 提醒用户共享屏蔽列表
5. 更新 README.md