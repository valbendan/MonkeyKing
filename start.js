// ==UserScript==
// @name        da的暴力猴脚本 on document start
// @name:zh-CN  da的暴力猴脚本 on document start
// @namespace   https://github.com/valbendan/MonkeyKing
// @match       *://*.csdn.net/*
// @match       *://*.oschina.net/*
// @match       *://link.juejin.cn/*
// @match       *://zh.wikisource.org/*
// @match       *://zh.wikipedia.org/*
// @run-at      document-start
// @grant       none
// @version     1.1
// @author      da
// @downloadURL https://cdn.jsdelivr.net/gh/valbendan/MonkeyKing@main/start.js
// @supportURL  https://github.com/valbendan/MonkeyKing/issues
// @homepageURL https://github.com/valbendan/MonkeyKing
// @description 维基百科自动重定向
// ==/UserScript==

// violent monkey metadata docs
// https://violentmonkey.github.io/api/metadata-block/

(function () {

    /**
     * 通用自动跳转
     */
    function genericAutoRedirect() {
        const url = new URL(location.href);
        const target = url.searchParams["target"];
        if (!target) {
            return;
        }

        try {
            const v = new URL(target);
            console.info("redirect to:", v);
            location.href = v.href;
        }
        catch (e) {
            console.error("target is not url:", target);
        }
    }

    function oschinaAutoRedirect() {
        if (!location.host.endsWith("oschina.net")) {
            return;
        }

        if (location.pathname.startsWith("/action/GoToLink")) {
            const url = new URL(document.location.href);
            const target_url = url.searchParams.get("url");
            if (target_url) {
                document.location.href = decodeURI(target_url);
            }
        }
    }

    function csdnAutoRedirect() {
        // https://link.csdn.net/?target=http%3A%2F%2Fmiaotixing.com%2F
        if (location.host.startsWith("link.csdn.net")) {
            const url = new URL(document.location.href);
            const target_url = url.searchParams.get("target");
            if (target_url) {
                document.location.href = decodeURI(target_url);
            }
        }
    }


    function wikipediaAutoRedirect() {
        const url = new URL(document.location.href);

        if (url.host === 'zh.wikisource.org' && url.pathname.startsWith("/wiki")) {
            const parts = url.pathname.split("/");
            parts[1] = "zh-hans";
            document.location.href = parts.join("/");
        }

        if (url.host === 'zh.wikipedia.org') {
            const parts = url.pathname.split("/");
            if (['wiki', 'zh'].indexOf(parts[1]) > 0) {
                parts[1] = "zh-cn";
                document.location.href = parts.join("/");
            }
        }
    }

    function juejinAutoRedirect() {
        if (document.location.host.startsWith("link.juejin.cn")) {
            const url = new URL(document.location.href);
            const target = url.searchParams.get("target");
            if (target) {
                document.location.href = target;
            }
        }
    }


    csdnAutoRedirect();
    juejinAutoRedirect();
    oschinaAutoRedirect();
    wikipediaAutoRedirect();
    genericAutoRedirect();
})();
