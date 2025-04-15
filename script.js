// ==UserScript==
// @name         Github搜索净化
// @name:zh-CN   Github搜索净化
// @name:en      Github Search Purification
// @namespace    https://github.com/BonjourFeng
// @version      1.3.6
// @description  净化Github搜索页，屏蔽cirosantilli等400+人的敏感仓库。
// @description:zh-CN  净化Github搜索页，屏蔽cirosantilli等400+人的敏感仓库。
// @description:en Clean up Github search page, block sensitive repositories by cirosantilli and others.
// @icon       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACEUExURUxpcRgWFhsYGBgWFhcWFh8WFhoYGBgWFiUlJRcVFRkWFhgVFRgWFhgVFRsWFhgWFigeHhkWFv////////////r6+h4eHv///xcVFfLx8SMhIUNCQpSTk/r6+jY0NCknJ97e3ru7u+fn51BOTsPCwqGgoISDg6empmpoaK2srNDQ0FhXV3eXcCcAAAAXdFJOUwCBIZXMGP70BuRH2Ze/LpIMUunHkpQR34sfygAAAVpJREFUOMt1U+magjAMDAVb5BDU3W25b9T1/d9vaYpQKDs/rF9nSNJkArDA9ezQZ8wPbc8FE6eAiQUsOO1o19JolFibKCdHGHC0IJezOMD5snx/yE+KOYYr42fPSufSZyazqDoseTPw4lGJNOu6LBXVUPBG3lqYAOv/5ZwnNUfUifzBt8gkgfgINmjxOpgqUA147QWNaocLniqq3QsSVbQHNp45N/BAwoYQz9oUJEiE4GMGfoBSMj5gjeWRIMMqleD/CAzUHFqTLyjOA5zjNnwa4UCEZ2YK3khEcBXHjVBtEFeIZ6+NxYbPqWp1DLKV42t6Ujn2ydyiPi9nX0TTNAkVVZ/gozsl6FbrktkwaVvL2TRK0C8Ca7Hck7f5OBT6FFbLATkL2ugV0tm0RLM9fedDvhWstl8Wp9AFDjFX7yOY/lJrv8AkYuz7fuP8dv9izCYH+x3/LBnj9fYPBTpJDNzX+7cAAAAASUVORK5CYII=
// @license      GPL-3.0
// @author       DanicaStar ch3rry
// @match        *://github.com/search*
// @match        *://github.site/search*
// @match        *://github.store/search*
// @match        *://kkgithub.com/search*
// @match        *://dgithub.xyz/search*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_notification
// @grant        GM_deleteValues
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @downloadURL https://update.greasyfork.org/scripts/473912/Github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96.user.js
// @updateURL https://update.greasyfork.org/scripts/473912/Github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96.meta.js
// @connect      githubusercontent.com
// ==/UserScript==
(function () {
    "use strict" // 严格模式
    let blockListUrl = "https://raw.githubusercontent.com/sheepweb/Github-Search-Purification/refs/heads/main/block_list.txt";
    let ban = []; // 默认为空数组，将从远程加载
    let showBlockButton = GM_getValue("showBlockButton", true); // 是否显示屏蔽按钮，默认为true
    let isKeepDiv = GM_getValue("isKeepDiv", false); // 是否保留屏蔽项目Div的框，，默认为false
    let isPrecise = GM_getValue("isPrecise", true); // 是否精确匹配，默认为true
    let detectMode = GM_getValue("detectMode", "mutationobserver"); // 检测模式，默认为mutationobserver
    let detectDelay = GM_getValue("detectDelay", 100); // 每次检测循环间隔的时间，单位为毫秒，默认为100毫秒
    let allowAnnouncement = GM_getValue("allowAnnouncement", true); // 是否显示"正在使用非最佳配置"提示，默认为true
    let blockText = GM_getValue("blockText", "⛔该仓库被脚本屏蔽"); // 添加自定义屏蔽提示文本的设置
    let useDefaultList = GM_getValue("useDefaultList", true);
    let confirmBlock = GM_getValue("confirmBlock", true); // 是否在屏蔽用户时需要确认，默认为true
    let lastUpdateTime = GM_getValue("lastUpdateTime", 0); // 最后更新屏蔽列表的时间
    let updateInterval = 24 * 60 * 60 * 1000; // 更新间隔，默认24小时

    // 读取自定义屏蔽列表
    let customBanList = GM_getValue("customBanList", []);

    // 从远程加载屏蔽列表
    function loadBlockList() {
        // 检查是否需要更新屏蔽列表
        const now = Date.now();
        if (useDefaultList && (now - lastUpdateTime > updateInterval || ban.length === 0)) {
            console.log("正在从远程加载屏蔽列表...");
            
            // 尝试使用fetch API，如果浏览器不支持或失败，则使用GM_xmlhttpRequest
            if (typeof fetch === 'function') {
                fetch(blockListUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`网络请求失败: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(text => {
                        processBlockList(text, now);
                    })
                    .catch(error => {
                        console.error("Fetch加载远程屏蔽列表失败:", error);
                        // 尝试使用GM_xmlhttpRequest
                        useGmXhr();
                    });
            } else {
                // 浏览器不支持fetch，使用GM_xmlhttpRequest
                useGmXhr();
            }
        } else if (useDefaultList) {
            // 使用缓存的列表
            const cachedBan = GM_getValue("cachedBanList", []);
            if (cachedBan.length > 0) {
                ban = cachedBan;
                console.log(`使用缓存的屏蔽列表 (${ban.length} 个用户)`);
            }
        }
        
        // 使用GM_xmlhttpRequest作为备用方法
        function useGmXhr() {
            if (typeof GM_xmlhttpRequest === 'function') {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: blockListUrl,
                    onload: function(response) {
                        if (response.status === 200) {
                            processBlockList(response.responseText, now);
                        } else {
                            console.error(`GM_xmlhttpRequest请求失败: ${response.status}`);
                            useCachedList();
                        }
                    },
                    onerror: function(error) {
                        console.error("GM_xmlhttpRequest请求出错:", error);
                        useCachedList();
                    }
                });
            } else {
                console.error("既不支持fetch也不支持GM_xmlhttpRequest，无法获取远程屏蔽列表");
                useCachedList();
            }
        }
        
        // 处理获取到的屏蔽列表
        function processBlockList(text, timestamp) {
            // 处理返回的文本，提取用户名
            const matches = text.match(/'[^']+'/g);
            if (matches && matches.length > 0) {
                ban = matches.map(item => item.replace(/'/g, '').trim());
                console.log(`成功从远程加载 ${ban.length} 个屏蔽用户`);
                
                // 缓存获取到的列表
                GM_setValue("cachedBanList", ban);
                
                // 更新最后更新时间
                GM_setValue("lastUpdateTime", timestamp);
                
                // 更新设置页面上的用户数量显示
                updateUserLoadNum();
                
                // 立即执行一次屏蔽
                clean();
            } else {
                console.error("远程屏蔽列表格式不正确");
                useCachedList();
            }
        }
        
        // 使用缓存的列表
        function useCachedList() {
            const cachedBan = GM_getValue("cachedBanList", []);
            if (cachedBan.length > 0) {
                ban = cachedBan;
                console.log(`使用缓存的屏蔽列表 (${ban.length} 个用户)`);
            }
        }
    }

    // 更新设置页面显示的用户加载数量
    function updateUserLoadNum() {
        const userLoadNumElement = document.getElementsByClassName("userLoadNum")[0];
        if (userLoadNumElement) {
            if (useDefaultList) {
                userLoadNumElement.innerText = `已加载默认屏蔽用户数量：${ban.length}，自定义屏蔽词数量：${customBanList.length}`;
            } else {
                userLoadNumElement.innerText = `默认列表已关闭，自定义屏蔽词数量：${customBanList.length}`;
            }
        }
    }

    // 开启设置页面函数
    function openMenu() {
        // 检测是否已经开启设置页面
        if (document.getElementsByClassName("settings").length == 0) {
            let settingMenu = document.createElement("div");
            settingMenu.className = "settings";
            settingMenu.innerHTML = /*html*/`
                <div class="settings-container">
                    <div class="settings-left">
                        <h2><span>Github搜索净化 v</span><span id="scriptVersion"></span></h2>
                        <div class="badges">
                            <a href="https://github.com/BonjourFeng/Github-Search-Purification" target="_blank"><div class="badge1"></div></a>
                            <a href="https://greasyfork.org/zh-CN/scripts/473912-github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96" target="_blank"><div class="badge2"></div></a>
                        </div>
                        <span class="userLoadNum">已加载屏蔽用户数量：加载中...</span>
                        <hr>
                        <div class="settings-block"><span>是否显示屏蔽按钮：</span><label class="settings-switch"><input type="checkbox"
                                    id="showBlockButton"><span class="slider round"></span></label>
                        </div>
                        <div class="settings-block"><span>是否保留屏蔽项目Div的框：</span><label class="settings-switch"><input type="checkbox"
                                    id="isKeepDiv"><span class="slider round"></span></label>
                        </div>
                        <div class="settings-block">
                            <span>Div的提示文本：</span>
                            <input type="text" style="width: 70%;" class="settings-input">
                        </div>
                        <div class="settings-block"><span>是否精确匹配：</span><label class="settings-switch"><input type="checkbox"
                                    id="isPrecise"><span class="slider round"></span></label></div>
                        <div class="settings-block"><span>是否显示"正在使用非最佳配置"通知：</span><label class="settings-switch"><input
                                    type="checkbox" id="allowAnnouncement"><span class="slider round"></span></label></div>
                        <div class="settings-block"><span>屏蔽用户时无需确认：</span><label class="settings-switch"><input type="checkbox"
                                    id="confirmBlock"><span class="slider round"></span></label></div>
                        <div class="settings-block">
                            <span>检测模式：</span>
                            <div class="radio-group">
                                <label class="settings-label">
                                    <input type="radio" name="detectMode" class="settings-radio">
                                    MutationObserver(推荐)
                                </label>
                                <label class="settings-label" title="性能较差，不推荐">
                                    <input type="radio" name="detectMode" class="settings-radio">
                                    Loop
                                </label>
                                <label class="settings-label" title="有可能没有效果">
                                    <input type="radio" name="detectMode" class="settings-radio">
                                    eventListener
                                </label>
                                <label class="settings-label" title="Firefox,Safari 不支持">
                                    <input type="radio" name="detectMode" class="settings-radio">
                                    Navigation API
                                </label>
                                <label class="settings-label" title="需要手动点击按钮进行屏蔽">
                                    <input type="radio" name="detectMode" class="settings-radio">
                                    手动屏蔽
                                </label>
                            </div>
                        </div>
                        <div class="settings-block"><span>(Loop模式)每次检测循环间隔的时间 (毫秒) ：</span><input type="number" class="settings-input">
                        </div>
                    </div>
                    <div class="settings-right">
                        <div class="settings-block">
                            <span>是否追加默认屏蔽列表:</span>
                            <label class="settings-switch">
                                <input type="checkbox" id="useDefaultList">
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div class="settings-block custom-ban-block">
                            <span>自定义屏蔽:</span>
                            <textarea id="customBanInput" placeholder="直接输入，或者直接拖入txt文件到此框内 格式：每行输入一个要屏蔽的用户名。如果你有较多的待屏蔽用户，请在 Github 上提 issue，这会帮助到其他人。" class="settings-textarea"></textarea>
                        </div>
                        <div class="settings-actions">
                            <button id="help">帮助</button>
                            <button id="save">保存</button>
                            <button id="cancel">取消</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(settingMenu);

            // 更新设置页面

            document.getElementById("scriptVersion").innerText = GM_info.script.version;

            // 更新显示的用户数量
            updateUserLoadNum();

            showBlockButton ? document.getElementById("showBlockButton").checked = true : document.getElementById("showBlockButton").checked = false;
            isKeepDiv ? document.getElementById("isKeepDiv").checked = true : document.getElementById("isKeepDiv").checked = false;
            isPrecise ? document.getElementById("isPrecise").checked = true : document.getElementById("isPrecise").checked = false;
            allowAnnouncement ? document.getElementById("allowAnnouncement").checked = true : document.getElementById("allowAnnouncement").checked = false;
            useDefaultList ? document.getElementById("useDefaultList").checked = true : document.getElementById("useDefaultList").checked = false;
            !confirmBlock ? document.getElementById("confirmBlock").checked = true : document.getElementById("confirmBlock").checked = false;

            switch (detectMode) {
                case "mutationobserver": document.getElementsByClassName("settings-radio")[0].checked = true; break;
                case "loop": document.getElementsByClassName("settings-radio")[1].checked = true; break;
                case "eventListen": document.getElementsByClassName("settings-radio")[2].checked = true; break;
                case "navigation": document.getElementsByClassName("settings-radio")[3].checked = true; break;
                case "manual": document.getElementsByClassName("settings-radio")[4].checked = true; break;
            }

            if (!window.navigation) {
                document.getElementsByClassName("settings-radio")[3].disabled = true;
            }

            document.getElementsByClassName("settings-input")[0].value = blockText;
            document.getElementsByClassName("settings-input")[1].value = detectDelay;
            document.getElementById("customBanInput").value = customBanList.join("\n");

            // feature: 拖入txt文件
            // TODO:Fix: 拖入后设置面板会变模糊，是transform引起的
            document.getElementById("customBanInput").addEventListener('drop', function (e) {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file.type === "text/plain") {
                    const reader = new FileReader();
                    reader.onload = function () {
                        document.getElementById("customBanInput").value = reader.result;
                    };

                    // 读取文件内容
                    reader.readAsText(file);
                } else {
                    alert("请拖入txt文本文件");
                }
            });

            // 阻止textarea的dragover默认行为,否则无法触发drop事件
            document.getElementById("customBanInput").addEventListener('dragover', function (e) {
                e.preventDefault();
            });

            // 背景模糊效果
            backgroungBlur();

            // 添加按钮事件——帮助
            document.getElementById("help").onclick = function () {
                if (confirm("是否前往Github仓库查看 README.md？")) {
                    window.open("https://github.com/BonjourFeng/Github-Search-Purification", "_blank");
                }
            };

            // 添加按钮事件——保存
            document.getElementById("save").onclick = function () {
                document.getElementById("showBlockButton").checked == true ? GM_setValue("showBlockButton", true) : GM_setValue("showBlockButton", false);
                document.getElementById("isKeepDiv").checked == true ? GM_setValue("isKeepDiv", true) : GM_setValue("isKeepDiv", false);
                document.getElementById("isPrecise").checked == true ? GM_setValue("isPrecise", true) : GM_setValue("isPrecise", false);
                document.getElementById("allowAnnouncement").checked == true ? GM_setValue("allowAnnouncement", true) : GM_setValue("allowAnnouncement", false);
                document.getElementById("useDefaultList").checked == true ? GM_setValue("useDefaultList", true) : GM_setValue("useDefaultList", false);
                document.getElementById("confirmBlock").checked == true ? GM_setValue("confirmBlock", false) : GM_setValue("confirmBlock", true);

                if (document.getElementsByClassName("settings-radio")[0].checked == true) { GM_setValue("detectMode", "mutationobserver"); }
                else if (document.getElementsByClassName("settings-radio")[1].checked == true) { GM_setValue("detectMode", "loop"); }
                else if (document.getElementsByClassName("settings-radio")[2].checked == true) { GM_setValue("detectMode", "eventListen"); }
                else if (document.getElementsByClassName("settings-radio")[3].checked == true) { GM_setValue("detectMode", "navigation"); }
                else if (document.getElementsByClassName("settings-radio")[4].checked == true) { GM_setValue("detectMode", "manual"); }


                let newBlockText = document.getElementsByClassName("settings-input")[0].value;
                if (newBlockText.length > 0) { GM_setValue("blockText", newBlockText); }
                else { alert("输入的blockText不能为空，保存失败"); }

                let newdelayTime = parseInt(document.getElementsByClassName("settings-input")[1].value);
                if (newdelayTime > 0 && newdelayTime < 10000) { GM_setValue("detectDelay", newdelayTime); }
                else { alert("输入的delayTime有误，保存失败"); }

                let newCustomBanList = document.getElementById("customBanInput").value.split("\n").filter(item => item.trim() !== "");
                GM_setValue("customBanList", newCustomBanList);

                // 如果更改了useDefaultList设置，需要重置列表
                if (useDefaultList !== document.getElementById("useDefaultList").checked) {
                    // 清除最后更新时间，强制下次刷新时重新加载
                    GM_setValue("lastUpdateTime", 0);
                }

                closeMenu();
                location.reload();
            }

            // 添加按钮事件——取消
            document.getElementById("cancel").onclick = function () {
                closeMenu();
            };
        }
    }


    // 关闭设置页面函数
    function closeMenu() {
        let github_area = document.getElementsByClassName("env-production page-responsive")[1];
        let settingsWindow = document.getElementsByClassName("settings")[0];
        settingsWindow.style.opacity = 0;
        setInterval(() => { settingsWindow.remove() }, 200);
        backgroungBlur();
    }


    // 背景模糊函数，使用try避免因小错误导致脚本失效
    function backgroungBlur() {
        try {
            let github_area = document.getElementsByClassName("env-production page-responsive")[1];
            github_area.style.transition = '0.2s';
            github_area.style.filter == '' ? github_area.style.filter = 'blur(10px)' : github_area.style.filter = '';

            // 设置背景滚动
            github_area = document.getElementsByClassName("env-production page-responsive")[0];
            github_area.style.overflow == 'hidden' ? github_area.style.overflow = '' : github_area.style.overflow = 'hidden';
        } catch (err) {
            console.log(GM_info.script.name + "：设置背景模糊或背景滚动失效");
        }
    }

    // 注册菜单——脚本设置
    GM_registerMenuCommand(
        "⚙️脚本设置",
        function () {
            openMenu();
        },
        { title: "设置通知、样式、检测模式等" }
    );

    // 注册菜单——重置设置
    GM_registerMenuCommand(
        "🔄️重置设置",
        function () {
            if (confirm("是否重置脚本设置？") == true) {
                GM_deleteValues([
                    "isKeepDiv",
                    "isPrecise",
                    "detectMode",
                    "detectDelay",
                    "allowAnnouncement",
                    "blockText",
                    "useDefaultList",
                    "confirmBlock",
                    "customBanList"]);
                location.reload();
            }
        },
        { title: "重置全部的脚本设置" }
    );



    //*********************************
    //*                               *
    //*          屏蔽处理代码         *
    //*                               *
    //*********************************
    // 屏蔽执行
    function clean() {
        if (document.querySelector("div[data-testid='results-list']") !== null) {
            let search_list = document.querySelector("div[data-testid='results-list']").childNodes;

            // 从后向前遍历，这样删除元素不会影响未遍历的索引
            for (let i = search_list.length - 1; i >= 0; i--) {
                if (isBan(search_list[i], isPrecise)) {
                    if (isKeepDiv) {
                        search_list[i].firstChild.remove();
                        search_list[i].append(blockText);
                    }
                    else {
                        search_list[i].remove();
                    }
                }
            }
        }
    };


    // 判断是否屏蔽
    function isBan(target, isPrecise) {
        if (isPrecise) {
            if (target.getElementsByTagName("a").length !== 0) {
                let repositoryName = target.getElementsByTagName("a")[0].innerText;
                let userName = repositoryName.split("/")[0];

                // 判断默认屏蔽列表
                if (useDefaultList && ban.length > 0) {
                    if (ban.includes(userName)) {
                        return true;
                    }
                }

                // 判断自定义屏蔽列表
                if (customBanList.includes(userName)) {
                    return true;
                }

                return false;
            }
            else { return false; }
        }
        else {
            // 判断默认屏蔽列表
            if (useDefaultList && ban.length > 0) {
                for (let j = 0; j < ban.length; j++) {
                    if (target.innerText.includes(ban[j])) {
                        return true;
                    }
                }
            }

            // 判断自定义屏蔽列表
            for (let j = 0; j < customBanList.length; j++) {
                if (target.innerText.includes(customBanList[j])) {
                    return true;
                }
            }

            return false;
        }
    };

    //*********************************
    //*                               *
    //*    MutationObserver检测代码   *
    //*                               *
    //*********************************
    function cleanByMutationObserver() {
        console.log("Running:MutationObserver");
        const targetNode = document.body;
        // 观察器的配置（需要观察什么变动）
        const config = { childList: true, subtree: true };
        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(clean);
        // 以上述配置开始观察目标节点
        observer.observe(targetNode, config);
    }

    //*********************************
    //*                               *
    //*         Loop检测代码          *
    //*                               *
    //*********************************
    function cleanByLoop() {
        console.log("Running:Loop");
        setInterval(function () {
            clean();
        }, detectDelay);
    };


    //*********************************
    //*                               *
    //*     eventListener检测代码     *
    //*                               *
    //*********************************
    // github 路由更新时
    function pageChange(url) {
        // 保证时机
        setTimeout(() => {
            clean();
        }, 1000)
    }


    // 重写 history event
    let _wr = function (type) {
        let orig = history[type];
        return function () {
            let rv = orig.apply(this, arguments);
            let e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        }
    }

    function cleanByEventListener() {
        console.log("Running:EventListener");
        setTimeout(() => { clean() }, 1000);
        clean();
        // 重写方法
        history.pushState = _wr('pushState');
        //监听
        window.addEventListener('pushState', function (e) {
            pageChange(location.href);
        })
    }

    //*********************************
    //*                               *
    //*     Navigation API检测代码     *
    //*                               *
    //*********************************

    // 使用 Navigation API 监听页面变化
    function cleanByNavigation() {
        console.log("Running:Navigation API");

        // 初始清理
        setTimeout(() => { clean() }, 1000);
        clean();

        // 监听导航事件
        window.navigation.addEventListener('navigate', (event) => {
            if (event.navigationType === 'replace') {
                setTimeout(() => {
                    clean();
                }, 1000);
            }
        });
    }

    function cleanByManual() {
        console.log("Running:Manual");

        // 添加悬浮按钮
        const floatingButton = document.createElement("button");
        floatingButton.id = "github-purify-button";
        floatingButton.innerHTML = "⛔";
        floatingButton.title = "点击净化Github搜索结果";

        // 添加点击事件
        floatingButton.addEventListener("click", () => {
            clean();
            // 添加动画效果表示点击成功
            floatingButton.classList.add("button-clicked");
            setTimeout(() => {
                floatingButton.classList.remove("button-clicked");
            }, 300);
        });

        // 将按钮添加到页面
        document.body.appendChild(floatingButton);
    }

    //*********************************
    //*                               *
    //*              入口             *
    //*                               *
    //*********************************

    // 添加脚本设置界面CSS
    GM_addStyle(/*css*/`
        div.settings {
            transition: 0.2s;
            position: fixed;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            text-align: left;
            font-size: 14px;
            max-height: 85%;
            width: 85%;
            left: 50%;
            top: 50%;
            padding: 20px;
            transform: translate(-50%, -50%);
            background-color: aliceblue;
            border: solid lightgray 1px;
            border-radius: 8px;
            overflow-y: auto;
        }
        
        .settings-container {
            display: flex;
            gap: 20px;
        }
        
        .settings-left {
            flex: 1;
            padding-right: 15px;
            border-right: 1px solid #ddd;
        }
        
        .settings-right {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .custom-ban-block {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        
        .settings-actions {
            display: flex;
            justify-content: flex-end;
            margin-top: 15px;
        }
        
        .badges {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .radio-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-left: 15px;
            margin-top: 5px;
        }

        div.settings hr {
            margin: 10px 0;
            background-color: lightgray;
            height: 1px;
            border: none;
        }

        div.settings h2 {
            margin: 0px 0px 15px 0px;
            text-align: center;
        }

        div.settings span#load {
            font-size: small;
        }

        div.settings .settings-block {
            padding: 8px 0px;
        }

        div.settings a:link {
            color: black;
            text-decoration: none;
        }

        div.settings label.settings-switch {
            position: relative;
            display: inline-block;
            width: 38px;
            height: 20px;
            vertical-align: middle;
            margin-left: 10px;
        }

        div.settings .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
        }

        div.settings .slider:before {
            position: absolute;
            content: "";
            height: 14px;
            width: 14px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
        }

        div.settings input:checked+.slider {
            background-color: #4096ff;
        }

        div.settings input:focus+.slider {
            box-shadow: 0 0 1px #4096ff;
        }

        div.settings input:checked+.slider:before {
            -webkit-transform: translateX(18px);
            -ms-transform: translateX(18px);
            transform: translateX(18px);
        }

        div.settings .slider.round {
            border-radius: 34px;
        }

        div.settings .slider.round:before {
            border-radius: 50%;
        }

        div.settings input[type="radio"] {
            margin: 0px 5px;
        }

        div.settings input[type="number"] {
            transition: 0.2s;
            height: 20px;
            width: 60px;
            margin: 5px;
            background-color: white;
            border: solid lightgray 1px;
            border-radius: 8px;
            padding: 0px 10px;
        }

        div.settings input[type="number"]:hover {
            transition: 0.2s;
            color: #4096ff;
            border: solid #4096ff 1px;
            border-radius: 8px;
        }

        div.settings input[type="number"]:focus {
            outline: none;
            border: solid #4096ff 1px;
        }

        div.settings input[type="text"] {
            transition: 0.2s;
            height: 20px;
            margin: 5px;
            background-color: white;
            border: solid lightgray 1px;
            border-radius: 8px;
            padding: 0px 10px;
        }

        div.settings input[type="text"]:hover {
            transition: 0.2s;
            color: #4096ff;
            border: solid #4096ff 1px;
            border-radius: 8px;
        }

        div.settings input[type="text"]:focus {
            outline: none;
            border: solid #4096ff 1px;
        }

        div.settings textarea.settings-textarea {
            transition: 0.2s;
            height: 100%;
            min-height: 200px;
            width: 100%;
            margin: 5px 0;
            background-color: white;
            border: solid lightgray 1px;
            border-radius: 8px;
            padding: 10px;
            resize: none;
            box-sizing: border-box;
        }

        div.settings textarea.settings-textarea:hover {
            transition: 0.2s;
            color: #4096ff;
            border: solid #4096ff 1px;
            border-radius: 8px;
        }

        div.settings textarea.settings-textarea:focus {
            outline: none;
            border: solid #4096ff 1px;
        }

        div.settings button {
            transition: 0.2s;
            height: 30px;
            width: 60px;
            margin: 0 5px;
            background-color: white;
            border: solid lightgray 1px;
            border-radius: 8px;
        }

        div.settings button:hover {
            transition: 0.2s;
            color: white;
            background-color: #4096ff;
            border: solid #4096ff 1px;
            border-radius: 8px;
        }

        div.settings label.settings-label {
            display: inline-block;
            margin: 3px 0;
            padding: 5px 10px;
            border: 1px solid lightgray;
            border-radius: 5px;
            cursor: pointer;
        }

        div.settings label.settings-label:hover {
            background-color: #f0f0f0;
        }

        div.settings label.settings-label input[type="radio"] {
            vertical-align: middle;
            margin-right: 5px;
        }

        /* Make label text appear dimmed when radio is disabled */
        div.settings label.settings-label input[type="radio"]:disabled + span,
        div.settings label.settings-label:has(input[type="radio"]:disabled) {
            color: #999;
            cursor: not-allowed;
            opacity: 0.7;
        }
        
        /* Ensure the label doesn't appear clickable when radio is disabled */
        div.settings label.settings-label:has(input[type="radio"]:disabled):hover {
            background-color: transparent;
            cursor: not-allowed;
        }

        .userLoadNum {
            display: block;
            margin: 5px 0;
            font-size: 13px;
            color: #666;
        }

        @media screen and (prefers-color-scheme: dark) {
            div.settings {
                color: #e6edf3;
                border-color: #30363d;
                background: #0d1117;
            }
            
            .settings-left {
                border-right-color: #30363d;
            }

            div.settings hr {
                background-color: #21262d;
            }

            div.settings input[type="number"],
            div.settings input[type="text"],
            div.settings textarea.settings-textarea {
                color: #e6edf3;
                border-color: #30363d;
                background: #21262d;
            }

            div.settings button {
                color: #c9d1d9;
                border-color: #30363d;
                background: #21262d;
            }

            div.settings button:hover {
                color: white;
                background-color: #4096ff;
                border: solid #4096ff 1px;
            }

            div.settings label.settings-label {
                border-color: #30363d;
                background-color: #21262d;
            }

            div.settings label.settings-label:hover {
                background-color: #161b22;
            }

            /* Dark mode specific styles for disabled radio labels */
            div.settings label.settings-label input[type="radio"]:disabled + span,
            div.settings label.settings-label:has(input[type="radio"]:disabled) {
                color: #6e7681;
                opacity: 0.6;
            }
            
            .userLoadNum {
                color: #8b949e;
            }
        }

        /* 悬浮净化按钮样式 */
        #github-purify-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 15px;
            background-color: #ffffff;
            color: #333333;
            border: 1px solid #dddddd;
            border-radius: 8px;
            cursor: pointer;
            z-index: 9999;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        #github-purify-button:hover {
            background-color: #f0f0f0;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        #github-purify-button.button-clicked {
            transform: scale(0.95);
            background-color: #eeeeee;
        }

        @media screen and (prefers-color-scheme: dark) {
            /* 深色模式下的样式 */
            #github-purify-button {
                background-color: #333333;
                color: #ffffff;
                border-color: #444444;
            }
            
            #github-purify-button:hover {
                background-color: #444444;
            }

            #github-purify-button.button-clicked {
                background-color: #555555;
            }
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            .settings-container {
                flex-direction: column;
            }
            
            .settings-left {
                border-right: none;
                border-bottom: 1px solid #ddd;
                padding-right: 0;
                padding-bottom: 15px;
            }
            
            .settings-right {
                padding-top: 15px;
            }
            
            @media screen and (prefers-color-scheme: dark) {
                .settings-left {
                    border-bottom-color: #30363d;
                }
            }
        }
    `);

    console.log("====================\n脚本：" + GM_info.script.name + " 开始执行\n作者：" + GM_info.script.author + " 版本：" + GM_info.script.version + "\n脚本地址：https://greasyfork.org/zh-CN/scripts/473912-github搜索净化\n====================\n【脚本配置】\nisKeepDiv: " + isKeepDiv + "\nshowBlockButton: " + showBlockButton + "\nisPrecise: " + isPrecise + "\ndetectMode: " + detectMode + "\ndetectDelay: " + detectDelay + "\nallowAnnouncement: " + allowAnnouncement + "\nblockText: " + blockText + "\nuseDefaultList: " + useDefaultList + "\nconfirmBlock: " + confirmBlock + "\ncustomBanList: " + customBanList + "\n====================");
    
    // 加载远程屏蔽列表
    loadBlockList();
    
    // 显示提示
    if (detectMode !== "mutationobserver" && allowAnnouncement) {
        // 调用系统通知
        GM_notification({
            title: "Github 搜索净化",
            text: "脚本更新了一些功能\n\n您可能正在使用非最佳配置，抽空来脚本设置页面看看吧🥳",
            image: "https://github.com/favicon.ico",
        });
    }

    // 如果showBlockButton为true，则添加屏蔽按钮
    // 参考 https://greasyfork.org/zh-CN/scripts/493913-github%E5%B1%8F%E8%94%BD%E7%94%A8%E6%88%B7，进行了部分修改，整合了MutationObserver
    // 作者：Gwen0x4c3, 发布时使用MIT许可证
    if (showBlockButton) {
        // 使用MutationObserver监听结果列表变动
        const resultListObserver = new MutationObserver((mutations) => {
            const resultList = document.querySelector('div[data-testid="results-list"]');
            if (!resultList) return;

            // 检查是否是由于添加Block按钮引起的变动
            let isButtonAddition = false;
            for (const mutation of mutations) {
                if (mutation.addedNodes.length && mutation.addedNodes[0].querySelector &&
                    mutation.addedNodes[0].querySelector('button[data-block-button="true"]')) {
                    isButtonAddition = true;
                    break;
                }
            }

            // 如果是添加按钮引起的变动，则不再处理，避免死循环
            if (isButtonAddition) return;

            // 处理结果列表中的仓库
            processResultList(resultList);
        });

        // 开始观察文档变化
        resultListObserver.observe(document.body, { childList: true, subtree: true });

        // 初始处理当前页面
        const resultList = document.querySelector('div[data-testid="results-list"]');
        if (resultList) {
            processResultList(resultList);
        }

        function createElement(tag, clazz, attrs) {
            const elem = document.createElement(tag);
            if (clazz) elem.className = clazz;

            if (attrs) {
                // 遍历attrs对象的所有键值对，并将它们设置为元素的属性
                Object.entries(attrs).forEach(([key, value]) => {
                    elem[key] = value;
                });
            }

            return elem;
        }

        // 处理结果列表的函数
        function processResultList(resultList) {
            const repos = resultList.children;
            for (let i = 0; i < repos.length; i++) {
                const repo = repos[i];

                // 检查是否已经添加了Block按钮
                if (repo.querySelector('button[data-block-button="true"]')) continue;

                // 添加屏蔽按钮
                const exampleButton = repo.querySelector('button');
                if (!exampleButton) continue;

                // 获取用户名
                const span = repo.querySelector('.search-match');
                const user = span.innerText.split('/')[0]

                const blockButton = createElement('button', exampleButton.className, {
                    innerText: '🚫Block',
                    onclick: e => {
                        if (!confirmBlock || confirm("确定要屏蔽此用户: " + user + " 吗？")) {
                            customBanList.push(user);
                            GM_setValue('customBanList', customBanList);
                            clean();
                        }
                    }
                });

                blockButton.setAttribute('data-size', 'small');
                blockButton.setAttribute('data-block-button', 'true'); // 添加标记，用于识别
                const buttonWrapper = createElement('div', exampleButton.parentElement.className);
                buttonWrapper.appendChild(blockButton);

                // 暂时断开观察器，避免触发回调
                resultListObserver.disconnect();
                exampleButton.parentElement.parentElement.prepend(buttonWrapper);
                // 重新连接观察器
                resultListObserver.observe(document.body, { childList: true, subtree: true });
            }
        }
    }
    // if showBlockButton 结束

    switch (detectMode) {
        case "mutationobserver": cleanByMutationObserver(); break;
        case "loop": cleanByLoop(); break;
        case "eventListen": cleanByEventListener(); break;
        case "navigation": cleanByNavigation(); break;
        case "manual": cleanByManual(); break;
    }

})()