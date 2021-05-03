// ==UserScript==
// @name        da的暴力猴脚本
// @namespace   ViolentMonkey Scripts
// @match       *://tieba.baidu.com/*
// @match       *://*.csdn.net/*
// @match       *://*.zhihu.com/*
// @grant       none
// @version     1.0
// @author      da
// @description 百度贴吧登录屏蔽, CSDN 登录屏蔽
// ==/UserScript==


(function () {

    const interval = 50;

    /// 百度贴吧登录屏蔽
    function baiduBBSHideLogin() {
        if (document.location.host !== "tieba.baidu.com") {
            return;
        }
        setInterval(function () {
            let e = document.querySelector("span[class='close-btn']");
            if (e) {
                e.click();
            }
        }, interval);
    }

    /// CSDN 登录屏蔽
    function csdnHideLogin() {
        if (document.location.host.endsWith("csdn.net") === false) {
            return;
        }
        setInterval(function () {
            document.querySelector("#passportbox > span").click();
        }, interval);
    }

    /// 知乎重新定向
    function zhihuAutoRedirect() {
        if (location.host === 'link.zhihu.com') {
            let regRet = location.search.match(/target=(.+?)(&|$)/);
            if (regRet && regRet.length === 3) {
                location.href = decodeURIComponent(regRet[1]);
            }
            return;
        }

        window.addEventListener('click', function (e) {
            let dom       = e.target,
                max_times = 5;
            while (dom && max_times--) {
                if (dom.nodeName.toUpperCase() === 'A') {
                    let regRet = dom.search.match(/target=(.+?)(&|$)/);
                    if (regRet && regRet.length === 3) {
                        dom.href = decodeURIComponent(regRet[1]);
                    }
                    return;
                } else {
                    dom = dom.parentNode;
                }
            }
        });
    }

    baiduBBSHideLogin();
    csdnHideLogin();
    zhihuAutoRedirect();
})();

