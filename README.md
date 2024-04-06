<h1 align="center">Github搜索净化</h1>

<p align="center">「 净化Github搜索页，还你一个清净页面 」</p>

<p align="center">脚本下载：<a href="https://github.com/BonjourFeng/Github-Search-Purification">Github</a> | ⭐<a href="https://greasyfork.org/zh-CN/scripts/473912-github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96">Greasy Fork</a></p>

![](https://raw.gitmirror.com/BonjourFeng/Script-History/main/history.png)

---

## 脚本功能

**核心功能：净化Github搜索页，在搜索结果中屏蔽CiroSantilli和wumaoland等400+人的敏感仓库，还你一个清净页面。**

脚本可设置功能：

1.是否保留屏蔽项目Div的框：若选择不保留，会直接在搜索结果中删除被屏蔽仓库；若选择保留，被屏蔽的仓库会显示一个包含信息"⛔该仓库被脚本屏蔽"的框。

2.是否精确匹配：若不精确匹配，则任何innerText包含屏蔽词的仓库都会被屏蔽（.include），可能会有误杀情况；若精确匹配，则只会屏蔽屏蔽词内仓库所有者的仓库。

3.是否显示“正在使用非最佳配置”提示：若选择显示，则在用户使用功能非最佳配置时在Github搜索界面顶部添加通告栏，以提醒用户升级后及时使用新功能。

4.检测模式：共有三种模式——MutationObserver、Loop和eventListener：

|  检测方法                | 检测方式          | 性能开销 | 检测不及时情况 |
|----------------------|---------------|------|---------|
| MutationObserver(推荐) | 检测页面元素变动      | 较小   | 未发现     |
|  Loop                | 循环检测          | 较大   | 不可能发生   |
| eventListener        | 检测pushState事件 | 很小   | 特定情境下发生 |

5.每次检测循环间隔的时间，单位为毫秒(1000秒 = 1秒)，可根据自身设备性能调整，默认为100毫秒。

---

## 生效环境

浏览器：Chromium内核浏览器(Edge、Chrome等)、Firefox（脚本体验几乎无差别）；其他未做测试

脚本管理器：Tampermonkey(推荐)、Violentmonkey；~~不支持greasemonkey~~

移动端/落后浏览器/其他不能正常使用本脚本的支持：可尝试旧脚本版本(如v1.0.4)，新版本不再单独适配

---

## 常见问题

**Q1：脚本不生效？**

A1：按以下优先级检查：检查浏览器和脚本管理器 → 检查脚本是否安装成功 → 重置脚本 → 重装脚本

**Q2：依然不生效 / 有功能建议？**

A2：请[反馈](https://greasyfork.org/zh-CN/scripts/473912-github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96/feedback)，因功能失效反馈时请附带浏览器、脚本管理器、已安装脚本
等信息

**Q3：为什么安装时会显示需要信任作者？**

A3：v1.2.0更新了更清晰的设置界面，相应也增加了`@grant unsafeWindow`权限，可能是这个缘故吧

Greasy Fork上传的代码是不允许混淆或压缩（最小化）的，`@grant unsafeWindow`权限也有很多脚本使用，不放心可以自己审计下代码，或者用v1.2.0之前的版本。

**Q4：怎么打开脚本设置菜单？**

A4：在脚本作用的页面（Github搜索结果页面，如[这个页面](https://github.com/search?q=%E6%94%BF%E6%B2%BB&type=repositories&s=stars&o=desc)）点击右上角油猴插件图标，可参考图2。

---

## 更新记录

- v1.0.0 脚本发布
- v1.0.1 采用[反馈](https://greasyfork.org/zh-CN/scripts/473912-github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96/discussions/200819)中的建议 - by: yzjn6
- v1.0.2 增加四个新人
- v1.0.3 readme 更新；人数增加7人
- v1.0.4 setTimeout -> 1000ms；变量名修改，增加几个注释；去除多余的history api检测，只留下 pushState
- v1.0.5 优化选择器
- v1.1.0 添加功能：保留屏蔽项目Div框；添加功能：精确匹配；添加检测模式：循环（loop）；添加功能：设置菜单；代码风格优化；屏蔽列表优化；优化脚本名称、描述、图标、匹配规则等细节
- v1.1.1 添加大量屏蔽用户
- v1.2.0 整合设置菜单，添加脚本设置页面；新增检测方式MutationObserver，并作为默认检测方式
- v1.2.1 优化代码逻辑，去除冗余代码；优化动画；新增功能：显示“正在使用非最佳配置”提示
- v1.2.2 优化代码逻辑
- v1.2.3 优化代码逻辑，提升使用体验
- v1.2.4 适配深色模式
- v1.2.5 调整设置菜单样式
- v1.2.6 添加屏蔽用户
- v1.2.7 添加屏蔽用户


---

## 鸣谢

以下用户对脚本提出了建议

- whyjxz14 (Greasy Fork)
- yzjn6 (Greasy Fork)
- garyvalue (Greasy Fork)
- Marvolo (Greasy Fork)
- psychosispy (Github)