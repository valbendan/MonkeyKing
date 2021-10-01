// ==UserScript==
// @name        da的暴力猴脚本 on start
// @name:zh-CN  da的暴力猴脚本 on start
// @namespace   https://github.com/valbendan/MonkeyKing
// @match       *://zh.wikisource.org/*
// @match       *://zh.wikipedia.org/*
// @run-at      document-start
// @grant       none
// @version     1.0
// @author      da
// @downloadURL https://cdn.jsdelivr.net/gh/valbendan/MonkeyKing@main/us.js
// @supportURL  https://github.com/valbendan/MonkeyKing/issues
// @homepageURL https://github.com/valbendan/MonkeyKing
// @description 维基百科自动重定向
// ==/UserScript==

// violent monkey metadata docs
// https://violentmonkey.github.io/api/metadata-block/

(function () {


    function wikipediaAutoRedirect() {
        const url = new URL(document.location.href);

        if (url.host === 'zh.wikisource.org' && url.pathname.startsWith("/wiki")) {
            const parts = url.pathname.split("/");
            parts[1] = "zh-hans";
            document.location.href = parts.join("/");
        }

        if (url.host === 'zh.wikipedia.org' && url.pathname.startsWith("/wiki")) {
            const parts = url.pathname.split("/");
            parts[1] = "zh-cn";
            document.location.href = parts.join("/");
        }
    }


    wikipediaAutoRedirect();
})();
