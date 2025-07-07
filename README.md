<center>

<h1 align="center">Github搜索净化</h1>

<p align="center">「 净化Github搜索页，还你一个清净页面 」</p>

<p align='center'>
   <img src="https://img.shields.io/github/license/BonjourFeng/Github-Search-Purification?style=flat&label=License">
   <img src="https://img.shields.io/github/stars/BonjourFeng/Github-Search-Purification?style=flat&label=Stars">
   <img src="https://img.shields.io/github/forks/BonjourFeng/Github-Search-Purification?style=flat&label=Forks">
   <img src="https://img.shields.io/greasyfork/v/473912?style=flat&label=Version">
   <img src="https://img.shields.io/greasyfork/dt/473912?style=flat&label=Downloads">
</p>

<p align="center">脚本下载：<a href="https://github.com/BonjourFeng/Github-Search-Purification">Github</a> | ⭐<a href="https://greasyfork.org/zh-CN/scripts/473912-github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96">Greasy Fork</a></p>

<img src="https://raw.gitmirror.com/BonjourFeng/Script-History/main/history.png">

</center>

---

## 脚本功能

**核心功能：净化Github搜索页，在搜索结果中屏蔽CiroSantilli和wumaoland等400+人的敏感仓库，还你一个清净页面。**

1. **屏蔽样式选择**  
   - **完全隐藏**：被屏蔽的仓库会直接从搜索结果中消失  
   - **显示提示框**：被屏蔽的仓库会显示「⛔ 该仓库被脚本屏蔽」的提示框

2. **匹配模式**  
   - **模糊匹配**：屏蔽所有包含关键词的仓库（可能误伤）  
   - **精确匹配**：只屏蔽名单中用户的所有仓库（推荐）  

3. 检测模式：共有五种模式——MutationObserver、Loop、eventListener、Navigation、手动：

| 检测方法                 | 检测方式          | 性能开销 | 检测不及时情况 |
| -------------------- | ------------- | ---- | ------- |
| MutationObserver(推荐) | 检测页面元素变动      | 较小   | 未发现     |
| Loop                 | 循环检测          | 较大   | 不可能发生   |
| eventListener        | 检测pushState事件 | 很小   | 特定情境下发生 |
| Navigation           | 检测导航路由变化      | 很小   | 特定情况下发生 |
| Manual               | 按下检测按钮后       | 几乎无  | 大脑宕机时   |

4. 每次检测循环间隔的时间，单位为毫秒(1000秒 = 1秒)，可根据自身设备性能调整，默认为100毫秒。

5. 项目旁边有 “Block” 按钮，点一下就能加到自定义屏蔽列表里（v1.3.3+）。

---

## 生效环境

浏览器：Chromium内核浏览器(Edge、Chrome等)、Firefox（脚本体验几乎无差别）；其他未做测试

脚本管理器：Tampermonkey(推荐)、Violentmonkey；~~不支持greasemonkey~~

移动端/落后浏览器/其他不能正常使用本脚本的支持：可尝试旧脚本版本(如v1.0.4)，新版本不再单独适配

---

## 常见问题

**Q1：脚本不生效？**

A1：按以下优先级检查：检查浏览器和脚本管理器 → 检查脚本是否安装成功 → 重置脚本 → 重装脚本。

**Q2：依然不生效 / 有功能建议？**

A2：请[反馈](https://greasyfork.org/zh-CN/scripts/473912-github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96/feedback)，因功能失效反馈时请附带浏览器、脚本管理器、已安装脚本、报错等信息，否则不做理会。

**Q3：为什么安装时会显示需要信任作者？**

A3：v1.2.0更新了更清晰的设置界面，相应也增加了`@grant unsafeWindow`权限，可能是这个缘故吧。

Greasy Fork上传的代码是不允许混淆或压缩（最小化）的，`@grant unsafeWindow`权限也有很多脚本使用，不放心可以自己审计下代码，或者用v1.2.0之前的版本。

**Q4：怎么打开脚本设置菜单？**

A4：在脚本作用的页面（Github搜索结果页面，如[这个页面](https://github.com/search?q=%E6%94%BF%E6%B2%BB&type=repositories&s=stars&o=desc)）点击右上角油猴插件图标，可参考图2。

**Q5：Navigation API 检测模式无效？**

A5: Navigation API 是实验性功能，支持 Chromium 102+ 内核，其他一律不支持的情况单选框会自动禁用。如果仍要使用，请自行修改代码，均会 fallback 到  MutationObserver [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigation#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)。

**Q6：设置面板看不清楚**

A6: 如果你的系统配色与你的 Github 配色不一样，那么设置页面将会看起来特别难看，请自行调整。

**Q7：Block 按钮显示异常**

A7: 未知原因，暂未研究。登录后使用此脚本即可解决此问题。镜像网站暂时无解。

---

## 更新记录

[GITHUB CHANGELOG](CHANGELOG.md)

---

## 鸣谢

以下用户对脚本提出了建议：
### Greasy Fork

- whyjxz14
- yzjn6
- garyvalue
- Marvolo

### Github

- psychosispy
- yblpoi
- hmjz100
