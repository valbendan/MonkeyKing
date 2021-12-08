// ==UserScript==
// @name        da的暴力猴脚本 on document end
// @name:zh-CN  da的暴力猴脚本 on document end
// @namespace   https://github.com/valbendan/MonkeyKing
// @match       *://tieba.baidu.com/*
// @match       *://*.zhihu.com/*
// @match       *://*.jianshu.com/*
// @match       *://github.com/*
// @match       *://stackoverflow.com/*
// @match       *://superuser.com/*
// @match       *://*.stackexchange.com/*
// @match       https://serverfault.com/*
// @match       https://askubuntu.com/*
// @match       *://*.csdn.net/*
// @run-at      document-end
// @grant       none
// @version     1.0
// @author      da
// @downloadURL https://cdn.jsdelivr.net/gh/valbendan/MonkeyKing@main/end.js
// @supportURL  https://github.com/valbendan/MonkeyKing/issues
// @homepageURL https://github.com/valbendan/MonkeyKing
// @description 百度贴吧登录屏蔽, CSDN 登录屏蔽, 知乎自动重定向，开源中国，维基百科自动重定向
// ==/UserScript==

// violent monkey metadata docs
// https://violentmonkey.github.io/api/metadata-block/

(function () {

    class Helper {
        /**
         * 检查 是否以 host 结束
         * @param {string} host
         * @return boolean
         */
        static hostEndWith(host) {
            return location.host.endsWith(host);
        }

        /**
         * 点击 css selector 选择的元素
         *
         * 仅仅需要点击一次
         *
         * @param {string} selector
         */
        static onceClickOnSelector(selector) {
            const interval = setInterval(() => {
                /**
                 * @type {HTMLButtonElement}
                 */
                const btn = document.querySelector(selector);
                if (btn) {
                    console.info("click on:", btn);
                    btn.click();
                    clearInterval(interval);
                }
            }, 50);
        }
    }


    /// 百度贴吧登录屏蔽
    function baiduBBSHideLogin() {
        if (document.location.host !== "tieba.baidu.com") {
            return;
        }
        Helper.onceClickOnSelector("span[class='close-btn']");
    }

    /// CSDN 登录屏蔽
    function csdnHideLogin() {
        if (Helper.hostEndWith("csdn.net") === false) {
            return;
        }
        Helper.onceClickOnSelector("#passportbox > span");
    }


    function zhihuAutoClose() {
        if (Helper.hostEndWith("zhihu.com")) {
            Helper.onceClickOnSelector(".Modal-closeButton");
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
        if (Helper.hostEndWith("jianshu.com")) {
            Helper.onceClickOnSelector(".anticon-close");
        }
    }

    function jianshuAutoRedirect() {
        if (Helper.hostEndWith("jianshu.com") === false) {
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
        if (Helper.hostEndWith("jianshu.com")) {
            [...document.querySelectorAll('a')].map((a) => {
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
        if (!Helper.hostEndWith("github.com")) {
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

    /**
     * stackoverflow helper
     */
    function stackoverflow() {
        Helper.onceClickOnSelector(".js-accept-cookies");
        Helper.onceClickOnSelector(".js-dismiss");
    }


    baiduBBSHideLogin();
    csdnHideLogin();
    zhihuAutoClose();
    zhihuAutoRedirect();
    jianshuAutoClose();
    jianshuAutoRedirect();
    jianshuAutoConvertUrl();
    githubInSourceGraph();
    stackoverflow();
})();

