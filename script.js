// ==UserScript==
// @name         Github搜索净化
// @name:zh-CN   Github搜索净化
// @name:en      Github Search Purification
// @namespace    https://github.com/danicastarr
// @version      1.2.8
// @description  净化Github搜索页，屏蔽cirosantilli等400+人的敏感仓库。
// @description:zh-CN  净化Github搜索页，屏蔽cirosantilli等400+人的敏感仓库。
// @description:en Clean up Github search page, block sensitive repositories by cirosantilli and others.
// @icon       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACEUExURUxpcRgWFhsYGBgWFhcWFh8WFhoYGBgWFiUlJRcVFRkWFhgVFRgWFhgVFRsWFhgWFigeHhkWFv////////////r6+h4eHv///xcVFfLx8SMhIUNCQpSTk/r6+jY0NCknJ97e3ru7u+fn51BOTsPCwqGgoISDg6empmpoaK2srNDQ0FhXV3eXcCcAAAAXdFJOUwCBIZXMGP70BuRH2Ze/LpIMUunHkpQR34sfygAAAVpJREFUOMt1U+magjAMDAVb5BDU3W25b9T1/d9vaYpQKDs/rF9nSNJkArDA9ezQZ8wPbc8FE6eAiQUsOO1o19JolFibKCdHGHC0IJezOMD5snx/yE+KOYYr42fPSufSZyazqDoseTPw4lGJNOu6LBXVUPBG3lqYAOv/5ZwnNUfUifzBt8gkgfgINmjxOpgqUA147QWNaocLniqq3QsSVbQHNp45N/BAwoYQz9oUJEiE4GMGfoBSMj5gjeWRIMMqleD/CAzUHFqTLyjOA5zjNnwa4UCEZ2YK3khEcBXHjVBtEFeIZ6+NxYbPqWp1DLKV42t6Ujn2ydyiPi9nX0TTNAkVVZ/gozsl6FbrktkwaVvL2TRK0C8Ca7Hck7f5OBT6FFbLATkL2ugV0tm0RLM9fedDvhWstl8Wp9AFDjFX7yOY/lJrv8AkYuz7fuP8dv9izCYH+x3/LBnj9fYPBTpJDNzX+7cAAAAASUVORK5CYII=
// @license      GPLv3
// @author       DanicaStar ch3rry
// @match        *://github.com/search*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        unsafeWindow
// @run-at       document-end
// @downloadURL https://update.greasyfork.org/scripts/473912/Github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96.user.js
// @updateURL https://update.greasyfork.org/scripts/473912/Github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96.meta.js
// ==/UserScript==
(function (){
    "use strict" // 严格模式
    let ban = ['cirosantilli', 'wumaoland', 'codin-stuffs', 'cheezcharmer', 'gege-circle', 'zhaohmng-outlook-com', 'zaohmeing', 'Daravai1234', 'candice531033938', 'jk-ice-cream', 'jk-ice-cream-250', 'sky8964', 'pxvr-official', 'zpc1314521', 'jjzhang166', 'panbinibn', 'programthink', 'hello-world-1989', 'b0LBwZ7r5HOeh6CBMuQIhVu3-s-random-fork', 'thethetpvmy', 'wwwswitch520cc', 'shotoanqrob', 'sitempeanhkkwg', 'fukeluo', '1206256980', 'curees', 'yuoppo', 'Createree', 'vghl', 'wholedata', 'dunjian', 'mksshare', 'abshare', 'tpxdat', 'jhdyg', 'changfengqj', 'Dujltqzv', 'xmq1024', 'golade', 'kdjfhd', 'dkjhy', 'junsolg', 'dkjiiu', 'faithhow', 'yamtioy', 'zugzuc', 'lusvont', 'kenyatas', 'koeheu', 'juttama', 'duspub', 'wuqdid', 'visxud', 'suyfic', 'qokkod', 'roepuo', 'purfob', 'gitprocode', 'ynwynw', 'hanguodianying', 'hgyw', '69sm', 'urlapp', 'Augensternhx', 'urlweb', 'fuliso', 'nishjd', '36dshipin', 'hapump', 'zhguoxmw', 'KoreanMovies', 'hanjutv', 'mamadepengyou', 'mamatouyunmuxuan', 'erzideqizi', 'wodeqizidejiejie', 'xiaoyizidemeng', 'qingyuzongheng', 'jiangnanerxi', 'hanguobiaomei', 'djhgy', 'XXOOBY', 'baoyu1024', 'kk234kkkk', '15923-ORIX', 'wutaed', 'webzhibo', 'apptuijian', 'follow666', 'yu90892', 'aconteet', 'getmal', 'itxinfei', 'mingtiana', 'midoushipin', 'paofushipin', 'yinghanshipin', 'GTVapp', 'huangyouquan', 'devlookme', 'audwq', 'jhdgy', 'di6gandh', 'shuangyuzhibo', 'lvchazhibo', 'xiaolanshipin', 'bofangqi', 'yingtaoshipin', 'xiangfeizhibo', 'lvchaApp', 'luoshenzhibo', 'yaojizhibo', 'mudanzhibo', 'aiaizhibo', 'gaochaoqwe', 'jiolde', 'lsdhw', 'kanavdaohang', 'harnh', 'kuadaner', 'wapquan', 'laoyeer', 'reteres', 'haoersn', 'zhengjianzhong0107', 'huaaweiCode', 'jianjian00001', 'm2ak-dev', 'yyzwz', 'froginwe11', 'luanmenglei', 'xijinping0', 'cyqqq', 'qldaisd', 'lTbgykio', 'yao270161651', 'jt0008jt0008', '15625103741', 'sky1234566778', 'chfucao', 'chifuyidaocao', 'updrmeltm', 'alice548', 'yazm000', 'cpnorg', 'tffygbu', 'Liberty-China', '1989CCP', 'liulihaocai', 'RevolutionaryCommitteeCPC', 'LeiyanLu', 'webdao', 'GC4WP', 'tu01', 'ziliao1', 'zzs70', 'ff2017', 'guitu2017', 'tu2017', 'wm001', 'wnel2017', 'dunhlino', 'nelaliox', 'jianjian3219', 'giteecode', '666bears', 'wang-buer', 'id681ilyg316', 'uhjid', 'usdui', 'uhskl', 'uyjks', 'uhskldf', 'itgsi5', 'uifskv', 'uhgask', 'igfkld', 'udsjd', 'ufodk', 'uigsjt', 'ighfrs', 'haivs', 'idrkkld', 'yuisju', 'uldydj', 'uyuek', 'tydfj', 'uuedif', 'ykwsw3', 'uigsi7', 'tyiis', 'ykeik', 'ukvdj', 'uyikl', 'ufzekg', 'yiksure', 'rhksgz', 'rthls', 'rhjaw', 'rehlxs', 'thzsgt', 'tdidst', 'eglct', 'tjkdyu', 'tjlks', 'tjjds', 'rllfs', 'rhkstd', 'yjscdr', 'servisee', 'ufsjzf', 'bvnbvnfgd', 'duliyingshi', 'calendi', 'mayeobey', 'QQMusic-Jay-Chou', 'boylovecomic', 'bt9527', 'FarmerChina', 'Waymon102092', 'baofx', 'biehd', 'moonpas', 'lyqilo', 'liliqh', 'hourv', 'xinfue', 'jijidianying', 'YuyanCai', 'jtdh', 'isdkxr', 'yhildyu', 'ykldyld', 'igsigk', 'uidekj', 'iufskw', 'udsjhf', 'tjkdx', 'rtkist', 'tjlsyh', 'euhf', 'rjzsht', 'rhkdzu', 'ehkkld', 'xzgfsw', 'iofgd', 'yufdk', 'ujkdub', 'iofgdsk', 'dyghikg', 'ugdskf', 'ifwaih', 'oigsiu', 'yjksku', 'yfdkkrf', 'thjsqd', 'yjsyhf', 'ydjsu6', 'igseyf', 'ujudy8', 'tykde', 'ykmdi8', 'yklzrf', 'uijdkd', 'yjkshc', 'tkajc', 'ykdzs', 'jklsx', 'ejldux', 'ifxspo', 'ogsvtf', 'ifdeu', 'yudfdi', 'ofssj', 'igegkx', 'ugfkd', 'ugdsk', 'udskts', 'yjlkdss', 'fkdryl', 'rtuyjsr', 'tus56f', 'yjdsd', 'yuet6h', 'ugtw', 'tlkxt', 'yesrs', 'ykkds', 'yjksu', 'yhyshs', 'xdzfby', 'yujzdh', 'znfl', 'kjiud', 'shijuezhishi', 'hy1980boy', 'ww0304', 'ZXCASD854', 'zfpdh', 'batiyadh', 'yinsedh', 'yyfxz', 'bllpooe', 'joodfer', 'qdmang', 'chaenet', 'mzsyv', 'kzhaoes', 'clnnews', 'kendnes', 'hongnews', 'luokez', 'li721-LY', 'itunsr', 'cctnews', 'htmle', 'xmmj2', 'younownews', '445435213', 'seseClub', 'enewse', 'wsnewse', 'qsnews', 'soasmoughroy', 'adminewhat', 'wsermusic', 'molingfer', 'zhihues', '95movies', '99fuli', 'qnewse', 'tareres', 'hukioip', 'Hochoclate713', 'ervnme', 'greenleaf8888', '93-days', 'doubanm', 'xhydh', 'fvckslvt', 'MDCM-FB', 'b08240', 'm3u8-ekvod', 'huan768468', 'SweeOBC', 'ningmengsuan7788', 'supperqb', 'idskjs', 'ifsird', 'gklksr', 'ifsjxr', 'ifskxt', 'ghjklsd', 'udsskd', 'tgsjk', 'ihgsk', 'ujsjk', 'ijhdf', 'fghhgks', 'udfae4', 'jujwdj', 'ydsdk', 'uyfgsj', 'ykkxrd', 'branono', 'hytcd', 'kjiuo', 'SaolApp', 'lourv', 'uisdlk', 'hutuhai', 'dengminna', 'whmnoe4j', 'txy9704', 'ufsjl', 'udsks', 'uifsjk', 'ygsaj', 'udsts', 'yurdek', 'ghklsr', 'ifsnx', 'ufskd', 'yujst6', 'ifsurjn', 'saoyagma', 'yusyrdk', 'uijhgr', 'geeeeeeeek', 'gfjklk', 'uiskv', 'ccccsp', 'rrrsp', 'udjxs', 'qiezisp', 'egklkd', 't6korf', 'line915577', 'haijv', 'huaxinzhibo', 'haijiaofabuye', 'haijiaoshequ', 'HaijiaoCommunity', 'haijiao-app', 'fulibaike', 'lurmarp', 'entvasa', 'gotwib', 'hghkiiy121', 'gubcem', 'uijssu', 'yjhuk', 'yklsd', 'haijiaoWeb', 'winston779', 'tyukkst', 'ujsnmc', 'ygssk', 'igdkdy', 'qiezishiping', 'kjuhd', 'xiaogongzhuAPP', 'babyzhibo', 'yaojingzhibo', 'balizhibo', 'jiuaizhibo', 'liuyuezhibo', '69live', 'asidw', 'kuaimaoVIP', 'siguaha', 'mizhizhibo', 'lihzd', 'caomeizhibo', '36DAPP', 'luolisheApp', '69zhibo', 'jiejiezhibo', 'k8japan', 'buyaoshan', 'dk111222', 'fanbaovpn', 'HGcrowntiyu', '196tiyu', 'parryno', 'boyiscode', 'moonews', 'kim1528', 'tjqJ62cESiHPj6DdR6vXDAcPp', 'code-help-tutor', 'turbocanary'];
    let isKeepDiv = GM_getValue("isKeepDiv", false); // 是否保留屏蔽项目Div的框，，默认为false
    let isPrecise = GM_getValue("isPrecise", false); // 是否精确匹配，默认为false
    let detectMode = GM_getValue("detectMode", "mutationobserver"); // 检测模式，默认为mutationobserver
    let detectDelay = GM_getValue("detectDelay", 100); // 每次检测循环间隔的时间，单位为毫秒，默认为100毫秒
    let allowAnnouncement = GM_getValue("allowAnnouncement", true); // 是否显示“正在使用非最佳配置”提示，默认为true


    // 开启设置页面函数
    function openMenu() {
        // 检测是否已经开启设置页面
        if (document.getElementsByClassName("settings").length == 0) {
            let settingMenu = document.createElement("div");
            settingMenu.className = "settings";
            settingMenu.innerHTML = `
                <h2><span>Github搜索净化 v</span><span id="scriptVersion"></span></h2>
                <a href="https://github.com/BonjourFeng/Github-Search-Purification" target="_blank"><div class="badge1"></div></a>
                <a href="https://greasyfork.org/zh-CN/scripts/473912-github%E6%90%9C%E7%B4%A2%E5%87%80%E5%8C%96" target="_blank"><div class="badge2"></div></a>
                <br>
                <span class="userLoadNum">已加载屏蔽用户数量：加载中...</span>
                <hr>
                <div class="settings-block"><span>是否保留屏蔽项目Div的框：</span><label class="settings-switch"><input type="checkbox"
                            id="isKeepDiv"><span class="slider round"></span></label></div>
                <div class="settings-block"><span>是否精确匹配：</span><label class="settings-switch"><input type="checkbox"
                            id="isPrecise"><span class="slider round"></span></label></div>
                <div class="settings-block"><span>是否显示“正在使用非最佳配置”提示(推荐开启以防止错过新功能)：</span><label class="settings-switch"><input
                            type="checkbox" id="allowAnnouncement"><span class="slider round"></span></label></div>
                <div class="settings-block"><span>检测模式：</span><input type="radio" name="detectMode" class="settings-radio">
                    MutationObserver(推荐) <input type="radio" name="detectMode" class="settings-radio"> Loop <input type="radio"
                        name="detectMode" class="settings-radio"> eventListener </div>
                <div class="settings-block"><span>(Loop模式)每次检测循环间隔的时间 (毫秒) ：</span><input type="number" class="settings-input">
                </div><button id="help" onclick="showHelp()">帮助</button><button id="save">保存</button><button id="cancel">取消</button>
                <div class="help-div" hidden>
                    <hr>
                    <p>1. 是否保留屏蔽项目Div的框：若选择保留，被屏蔽的仓库会显示一个包含信息"⛔该仓库被脚本屏蔽"的框；若选择不保留，会直接在搜索结果中删除被屏蔽仓库。</p>
                    <p>2. 是否精确匹配：若精确匹配，则只会屏蔽屏蔽词内仓库所有者的仓库；若不精确匹配，则任何innerText包含屏蔽词的仓库都会被屏蔽（.include），可能会有误杀情况。</p>
                    <p>3. 是否显示“正在使用非最佳配置”提示：若选择显示，则在用户使用功能非最佳配置时在Github搜索界面顶部添加通告栏，以提醒用户升级后及时使用新功能。</p>
                    <p>4. 检测模式：共有三种模式——MutationObserver、Loop和eventListener：</p>
                    <table border="1">
                        <tr>
                            <td>检测方法</td>
                            <td>检测方式</td>
                            <td>性能开销</td>
                            <td>检测不及时情况</td>
                        </tr>
                        <tr>
                            <td>MutationObserver(推荐)</td>
                            <td>检测页面元素变动</td>
                            <td>较小</td>
                            <td>未发现</td>
                        </tr>
                        <tr>
                            <td>Loop</td>
                            <td>循环检测</td>
                            <td>较大</td>
                            <td>不可能发生</td>
                        </tr>
                        <tr>
                            <td>eventListener</td>
                            <td>检测pushState事件</td>
                            <td>很小</td>
                            <td>特定情境下发生</td>
                        </tr>
                    </table>
                    <p>5. 每次检测循环间隔的时间，单位为毫秒(1000秒 = 1秒)，可根据自身设备性能调整，默认为100毫秒。</p>
                </div>
            `;
            document.body.appendChild(settingMenu);

            // 更新设置页面

            document.getElementById("scriptVersion").innerText = GM_info.script.version;
            document.getElementsByClassName("userLoadNum")[0].innerText = "已加载屏蔽用户数量：" + ban.length;
            isKeepDiv ? document.getElementById("isKeepDiv").checked = true : document.getElementById("isKeepDiv").checked = false;
            isPrecise ? document.getElementById("isPrecise").checked = true : document.getElementById("isPrecise").checked = false;
            allowAnnouncement ? document.getElementById("allowAnnouncement").checked = true : document.getElementById("allowAnnouncement").checked = false;
            switch(detectMode){
                case "mutationobserver": document.getElementsByClassName("settings-radio")[0].checked = true;break;
                case "loop": document.getElementsByClassName("settings-radio")[1].checked = true;break;
                case "eventListen": document.getElementsByClassName("settings-radio")[2].checked = true;break;
            }
            let mode = document.getElementsByClassName("settings-radio");
            document.getElementsByClassName("settings-input")[0].value = detectDelay;

            // 背景模糊效果
            backgroungBlur();

            // 添加按钮事件——帮助
            document.getElementById("help").onclick = function() {
                let settingsWindow = document.getElementsByClassName("settings")[0];
                let helpDiv = document.getElementsByClassName('help-div')[0];
                if (helpDiv.hidden) {
                    settingsWindow.style.height = '830px';
                    helpDiv.hidden = false;
                }
                else {
                    settingsWindow.style.height = '440px';
                    helpDiv.hidden = true;
                }
            };

            // 添加按钮事件——保存
            document.getElementById("save").onclick = function() {
                document.getElementById("isKeepDiv").checked == true ? GM_setValue("isKeepDiv", true) : GM_setValue("isKeepDiv", false);
                document.getElementById("isPrecise").checked == true ? GM_setValue("isPrecise", true) : GM_setValue("isPrecise", false);
                document.getElementById("allowAnnouncement").checked == true ? GM_setValue("allowAnnouncement", true) : GM_setValue("allowAnnouncement", false);
                if (document.getElementsByClassName("settings-radio")[0].checked == true) {GM_setValue("detectMode", "mutationobserver");}
                else if (document.getElementsByClassName("settings-radio")[1].checked == true) {GM_setValue("detectMode", "loop");}
                else if (document.getElementsByClassName("settings-radio")[2].checked == true) {GM_setValue("detectMode", "eventListen");}
                let newdelayTime = parseInt(document.getElementsByClassName("settings-input")[0].value);
                if (newdelayTime > 0 && newdelayTime < 10000) {GM_setValue("detectDelay", newdelayTime);}
                else {alert("输入的delayTime有误，保存失败");}
                closeMenu();
                location.reload();
            }

            // 添加按钮事件——取消
            document.getElementById("cancel").onclick = function() {
                closeMenu();
            };
        }
    }


    // 关闭设置页面函数
    function closeMenu() {
        let github_area = document.getElementsByClassName("env-production page-responsive")[1];
        let settingsWindow = document.getElementsByClassName("settings")[0];
        settingsWindow.style.opacity = 0;
        setInterval(()=>{settingsWindow.remove()}, 200);
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
        } catch(err) {
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
    function () {
        if (confirm("是否重置脚本设置？") == true) {
            GM_setValue("isKeepDiv", false);
            GM_setValue("isPrecise", false);
            GM_setValue("detectMode", "mutationobserver");
            GM_setValue("detectDelay", 100);
            GM_setValue("allowAnnouncement", true);
            location.reload();
        }
    });


    //*********************************
    //*                               *
    //*          屏蔽处理代码         *
    //*                               *
    //*********************************
    // 屏蔽执行
    function clean() {
        if (document.querySelector("div[data-testid='results-list']") !== null) {
            let search_list = document.querySelector("div[data-testid='results-list']").childNodes;
            for (let i = 0; i < search_list.length; i++) {
                if (isBan(search_list[i], isPrecise)) {
                    if (isKeepDiv) {
                        search_list[i].firstChild.remove();
                        search_list[i].append("⛔该仓库被脚本屏蔽");
                    }
                    else {
                        search_list[i].remove();
                    }
                }
            }
        }
    };
    
    
    // 判断是否屏蔽
    function isBan(target ,isPrecise) {
        if (isPrecise) {
            if (target.getElementsByTagName("a").length !== 0) {
                let repositoryName = target.getElementsByTagName("a")[0].innerText;
                let userName = repositoryName.split("/")[0];
                for (let j = 0; j < ban.length; j++) {
                    if (userName == ban[j]) {
                        return true;
                    }
                }
                return false;
            }
            else {return false;}
        }
        else {
            for (let j = 0; j < ban.length; j++) {
                if (target.innerText.includes(ban[j])) {
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
        setInterval(function(){
            clean();
        },detectDelay);
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
    let _wr = function(type) {
        let orig = history[type];
        return function() {
            let rv = orig.apply(this, arguments);
            let e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        }
    }
    
    function cleanByEventListener() {
        console.log("Running:EventListener");
        setTimeout(() => {clean()}, 1000);
        clean();
        // 重写方法
        history.pushState = _wr('pushState');
        //监听
        window.addEventListener('pushState', function(e) {
            pageChange(location.href);
        })
    }
    
    //*********************************
    //*                               *
    //*              入口             *
    //*                               *
    //*********************************

    // 添加脚本设置界面CSS
    GM_addStyle(`
        div.settings {
            transition: 0.2s;
            position: fixed;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            text-align: center;
            font-size: large;
            height: 440px;
            width: 660px;
            left: 50%;
            top: 50%;
            padding: 0px 20px;
            transform: translate(-50%, -50%);
            background-color: aliceblue;
            border: solid lightgray 1px;
            border-radius: 8px;
        }

        div.settings hr {
            margin: 10px;
        }

        div.settings h2 {
            margin: 20px 0px 0px 0px;
        }

        div.settings span#load {
            font-size: small;
        }

        div.settings .settings-block {
            padding: 10px 0px;
        }

        div.settings hr {
            background-color: lightgray;
            height: 1px;
            border: none;
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
        }

        div.settings .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: lightgray;
            -webkit-transition: .2s;
            transition: .2s;
            border: solid lightgray 1px;
        }

        div.settings .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 1.1px;
            bottom: 1.3px;
            background-color: white;
            -webkit-transition: .2s;
            transition: .2s;
        }

        div.settings input:checked+.slider {
            background-color: #2196F3;
        }

        div.settings input:focus+.slider {
            box-shadow: 0 0 1px #2196F3;
        }

        div.settings input:checked+.slider:before {
            -webkit-transform: translateX(17.2px);
            -ms-transform: translateX(17.2x);
            transform: translateX(17.2px);
        }

        div.settings .slider.round {
            border-radius: 40px;
        }

        div.settings .slider.round:before {
            border-radius: 50%;
        }

        div.settings input.settings-switch {
            opacity: 0;
            width: 50px;
            height: 0;
        }

        div.settings .slider:hover {
            border: solid #4096ff 1px;
        }

        div.settings input.settings-radio {
            transition: 0.2s;
            zoom: 1.2;
        }

        div.settings button {
            transition: 0.2s;
            height: 30px;
            width: 80px;
            margin: 5px;
            background-color: white;
            border: solid lightgray 1px;
            border-radius: 8px;
        }

        div.settings button:hover {
            transition: 0.2s;
            color: #4096ff;
            border: solid #4096ff 1px;
        }

        div.settings input.settings-input {
            transition: 0.2s;
            height: 25px;
            width: 70px;
            margin: 5px;
            background-color: white;
            border: solid lightgray 1px;
            border-radius: 8px;
            padding: 0px 10px;
        }

        div.settings input.settings-input:hover {
            transition: 0.2s;
            color: #4096ff;
            border: solid #4096ff 1px;
            border-radius: 8px;
        }

        div.settings input.settings-input:focus {
            outline: none;
            border: solid #4096ff 1px;
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            height: auto;
            -webkit-appearance: none;
        }

        div.settings div.help-div {
            text-align: left;
            font-size: medium;
        }

        div.settings div.help-div p {
            margin: 10px 0px;
        }

        div.settings table {
            text-align: center;
        }

        div.settings .help-div table tbody tr td{
            padding: 0px 10px;
        }

        /* 深色模式支持 */
        @media screen and (prefers-color-scheme: dark) {
            div.settings {
                color: #e6edf3;
                border-color: #30363d;
                background-color: #0d1118;
            }

            div.settings button {
                color: #e6edf3;
                border-color: #30363d;
                background: none;
            }

            div.settings hr {
                color: #8a8b8b;
            }

            div.settings div.settings-block input {
                color: #e6edf3;
                border-color: #30363d;
                background: none;
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
        
    `);

    console.log("====================\n脚本：" + GM_info.script.name + " 开始执行\n作者：" + GM_info.script.author + " 版本：" + GM_info.script.version + "\n脚本地址：https://greasyfork.org/zh-CN/scripts/473912-github搜索净化\n====================\n【脚本配置】\nisKeepDiv: " + isKeepDiv + "\nisPrecise: " + isPrecise + "\ndetectMode: " + detectMode + "\ndetectDelay: " + detectDelay + "\nallowAnnouncement: " + allowAnnouncement + "\n====================");
    // 显示提示
    if (detectMode !== "mutationobserver" && allowAnnouncement) {
        let jsAnnouncement = document.body.insertBefore(document.createElement("p"), document.body.firstChild);
        jsAnnouncement.style.cssText = 'background: linear-gradient(to right, rgb(0, 121, 145), rgb(120, 255, 214)); text-align: center; margin: 0px; padding: 5px; color: white; font-weight: bold;';
        jsAnnouncement.innerHTML = "来自Github搜索净化脚本的提示：脚本更新了一些功能，您可能正在使用非最佳配置，抽空来脚本设置页面看看吧🥳";
    }

    switch (detectMode) {
        case "mutationobserver": cleanByMutationObserver();break;
        case "loop": cleanByLoop();break;
        case "eventListen": cleanByEventListener();break;
    }

})()