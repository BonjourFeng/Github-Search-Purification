// ==UserScript==
// @name         Github搜索净化
// @name:zh-CN   Github搜索净化
// @name:en      Github Search Purification
// @namespace    https://github.com/BonjourFeng
// @version      1.4.0
// @description  净化Github搜索页，屏蔽cirosantilli等400+人的敏感仓库。
// @description:zh-CN  净化Github搜索页，屏蔽cirosantilli等400+人的敏感仓库。
// @description:en Clean up Github search page, block sensitive repositories by cirosantilli and others.
// @icon       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACEUExURUxpcRgWFhsYGBgWFhcWFh8WFhoYGBgWFiUlJRcVFRkWFhgVFRgWFhgVFRsWFhgWFigeHhkWFv////////////r6+h4eHv///xcVFfLx8SMhIUNCQpSTk/r6+jY0NCknJ97e3ru7u+fn51BOTsPCwqGgoISDg6empmpoaK2srNDQ0FhXV3eXcCcAAAAXdFJOUwCBIZXMGP70BuRH2Ze/LpIMUunHkpQR34sfygAAAVpJREFUOMt1U+magjAMDAVb5BDU3W25b9T1/d9vaYpQKDs/rF9nSNJkArDA9ezQZ8wPbc8FE6eAiQUsOO1o19JolFibKCdHGHC0IJezOMD5snx/yE+KOYYr42fPSufSZyazqDoseTPw4lGJNOu6LBXVUPBG3lqYAOv/5ZwnNUfUifzBt8gkgfgINmjxOpgqUA147QWNaocLniqq3QsSVbQHNp45N/BAwoYQz9oUJEiE4GMGfoBSMj5gjeWRIMMqleD/CAzUHFqTLyjOA5zjNnwa4UCEZ2YK3khEcBXHjVBtEFeIZ6+NxYbPqWp1DLKV42t6Ujn2ydyiPi9nX0TTNAkVVZ/gozsl6FbrktkwaVvL2TRK0C8Ca7Hck7f5OBT6FFbLATkL2ugV0tm0RLM9fedDvhWstl8Wp9AFDjFX7yOY/lJrv8AkYuz7fuP8dv9izCYH+x3/LBnj9fYPBTpJDNzX+7cAAAAASUVORK5CYII=
// @license      GPL-3.0
// @author       DanicaStar BonjourFeng
// @match        *://github.com/search*
// @match        *://github.site/search*
// @match        *://github.store/search*
// @match        *://kkgithub.com/search*
// @match        *://dgithub.xyz/search*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_deleteValues
// @grant        unsafeWindow
// @run-at       document-end
// @downloadURL https://update.greasyfork.org/scripts/473912/Github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96.user.js
// @updateURL https://update.greasyfork.org/scripts/473912/Github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96.meta.js
// ==/UserScript==
(function () {
    "use strict" // 严格模式
    let defaultBanList = ['cirosantilli', 'wumaoland', 'codin-stuffs', 'cheezcharmer', 'gege-circle', 'zhaohmng-outlook-com', 'zaohmeing', 'Daravai1234', 'candice531033938', 'jk-ice-cream', 'jk-ice-cream-250', 'sky8964', 'pxvr-official', 'zpc1314521', 'jjzhang166', 'panbinibn', 'programthink', 'hello-world-1989', 'b0LBwZ7r5HOeh6CBMuQIhVu3-s-random-fork', 'thethetpvmy', 'wwwswitch520cc', 'shotoanqrob', 'sitempeanhkkwg', 'fukeluo', '1206256980', 'curees', 'yuoppo', 'Createree', 'vghl', 'wholedata', 'dunjian', 'mksshare', 'abshare', 'tpxdat', 'jhdyg', 'changfengqj', 'Dujltqzv', 'xmq1024', 'golade', 'kdjfhd', 'dkjhy', 'junsolg', 'dkjiiu', 'faithhow', 'yamtioy', 'zugzuc', 'lusvont', 'kenyatas', 'koeheu', 'juttama', 'duspub', 'wuqdid', 'visxud', 'suyfic', 'qokkod', 'roepuo', 'purfob', 'gitprocode', 'ynwynw', 'hanguodianying', 'hgyw', '69sm', 'urlapp', 'Augensternhx', 'urlweb', 'fuliso', 'nishjd', '36dshipin', 'hapump', 'zhguoxmw', 'KoreanMovies', 'hanjutv', 'mamadepengyou', 'mamatouyunmuxuan', 'erzideqizi', 'wodeqizidejiejie', 'xiaoyizidemeng', 'qingyuzongheng', 'jiangnanerxi', 'hanguobiaomei', 'djhgy', 'XXOOBY', 'baoyu1024', 'kk234kkkk', '15923-ORIX', 'wutaed', 'webzhibo', 'apptuijian', 'follow666', 'yu90892', 'aconteet', 'getmal', 'itxinfei', 'mingtiana', 'midoushipin', 'paofushipin', 'yinghanshipin', 'GTVapp', 'huangyouquan', 'devlookme', 'audwq', 'jhdgy', 'di6gandh', 'shuangyuzhibo', 'lvchazhibo', 'xiaolanshipin', 'bofangqi', 'yingtaoshipin', 'xiangfeizhibo', 'lvchaApp', 'luoshenzhibo', 'yaojizhibo', 'mudanzhibo', 'aiaizhibo', 'gaochaoqwe', 'jiolde', 'lsdhw', 'kanavdaohang', 'harnh', 'kuadaner', 'wapquan', 'laoyeer', 'reteres', 'haoersn', 'zhengjianzhong0107', 'huaaweiCode', 'jianjian00001', 'm2ak-dev', 'yyzwz', 'froginwe11', 'luanmenglei', 'xijinping0', 'cyqqq', 'qldaisd', 'lTbgykio', 'yao270161651', 'jt0008jt0008', '15625103741', 'sky1234566778', 'chfucao', 'chifuyidaocao', 'updrmeltm', 'alice548', 'yazm000', 'cpnorg', 'tffygbu', 'Liberty-China', '1989CCP', 'liulihaocai', 'RevolutionaryCommitteeCPC', 'LeiyanLu', 'webdao', 'GC4WP', 'tu01', 'ziliao1', 'zzs70', 'ff2017', 'guitu2017', 'tu2017', 'wm001', 'wnel2017', 'dunhlino', 'nelaliox', 'jianjian3219', 'giteecode', '666bears', 'wang-buer', 'id681ilyg316', 'uhjid', 'usdui', 'uhskl', 'uyjks', 'uhskldf', 'itgsi5', 'uifskv', 'uhgask', 'igfkld', 'udsjd', 'ufodk', 'uigsjt', 'ighfrs', 'haivs', 'idrkkld', 'yuisju', 'uldydj', 'uyuek', 'tydfj', 'uuedif', 'ykwsw3', 'uigsi7', 'tyiis', 'ykeik', 'ukvdj', 'uyikl', 'ufzekg', 'yiksure', 'rhksgz', 'rthls', 'rhjaw', 'rehlxs', 'thzsgt', 'tdidst', 'eglct', 'tjkdyu', 'tjlks', 'tjjds', 'rllfs', 'rhkstd', 'yjscdr', 'servisee', 'ufsjzf', 'bvnbvnfgd', 'duliyingshi', 'calendi', 'mayeobey', 'QQMusic-Jay-Chou', 'boylovecomic', 'bt9527', 'FarmerChina', 'Waymon102092', 'baofx', 'biehd', 'moonpas', 'lyqilo', 'liliqh', 'hourv', 'xinfue', 'jijidianying', 'YuyanCai', 'jtdh', 'isdkxr', 'yhildyu', 'ykldyld', 'igsigk', 'uidekj', 'iufskw', 'udsjhf', 'tjkdx', 'rtkist', 'tjlsyh', 'euhf', 'rjzsht', 'rhkdzu', 'ehkkld', 'xzgfsw', 'iofgd', 'yufdk', 'ujkdub', 'iofgdsk', 'dyghikg', 'ugdskf', 'ifwaih', 'oigsiu', 'yjksku', 'yfdkkrf', 'thjsqd', 'yjsyhf', 'ydjsu6', 'igseyf', 'ujudy8', 'tykde', 'ykmdi8', 'yklzrf', 'uijdkd', 'yjkshc', 'tkajc', 'ykdzs', 'jklsx', 'ejldux', 'ifxspo', 'ogsvtf', 'ifdeu', 'yudfdi', 'ofssj', 'igegkx', 'ugfkd', 'ugdsk', 'udskts', 'yjlkdss', 'fkdryl', 'rtuyjsr', 'tus56f', 'yjdsd', 'yuet6h', 'ugtw', 'tlkxt', 'yesrs', 'ykkds', 'yjksu', 'yhyshs', 'xdzfby', 'yujzdh', 'znfl', 'kjiud', 'shijuezhishi', 'hy1980boy', 'ww0304', 'ZXCASD854', 'zfpdh', 'batiyadh', 'yinsedh', 'yyfxz', 'bllpooe', 'joodfer', 'qdmang', 'chaenet', 'mzsyv', 'kzhaoes', 'clnnews', 'kendnes', 'hongnews', 'luokez', 'li721-LY', 'itunsr', 'cctnews', 'htmle', 'xmmj2', 'younownews', '445435213', 'seseClub', 'enewse', 'wsnewse', 'qsnews', 'soasmoughroy', 'adminewhat', 'wsermusic', 'molingfer', 'zhihues', '95movies', '99fuli', 'qnewse', 'tareres', 'hukioip', 'Hochoclate713', 'ervnme', 'greenleaf8888', '93-days', 'doubanm', 'xhydh', 'fvckslvt', 'MDCM-FB', 'b08240', 'm3u8-ekvod', 'huan768468', 'SweeOBC', 'ningmengsuan7788', 'supperqb', 'idskjs', 'ifsird', 'gklksr', 'ifsjxr', 'ifskxt', 'ghjklsd', 'udsskd', 'tgsjk', 'ihgsk', 'ujsjk', 'ijhdf', 'fghhgks', 'udfae4', 'jujwdj', 'ydsdk', 'uyfgsj', 'ykkxrd', 'branono', 'hytcd', 'kjiuo', 'SaolApp', 'lourv', 'uisdlk', 'hutuhai', 'dengminna', 'whmnoe4j', 'txy9704', 'ufsjl', 'udsks', 'uifsjk', 'ygsaj', 'udsts', 'yurdek', 'ghklsr', 'ifsnx', 'ufskd', 'yujst6', 'ifsurjn', 'saoyagma', 'yusyrdk', 'uijhgr', 'geeeeeeeek', 'gfjklk', 'uiskv', 'ccccsp', 'rrrsp', 'udjxs', 'qiezisp', 'egklkd', 't6korf', 'line915577', 'haijv', 'huaxinzhibo', 'haijiaofabuye', 'haijiaoshequ', 'HaijiaoCommunity', 'haijiao-app', 'fulibaike', 'lurmarp', 'entvasa', 'gotwib', 'hghkiiy121', 'gubcem', 'uijssu', 'yjhuk', 'yklsd', 'haijiaoWeb', 'winston779', 'tyukkst', 'ujsnmc', 'ygssk', 'igdkdy', 'qiezishiping', 'kjuhd', 'xiaogongzhuAPP', 'babyzhibo', 'yaojingzhibo', 'balizhibo', 'jiuaizhibo', 'liuyuezhibo', '69live', 'asidw', 'kuaimaoVIP', 'siguaha', 'mizhizhibo', 'lihzd', 'caomeizhibo', '36DAPP', 'luolisheApp', '69zhibo', 'jiejiezhibo', 'k8japan', 'buyaoshan', 'dk111222', 'fanbaovpn', 'HGcrowntiyu', '196tiyu', 'parryno', 'boyiscode', 'moonews', 'kim1528', 'tjqJ62cESiHPj6DdR6vXDAcPp', 'code-help-tutor', 'turbocanary', 'Ifem2BXvz4N4gh1gGn0bkR3Lp', 'R7w726fYrfritM7zPJCO'];
    let useDefaultList = GM_getValue("useDefaultList", true); // 是否加载默认屏蔽列表，默认为true
    let showBlockButton = GM_getValue("showBlockButton", true); // 是否显示屏蔽按钮，默认为true
    let isKeepDiv = GM_getValue("isKeepDiv", false); // 是否保留被屏蔽项目占位，默认为false
    let isPrecise = GM_getValue("isPrecise", true); // 是否精确匹配，默认为true
    let detectMode = GM_getValue("detectMode", "mutationobserver"); // 检测模式，默认为mutationobserver
    let detectDelay = GM_getValue("detectDelay", 100); // 每次检测循环间隔的时间，单位为毫秒，默认为100毫秒
    let customBanList = GM_getValue("customBanList", []); // 自定义屏蔽列表

    let banList = []; // 最终的屏蔽列表
    useDefaultList ? banList = Array.from(new Set([...defaultBanList, ...customBanList])) : banList = customBanList; // 根据是否加载默认屏蔽列表决定最终的屏蔽列表

    // 开启设置页面函数
    function openMenu() {
        // 检测是否已经开启设置页面
        if (document.getElementsByClassName("settings").length == 0) {
            let settingMenu = document.createElement("div");
            settingMenu.className = "settings";
            settingMenu.innerHTML = /*html*/`
                <h2><span>Github搜索净化 v</span><span id="scriptVersion"></span></h2>
                <a href="https://github.com/BonjourFeng/Github-Search-Purification" target="_blank"><div class="badge1"></div></a>
                <a href="https://greasyfork.org/zh-CN/scripts/473912-github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96" target="_blank"><div class="badge2"></div></a>
                <br>
                <span class="userLoadNum">已加载屏蔽用户数量：加载中...</span>
                <hr>
                <div class="settings-block">
                    <span>加载默认屏蔽列表</span>
                    <label class="settings-switch">
                        <input type="checkbox" id="useDefaultList">
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="settings-block"><span>显示屏蔽按钮</span><label class="settings-switch"><input type="checkbox"
                            id="showBlockButton"><span class="slider round"></span></label>
                </div>
                <div class="settings-block"><span>保留被屏蔽项目占位</span><label class="settings-switch"><input type="checkbox"
                            id="isKeepDiv"><span class="slider round"></span></label>
                </div>
                <div class="settings-block"><span>精确匹配</span><label class="settings-switch"><input type="checkbox"
                            id="isPrecise"><span class="slider round"></span></label></div>
                <div class="settings-block">
                    <span>检测模式</span>
                    <select id="detectMode">
                        <option value="mutationobserver">MutationObserver(推荐)</option>
                        <option value="loop" title="性能较差，不推荐">Loop</option>
                        <option value="eventListen" title="有可能没有效果">eventListener</option>
                        <option value="navigation" title="Firefox,Safari 不支持">Navigation API</option>
                        <option value="manual" title="需要手动点击按钮进行屏蔽">Manual</option>
                    </select>
                </div>
                <div class="settings-block">
                    <span>检测循环间隔时间（Loop模式）</span>
                    <input type="number" class="settings-input">
                </div>
                <hr>
                <div class="settings-block"><p class="text-center">自定义屏蔽列表</p></div>
                <div class="settings-block">
                    <textarea id="customBanInput" placeholder="在此处输入用户名，用户间以英文逗号分隔" class="settings-textarea"></textarea>
                </div>
                <button id="save">保存</button><button id="cancel">取消</button>
            `;
            document.body.appendChild(settingMenu);

            // 更新设置页面
            document.getElementById("scriptVersion").innerText = GM_info.script.version; // 更新版本号
            if (useDefaultList) { document.getElementsByClassName("userLoadNum")[0].innerText = `已加载默认屏蔽用户数量：${defaultBanList.length}，自定义屏蔽用户数量：${customBanList.length}`; }
            else { document.getElementsByClassName("userLoadNum")[0].innerText = `未加载默认列表，自定义屏蔽用户数量：${customBanList.length}`; }

            showBlockButton ? document.getElementById("showBlockButton").checked = true : document.getElementById("showBlockButton").checked = false; // 更新是否显示屏蔽按钮
            isKeepDiv ? document.getElementById("isKeepDiv").checked = true : document.getElementById("isKeepDiv").checked = false; // 更新是否保留被屏蔽项目占位
            isPrecise ? document.getElementById("isPrecise").checked = true : document.getElementById("isPrecise").checked = false; // 更新是否精确匹配
            useDefaultList ? document.getElementById("useDefaultList").checked = true : document.getElementById("useDefaultList").checked = false; // 更新是否加载默认屏蔽列表
            document.getElementById("detectMode").value = detectMode; // 更新检测模式            

            // 检测浏览器是否支持 Navigation API
            if (!window.navigation) { document.querySelector('option[value="navigation"]').disabled = true; }

            document.getElementsByClassName("settings-input")[0].value = detectDelay; // 更新循环间隔时间输入框
            document.getElementsByClassName("settings-input")[0].addEventListener('change', checkDelaytime); // 添加纠正循环间隔监听器
            document.getElementById("customBanInput").value = customBanList.join(","); // 更新自定义屏蔽列表

            // 背景模糊
            backgroungBlur();

            // 添加按钮事件——保存
            document.getElementById("save").onclick = function () {
                document.getElementById("showBlockButton").checked == true ? GM_setValue("showBlockButton", true) : GM_setValue("showBlockButton", false); // 保存是否显示屏蔽按钮
                document.getElementById("isKeepDiv").checked == true ? GM_setValue("isKeepDiv", true) : GM_setValue("isKeepDiv", false); // 保存是否保留被屏蔽项目占位
                document.getElementById("isPrecise").checked == true ? GM_setValue("isPrecise", true) : GM_setValue("isPrecise", false); // 保存是否精确匹配
                document.getElementById("useDefaultList").checked == true ? GM_setValue("useDefaultList", true) : GM_setValue("useDefaultList", false); // 保存是否加载默认屏蔽列表
                GM_setValue("detectMode", document.getElementById("detectMode").value); // 保存检测模式

                let newCustomBanList = document.getElementById("customBanInput").value.split(",").filter(item => item.trim() !== ""); // 去除空字符串
                newCustomBanList = newCustomBanList.map(item => item.trim()); // 去除用户名前后空格
                newCustomBanList = Array.from(new Set(newCustomBanList).values()); // 用户名去重
                GM_setValue("customBanList", newCustomBanList); // 保存自定义屏蔽列表
                GM_setValue("detectDelay", parseInt(document.getElementsByClassName("settings-input")[0].value)); // 保存循环间隔时间

                closeMenu(); // 关闭设置页面
                location.reload(); // 刷新页面以应用设置
            }

            // 添加按钮事件——取消
            document.getElementById("cancel").onclick = function () {
                closeMenu(); // 关闭设置页面
            };
        }
    }


    // 检查循环间隔时间函数
    function checkDelaytime() {
        let val = parseInt(this.value, 10);
        if (isNaN(val) || val < 10) {
            this.value = 10;
        }
    }


    // 关闭设置页面函数
    function closeMenu() {
        let settingsWindow = document.getElementsByClassName("settings")[0]; // 获取设置页面元素
        settingsWindow.style.opacity = 0; // 设置透明度为0，开始淡出动画
        setInterval(() => { settingsWindow.remove() }, 200); // 200毫秒后移除设置页面
        backgroungBlur(); // 取消背景模糊
        document.getElementsByClassName("settings-input")[0].removeEventListener('change', checkDelaytime) // 删除纠正循环间隔监听器
    }


    // 背景模糊函数，使用try避免因小错误导致脚本失效
    function backgroungBlur() {
        try {
            let github_area = document.getElementsByClassName("env-production page-responsive")[1];
            github_area.style.transition = '0.2s'; // 设置过渡效果
            github_area.style.filter == '' ? github_area.style.filter = 'blur(10px)' : github_area.style.filter = ''; // 设置背景模糊

            // 设置背景滚动
            github_area = document.getElementsByClassName("env-production page-responsive")[0];
            github_area.style.overflow == 'hidden' ? github_area.style.overflow = '' : github_area.style.overflow = 'hidden'; // 设置背景滚动
        } catch (err) {
            console.log(GM_info.script.name + "：设置背景模糊或背景滚动失效");
        }
    }


    // 注册菜单——脚本设置
    GM_registerMenuCommand(
        "⚙️脚本设置",
        function () {
            openMenu();
        }
    );

    // 注册菜单——重置设置
    GM_registerMenuCommand(
        "🔄️重置设置",
        async function () {
            if (confirm("是否重置脚本设置？") == true) {
                let keys = await GM.listValues(); // 获取所有设置
                GM.deleteValues(keys); // 删除所有设置
                location.reload(); // 刷新页面以应用设置
            }
        }
    );


    //**
    //*  屏蔽处理代码
    //**
    function clean() {
        if (document.querySelector("div[data-testid='results-list']") !== null) {
            let search_list = document.querySelector("div[data-testid='results-list']").childNodes;
            // 从后向前遍历，防止删除元素影响未遍历的索引
            for (let i = search_list.length - 1; i >= 0; i--) {
                // console.log(search_list[i]); // 输出当前处理的元素
                if (isBan(search_list[i], isPrecise)) {
                    if (isKeepDiv) {
                        search_list[i].firstChild.remove();
                        search_list[i].append('⛔该仓库被脚本屏蔽');
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
                for (let j = 0; j < banList.length; j++) {
                    if (userName == banList[j]) {
                        return true;
                    }
                }
                return false;
            }
            else { return false; }
        }
        else {
            for (let j = 0; j < banList.length; j++) {
                if (target.innerText.includes(banList[j])) {
                    return true;
                }
            }
            return false;
        }
    };


    //**
    //* MutationObserver检测代码
    //**
    function cleanByMutationObserver() {
        const targetNode = document.body;
        // 观察器的配置（需要观察什么变动）
        const config = { childList: true, subtree: true };
        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(clean);
        // 以上述配置开始观察目标节点
        observer.observe(targetNode, config);
    }


    //**
    //* Loop检测代码
    //**
    function cleanByLoop() {
        console.log("Running:Loop");
        setInterval(function () {
            clean();
        }, detectDelay);
    };


    //**
    //* eventListener检测代码
    //**
    function pageChange(url) {
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


    //**
    //* Navigation API检测代码
    //**
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

    //**
    //* 手动屏蔽检测代码
    //**
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
            }, 200);
        });

        // 将按钮添加到页面
        document.body.appendChild(floatingButton);
    }


    //**
    //* 入口
    //**
    GM_addStyle(/*css*/`
        div.settings {
            transition: 0.2s;
            position: fixed;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            text-align: center;
            font-size: large;
            max-height: 90%;
            width: 55%;
            left: 50%;
            top: 50%;
            padding: 20px;
            transform: translate(-50%, -50%);
            background-color: aliceblue;
            color: rgba(0, 0, 0, 0.88);
            border: solid rgb(240, 240, 240) 1px;
            border-radius: 8px;
            overflow-y: auto;
            box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
        }

        .text-center {
            margin: 0 auto;
        }

        div.settings h2 {
            margin: 0;
            font-size: 1.5em;
            font-weight: bold;
        }

        /* 分隔线样式 */
        div.settings hr {
            border-block-start-color: rgba(5, 5, 5, 0.2);
            margin: 10px;
        }

        /* 设置项block样式 */
        div.settings .settings-block {
            padding: 6px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        div.settings .settings-block > span {
            flex: 1;
            text-align: left;
        }

        div.settings .settings-block > label,
        div.settings .settings-block > input,
        div.settings .settings-block > textarea {
            margin-left: auto;
        }

        /* 开关样式 */
        div.settings label.settings-switch {
            position: relative;
            display: inline-block;
            width: 44px;
            height: 22px;
        }

        div.settings .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgb(217, 217, 217);
            -webkit-transition: .2s;
            transition: .2s;
        }

        div.settings .slider:before {
            position: absolute;
            content: "";
            height: 14px;
            width: 14px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .2s;
            transition: .2s;
        }

        div.settings input:checked+.slider {
            background-color: #4096ff;
        }

        div.settings input:checked+.slider:before {
            -webkit-transform: translateX(22px);
            -ms-transform: translateX(22px);
            transform: translateX(22px);
        }

        div.settings .slider.round {
            border-radius: 34px;
        }

        div.settings .slider.round:before {
            border-radius: 50%;
        }

        /* 输入框样式 */
        div.settings input[type="number"]{
            transition: 0.2s;
            height: 1.5em;
            margin: 5px;
            border: solid rgb(217, 217, 217) 1px;
            border-radius: 6px;
            padding: 5px;
        }

        div.settings input[type="number"] {
            width: 5em;
        }

        /* 输入框聚焦和悬停样式 */
        div.settings input[type="text"]:hover,div.settings input[type="number"]:hover,div.settings input[type="text"]:focus,div.settings input[type="number"]:focus {
            transition: 0.2s;
            outline: none;
            border: solid #4096ff 1px;
        }

        /* 文本区域样式 */
        div.settings textarea.settings-textarea {
            transition: 0.2s;
            height: 3em;
            width: 100%;
            border: solid rgb(217, 217, 217) 1px;
            border-radius: 8px;
            padding: 5px 10px;
            resize: both;
        }

        /* 文本区域聚焦和悬停样式 */
        div.settings textarea.settings-textarea:hover,
        div.settings textarea.settings-textarea:focus {
            outline: none;
            border: solid #4096ff 1px;
        }

        /* 按钮样式 */
        div.settings button {
            transition: 0.2s;
            height: 30px;
            width: 60px;
            margin: 20px 10px 0px 10px;
            background-color: #1677FF;
            color:  white;
            border: solid rgba(0, 0, 0, 0) 1px;
            border-radius: 8px;
        }

        div.settings button:hover {
            background-color: #4096ff;
        }

        div.settings button:active {
            transform: scale(0.9);
        }

        div.settings select {
            transition: 0.2s;
            border: solid rgb(217, 217, 217) 1px;
            border-radius: 6px;
        }
        
        div.settings select:hover, div.settings select:focus {
            outline: none;
            border: solid #4096ff 1px;
        }

        /* 深色模式支持 */
        @media screen and (prefers-color-scheme: dark) {
            div.settings, div.settings input,div.settings button,div.settings input[type="number"],div.settings .slider,div.settings textarea.settings-textarea,div.settings select {
                color: #ccc !important;
                background-color: #121212 !important;
                border: solid #ccc 1px !important;
            }

            div.settings input:checked+.slider {
                background-color: #4096ff !important;
                border: solid #ccc 1px !important;
            }

            div.settings textarea.settings-textarea:hover,
            div.settings textarea.settings-textarea:focus {
                outline: none;
                border: solid #4096ff 1px !important;
            }

            div.settings input[type="text"]:hover,div.settings input[type="number"]:hover,div.settings input[type="text"]:focus,div.settings input[type="number"]:focus {
                outline: none !important;
                border: solid #4096ff 1px !important;
            }
        }

        /* badge */
        div.settings div.badge1 {
            display: inline-block;
            width: 217px;
            height: 20px;
            background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjE3IiBoZWlnaHQ9IjIwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IkdpdGh1YjogR2l0aHViIFNlYXJjaCBQdXJpZmljYXRpb24iPjx0aXRsZT5HaXRodWI6IEdpdGh1YiBTZWFyY2ggUHVyaWZpY2F0aW9uPC90aXRsZT48ZyBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzU1NSIvPjxyZWN0IHg9IjY0IiB3aWR0aD0iMTUzIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMDA3ZWM2Ii8+PC9nPjxnIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJWZXJkYW5hLEdlbmV2YSxEZWphVnUgU2FucyxzYW5zLXNlcmlmIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBmb250LXNpemU9IjExMCI+PGltYWdlIHg9IjUiIHk9IjMiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCbWFXeHNQU0ozYUdsMFpYTnRiMnRsSWlCeWIyeGxQU0pwYldjaUlIWnBaWGRDYjNnOUlqQWdNQ0F5TkNBeU5DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhkR2wwYkdVK1IybDBTSFZpUEM5MGFYUnNaVDQ4Y0dGMGFDQmtQU0pOTVRJZ0xqSTVOMk10Tmk0Mk15QXdMVEV5SURVdU16Y3pMVEV5SURFeUlEQWdOUzR6TURNZ015NDBNemdnT1M0NElEZ3VNakExSURFeExqTTROUzQyTGpFeE15NDRNaTB1TWpVNExqZ3lMUzQxTnpjZ01DMHVNamcxTFM0d01TMHhMakEwTFM0d01UVXRNaTR3TkMwekxqTXpPQzQzTWpRdE5DNHdOREl0TVM0Mk1TMDBMakEwTWkweExqWXhRelF1TkRJeUlERTRMakEzSURNdU5qTXpJREUzTGpjZ015NDJNek1nTVRjdU4yTXRNUzR3T0RjdExqYzBOQzR3T0RRdExqY3lPUzR3T0RRdExqY3lPU0F4TGpJd05TNHdPRFFnTVM0NE16Z2dNUzR5TXpZZ01TNDRNemdnTVM0eU16WWdNUzR3TnlBeExqZ3pOU0F5TGpnd09TQXhMak13TlNBekxqUTVOUzQ1T1RndU1UQTRMUzQzTnpZdU5ERTNMVEV1TXpBMUxqYzJMVEV1TmpBMUxUSXVOalkxTFM0ekxUVXVORFkyTFRFdU16TXlMVFV1TkRZMkxUVXVPVE1nTUMweExqTXhMalEyTlMweUxqTTRJREV1TWpNMUxUTXVNakl0TGpFek5TMHVNekF6TFM0MU5DMHhMalV5TXk0eE1EVXRNeTR4TnpZZ01DQXdJREV1TURBMUxTNHpNaklnTXk0eklERXVNak11T1RZdExqSTJOeUF4TGprNExTNHpPVGtnTXkwdU5EQTFJREV1TURJdU1EQTJJREl1TURRdU1UTTRJRE1nTGpRd05TQXlMakk0TFRFdU5UVXlJRE11TWpnMUxURXVNak1nTXk0eU9EVXRNUzR5TXk0Mk5EVWdNUzQyTlRNdU1qUWdNaTQ0TnpNdU1USWdNeTR4TnpZdU56WTFMamcwSURFdU1qTWdNUzQ1TVNBeExqSXpJRE11TWpJZ01DQTBMall4TFRJdU9EQTFJRFV1TmpJMUxUVXVORGMxSURVdU9USXVOREl1TXpZdU9ERWdNUzR3T1RZdU9ERWdNaTR5TWlBd0lERXVOakEyTFM0d01UVWdNaTQ0T1RZdExqQXhOU0F6TGpJNE5pQXdJQzR6TVRVdU1qRXVOamt1T0RJMUxqVTNRekl3TGpVMk5TQXlNaTR3T1RJZ01qUWdNVGN1TlRreUlESTBJREV5TGpJNU4yTXdMVFl1TmpJM0xUVXVNemN6TFRFeUxURXlMVEV5SWk4K1BDOXpkbWMrIi8+PHRleHQgeD0iNDE1IiB5PSIxNDAiIHRyYW5zZm9ybT0ic2NhbGUoLjEpIiBmaWxsPSIjZmZmIiB0ZXh0TGVuZ3RoPSIzNzAiPkdpdGh1YjwvdGV4dD48dGV4dCB4PSIxMzk1IiB5PSIxNDAiIHRyYW5zZm9ybT0ic2NhbGUoLjEpIiBmaWxsPSIjZmZmIiB0ZXh0TGVuZ3RoPSIxNDMwIj5HaXRodWIgU2VhcmNoIFB1cmlmaWNhdGlvbjwvdGV4dD48L2c+PC9zdmc+");
            margin: auto;
        }

        div.settings div.badge2 {
            display: inline-block;
            width: 185px;
            height: 20px;
            background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTg1IiBoZWlnaHQ9IjIwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IkdyZWFzeSBGb3JrOiBHaXRodWLmkJzntKLlh4DljJYiPjx0aXRsZT5HcmVhc3kgRm9yazogR2l0aHVi5pCc57Si5YeA5YyWPC90aXRsZT48ZyBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPjxyZWN0IHdpZHRoPSI5NCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzU1NSIvPjxyZWN0IHg9Ijk0IiB3aWR0aD0iOTEiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDdlYzYiLz48L2c+PGcgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlZlcmRhbmEsR2VuZXZhLERlamFWdSBTYW5zLHNhbnMtc2VyaWYiIHRleHQtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIGZvbnQtc2l6ZT0iMTEwIj48aW1hZ2UgeD0iNSIgeT0iMyIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUJtYVd4c1BTSjNhR2wwWlhOdGIydGxJaUJ5YjJ4bFBTSnBiV2NpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWo0OGRHbDBiR1UrUjNKbFlYTjVJRVp2Y21zOEwzUnBkR3hsUGp4d1lYUm9JR1E5SWswMUxqZzVJREl1TWpJM1lTNHlPQzR5T0NBd0lEQWdNU0F1TWpZMkxqQTNObXcxTGpBMk15QTFMakEyTW1NdU5UUXVOVFF1TlRBNUlERXVOalV5TFM0d016RWdNaTR4T1RKc09DNDNOekVnT0M0M04yTXhMak0xTmlBeExqTTFOUzB1TXpZZ015NHdPVGN0TVM0M015QXhMamN5T0d3dE9DNDNOekl0T0M0M04yTXRMalUwTGpVMExURXVOalV4TGpVM01TMHlMakU1TVM0d016RnNMVFV1TURZekxUVXVNRFpqTFM0ek1EUXRMak13TkM0ek1EUXRMamt4TVM0Mk1EZ3RMall3T0d3ekxqY3hOQ0F6TGpjeE0wdzNMalU1SURndU1qazNJRE11T0RjMUlEUXVOVGd5WXkwdU16QTBMUzR6TURRdU16QTBMUzQ1TVRFdU5qQTNMUzQyTURkc015NDNNVFVnTXk0M01UUWdNUzR3TmpjdE1TNHdOalpNTlM0MU5Ea2dNaTQ1TVdNdExqSXlPQzB1TWpJNExqQTFOeTB1TmpJMkxqTTBNaTB1TmpneldrMHhNaUF3UXpVdU16YzBJREFnTUNBMUxqTTNOU0F3SURFeWN6VXVNemMwSURFeUlERXlJREV5WXpZdU5qSTFJREFnTVRJdE5TNHpOelVnTVRJdE1USlRNVGd1TmpJMUlEQWdNVElnTUZvaUx6NDhMM04yWno0PSIvPjx0ZXh0IHg9IjU2NSIgeT0iMTQwIiB0cmFuc2Zvcm09InNjYWxlKC4xKSIgZmlsbD0iI2ZmZiIgdGV4dExlbmd0aD0iNjcwIj5HcmVhc3kgRm9yazwvdGV4dD48dGV4dCB4PSIxMzg1IiB5PSIxNDAiIHRyYW5zZm9ybT0ic2NhbGUoLjEpIiBmaWxsPSIjZmZmIiB0ZXh0TGVuZ3RoPSI4MTAiPkdpdGh1YuaQnOe0ouWHgOWMljwvdGV4dD48L2c+PC9zdmc+");
            margin: auto;
        }

        /* 悬浮净化按钮样式 */
        #github-purify-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 15px;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            cursor: pointer;
            z-index: 9999;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        #github-purify-button:hover {
            background-color: #f0f0f0;
        }

        #github-purify-button.button-clicked {
            transform: scale(0.95);
        }
    `);

    console.log("====================\n脚本：" + GM_info.script.name + " 开始执行\n作者：" + GM_info.script.author + " 版本：" + GM_info.script.version + "\n脚本地址：https://greasyfork.org/zh-CN/scripts/473912-github搜索净化\n====================\n【脚本配置】\nisKeepDiv: " + isKeepDiv + "\nshowBlockButton: " + showBlockButton + "\nisPrecise: " + isPrecise + "\ndetectMode: " + detectMode + "\ndetectDelay: " + detectDelay + "\nuseDefaultList: " + useDefaultList + "\ncustomBanList: " + customBanList);


    // 如果showBlockButton为true，则添加屏蔽按钮
    // 参考 https://greasyfork.org/zh-CN/scripts/493913-github%E5%B1%8F%E8%94%BD%E7%94%A8%E6%88%B7，进行了部分修改，整合了MutationObserver
    // 作者：Gwen0x4c3, 发布时使用MIT许可证
    if (showBlockButton) {
        const resultListObserver = new MutationObserver((mutations) => { // 创建一个MutationObserver实例，监听DOM变化
            const resultList = document.querySelector('div[data-testid="results-list"]'); // 获取搜索结果列表
            if (!resultList) return; // 如果没有结果列表则返回

            let isButtonAddition = false; // 标记是否为按钮添加操作
            for (const mutation of mutations) { // 遍历所有变动
                if (mutation.addedNodes.length && mutation.addedNodes[0].querySelector &&
                    mutation.addedNodes[0].querySelector('button[data-block-button="true"]')) { // 检查是否有block按钮被添加
                    isButtonAddition = true; // 如果是，设置标记
                    break; // 跳出循环
                }
            }

            if (isButtonAddition) return; // 如果是按钮添加操作则不处理
            processResultList(resultList); // 处理结果列表，添加block按钮
        });

        resultListObserver.observe(document.body, { childList: true, subtree: true }); // 监听整个body的子节点变化
        const resultList = document.querySelector('div[data-testid="results-list"]'); // 获取初始的结果列表
        if (resultList) {
            processResultList(resultList); // 如果存在，立即处理一次
        }

        function createElement(tag, clazz, attrs) { // 创建元素的辅助函数
            const elem = document.createElement(tag); // 创建指定标签的元素
            if (clazz) elem.className = clazz; // 设置类名
            if (attrs) {
                Object.entries(attrs).forEach(([key, value]) => {
                    elem[key] = value; // 设置属性
                });
            }
            return elem; // 返回创建的元素
        }

        function processResultList(resultList) { // 处理结果列表，给每个仓库添加block按钮
            const repos = resultList.children; // 获取所有仓库节点
            for (let i = 0; i < repos.length; i++) { // 遍历每个仓库
                const repo = repos[i]; // 当前仓库节点

                if (repo.querySelector('button[data-block-button="true"]')) continue; // 如果已经有block按钮则跳过

                const exampleButton = repo.querySelector('button'); // 获取一个已有的按钮作为样式参考
                if (!exampleButton) continue; // 如果没有按钮则跳过

                const span = repo.querySelector('.search-match'); // 获取显示仓库名的span
                const user = span.innerText.split('/')[0] // 提取用户名

                const blockButton = createElement('button', exampleButton.className, { // 创建block按钮，复用样式
                    innerText: '🚫Block', // 按钮文本
                    onclick: () => { // 点击事件
                        customBanList.push(user); // 将用户添加到自定义屏蔽列表
                        banList.push(user); // 将用户添加到全局屏蔽列表
                        GM_setValue('customBanList', customBanList); // 保存自定义屏蔽列表
                        clean(); // 重新清理页面
                    }
                });

                blockButton.setAttribute('data-size', 'small'); // 设置按钮尺寸属性
                blockButton.setAttribute('data-variant', 'default'); // 设置按钮样式属性
                blockButton.setAttribute('data-block-button', 'true'); // 添加自定义属性用于识别
                const buttonWrapper = createElement('div', exampleButton.parentElement.className); // 创建按钮外层div，复用原按钮父元素的类名
                buttonWrapper.appendChild(blockButton); // 将block按钮添加到外层div
                resultListObserver.disconnect(); // 断开observer，防止递归触发
                exampleButton.parentElement.parentElement.prepend(buttonWrapper); // 将block按钮插入到按钮组前面
                resultListObserver.observe(document.body, { childList: true, subtree: true }); // 重新监听DOM变化
            }
        }
    }


    // 根据选择的模式进行净化
    switch (detectMode) {
        case "mutationobserver": cleanByMutationObserver(); break;
        case "loop": cleanByLoop(); break;
        case "eventListen": cleanByEventListener(); break;
        case "navigation": cleanByNavigation(); break;
        case "manual": cleanByManual(); break;
    }

})()