(function () {
    const m = function () {
        const r = document.createElement("link").relList;
        if (r && r.supports && r.supports("modulepreload")) return;
        for (const e of document.querySelectorAll('link[rel="modulepreload"]')) c(e);
        new MutationObserver((e) => {
            for (const t of e)
                if (t.type === "childList")
                    for (const o of t.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && c(o);
        }).observe(document, { childList: !0, subtree: !0 });
        function i(e) {
            const t = {};
            return (
                e.integrity && (t.integrity = e.integrity),
                e.referrerpolicy && (t.referrerPolicy = e.referrerpolicy),
                e.crossorigin === "use-credentials"
                    ? (t.credentials = "include")
                    : e.crossorigin === "anonymous"
                      ? (t.credentials = "omit")
                      : (t.credentials = "same-origin"),
                t
            );
        }
        function c(e) {
            if (e.ep) return;
            e.ep = !0;
            const t = i(e);
            fetch(e.href, t);
        }
    };
    m();
    const a = ["hq720", "sddefault", "hqdefault", "mqdefault", "default"];
    function d(n) {
        const r = /youtu\.?be(\.com)?\/(live\/)?(shorts\/|watch\?v=|embed\/)?([^&?\s]+)/,
            i = n.match(r);
        return i ? i[4] : "";
    }
    function f(n) {
        return a.map((r) => `https://i.ytimg.com/vi/${n}/${r}.jpg`);
    }
    const s = document.querySelector(".result"),
        l = document.querySelector(".result__thumbnail");
    function p(n) {
        const r = document.createDocumentFragment();
        f(n).forEach((c, e) => {
            const t = document.createElement("figure"),
                o = document.createElement("img"),
                u = document.createElement("figcaption");
            (o.src = c), (u.innerText = `${a[e]}.jpg`), t.append(o, u), r.append(t);
        }),
            s.style.display !== "block" && (s.style.display = "block"),
            (l.innerHTML = ""),
            l.append(r);
    }
    document.querySelector(".form").addEventListener("submit", (n) => {
        n.preventDefault();
        const r = new FormData(n.target).get("uri");
        !r || p(d(r.toString()));
    });
})();
