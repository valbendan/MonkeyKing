// ==UserScript==
// @name        暴力猴脚本
// @namespace   ViolentMonkey Scripts
// @match       *://tieba.baidu.com/*
// @match       *://*.csdn.net/*
// @grant       none
// @version     1.0
// @author      da
// @description 百度贴吧登录屏蔽
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

    baiduBBSHideLogin();
    csdnHideLogin();
})();

