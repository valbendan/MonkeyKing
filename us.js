// ==UserScript==
// @name        da的暴力猴脚本 on document end
// @name:zh-CN  da的暴力猴脚本 on document end
// @namespace   https://github.com/valbendan/MonkeyKing
// @match       *://tieba.baidu.com/*
// @match       *://*.zhihu.com/*
// @match       *://*.jianshu.com/*
// @match       *://github.com/*
// @match       *://zh.wikisource.org/*
// @match       *://zh.wikipedia.org/*
// @grant       none
// @version     1.0
// @author      da
// @downloadURL https://cdn.jsdelivr.net/gh/valbendan/MonkeyKing@main/us.js
// @supportURL  https://github.com/valbendan/MonkeyKing/issues
// @homepageURL https://github.com/valbendan/MonkeyKing
// @description 百度贴吧登录屏蔽, CSDN 登录屏蔽, 知乎自动重定向，开源中国，维基百科自动重定向
// ==/UserScript==

// violent monkey metadata docs
// https://violentmonkey.github.io/api/metadata-block/

(function () {

    const interval = 50;

    /// 百度贴吧登录屏蔽
    function baiduBBSHideLogin() {
        if (document.location.host !== "tieba.baidu.com") {
            return;
        }
        setInterval(() => {
            document.querySelector("span[class='close-btn']")?.click();
        }, interval);
    }

    /// CSDN 登录屏蔽
    function csdnHideLogin() {
        if (document.location.host.endsWith("csdn.net") === false) {
            return;
        }
        setInterval(() => {
            document.querySelector("#passportbox > span")?.click();
        }, interval);
    }


    function zhihuAutoClose() {
        if (document.location.host.endsWith("zhihu.com")) {
            setInterval(() => {
                document.querySelector(".Modal-closeButton")?.click();
            }, interval);
        }
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


    function jianshuAutoClose() {
        if (document.location.host.endsWith("jianshu.com")) {
            setInterval(() => {
                document.querySelector(".anticon-close")?.click();
            }, interval);
        }
    }

    function jianshuAutoRedirect() {
        if (document.location.host.endsWith("jianshu.com") === false) {
            console.log("不是简书");
            return;
        }

        if (document.location.host.startsWith("link.jianshu.com")) {
            const a = new URLSearchParams(document.location.href);
            const url = a.get('t');
            if (url) {
                document.location.href = url;
            }
        }

        if (document.location.pathname.startsWith("/go-wild")) {
            const a = new URLSearchParams(document.location.href);
            const url = a.get('url');
            if (url) {
                document.location.href = url;
            }
        }
    }

    function jianshuAutoConvertUrl() {
        if (location.host.endsWith("jianshu.com")) {
            [...document.querySelectorAll('a')].map(
                (a) => {
                    const url = new URL(a.href);
                    if (url.host === 'link.jianshu.com' && url.searchParams.get('t')) {
                        a.href = url.searchParams.get('t');
                    }
                });
        }
    }


    /**
     * open github repo in source graph
     */
    function githubInSourceGraph() {
        if (!document.location.host.endsWith("github.com")) {
            return;
        }
        console.log("github run");

        const li = document.createElement("li");
        li.innerHTML = `<a href="https://sourcegraph.com/github.com/${document.location.pathname}">SourceGraph打开</a>`;

        const ul = document.querySelector(".pagehead-actions");
        if (ul) {
            ul.appendChild(li);
        } else {
            console.error("github ul is not found");
        }
    }


    baiduBBSHideLogin();
    csdnHideLogin();
    zhihuAutoClose();
    zhihuAutoRedirect();
    jianshuAutoClose();
    jianshuAutoRedirect();
    jianshuAutoConvertUrl();
    githubInSourceGraph();
})();

