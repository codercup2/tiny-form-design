import { jsxs as i, jsx as s, Fragment as v } from "react/jsx-runtime";
import { useState as k, useEffect as N } from "react";
function d(...e) {
  let n = [];
  return e.forEach((t) => {
    if (!t) return;
    const l = typeof t;
    if (l === "string") {
      n.push(t);
      return;
    }
    if (l === "object") {
      if (Array.isArray(t)) {
        const a = d(...t);
        if (!a) return;
        n.push(a);
        return;
      }
      Object.keys(t).forEach((a) => {
        const r = t[a];
        typeof r == "function" ? r() && n.push(a) : r && n.push(a);
      });
      return;
    }
    if (typeof t == "function") {
      const a = t();
      a && n.push(a);
      return;
    }
    n.push(String(t));
  }), n.join(" ");
}
function f({
  onClick: e,
  children: n,
  type: t = "default",
  loading: l = !1,
  disabled: a = !1,
  fullWidth: r = !1,
  size: c = "basic",
  style: m,
  animate: h = !1,
  className: b
}) {
  const [g, u] = k(!1), p = d("mk-button", `mk-button-${t}`, `${r ? "mk-button-fullWidth" : ""}`, `${a ? `mk-button-disabled-${t} mk-button-disabled` : ""}`, `${g ? "hover" : ""}`, `mk-button-${c}`, `${b || ""}`);
  return /* @__PURE__ */ i(
    "button",
    {
      className: p,
      onClick: () => {
        !a && !l && e && e();
      },
      disabled: a || l,
      style: m,
      onMouseEnter: () => u(!0),
      onMouseLeave: () => u(!1),
      children: [
        h ? /* @__PURE__ */ s("div", { className: "mk-button-animate" }) : null,
        n
      ]
    }
  );
}
function C({ srcSet: e, alt: n = "kucoin.com", sources: t, style: l, className: a }) {
  const r = d("mk-image", `${a || ""}`);
  return /* @__PURE__ */ i("picture", { className: r, style: l, children: [
    t == null ? void 0 : t.map((c) => /* @__PURE__ */ s("source", { media: c == null ? void 0 : c.media, srcSet: c.srcSet }, c.media)),
    /* @__PURE__ */ s("img", { srcSet: e, alt: n, className: "mk-image-default" })
  ] });
}
function o({ children: e, as: n = "span", href: t, className: l, ...a }) {
  const r = d("mk-text", `${l || ""}`), c = n, m = {
    "aria-label": a["aria-label"] || null,
    "aria-labelledby": a["aria-labelledby"] || null
  };
  return /* @__PURE__ */ s(c, { className: r, ...t ? { href: t } : {}, ...m, ...a, children: e });
}
function x({ date: e, format: n = w }) {
  const [t, l] = k(0);
  N(() => {
    const r = setInterval(() => {
      const c = /* @__PURE__ */ new Date(), m = new Date(e).getTime() - c.getTime();
      if (m <= 0) {
        clearInterval(r), l(0);
        return;
      }
      l(m);
    }, 1e3);
    return () => clearInterval(r);
  }, [e]);
  const a = n(t);
  return /* @__PURE__ */ s("div", { className: "mk-time-count-down", children: a.map((r, c) => /* @__PURE__ */ i(v, { children: [
    /* @__PURE__ */ s("div", { className: "mk-time-count-down-txt", children: r < 10 ? `0${r}` : r }),
    c < a.length - 1 && /* @__PURE__ */ s("div", { className: "mk-time-count-down-divider", children: ":" })
  ] })) });
}
const w = (e) => {
  const n = Math.floor(e / 864e5), t = Math.floor(e % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)), l = Math.floor(e % (1e3 * 60 * 60) / (1e3 * 60)), a = Math.floor(e % (1e3 * 60) / 1e3);
  return [n, t, l, a];
};
function y({ title: e, subtitle: n, children: t, endTime: l }) {
  return /* @__PURE__ */ i("section", { className: "mk-card", children: [
    /* @__PURE__ */ i("section", { className: "mk-card-head", children: [
      /* @__PURE__ */ s(o, { as: "h1", className: "mk-card-head-title", children: e }),
      /* @__PURE__ */ s("div", { className: "mk-card-head-divider" }),
      /* @__PURE__ */ i("div", { className: "mk-card-head-right", children: [
        /* @__PURE__ */ s(o, { as: "span", className: "mk-card-head-desc", children: n }),
        l ? /* @__PURE__ */ s(x, { date: l }) : null
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "mk-card-body", children: t })
  ] });
}
const $ = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.9998%204.41405V7.49984C13.9998%208.05212%2013.5521%208.49984%2012.9998%208.49984C9.67403%208.49984%207.56096%209.64782%206.20606%2011.5876C5.17434%2013.0647%204.52879%2015.076%204.21913%2017.5775C5.94625%2015.4116%208.80737%2012.9998%2012.9998%2012.9998C13.5521%2012.9998%2013.9998%2013.4476%2013.9998%2013.9998V17.1799L20.5651%2010.9793L13.9998%204.41405ZM11.9998%202.48268C11.9998%201.41359%2013.2923%200.878193%2014.0483%201.63415L22.4158%2010.0017C22.9737%2010.5595%2022.9607%2011.4678%2022.3872%2012.0095L14.0237%2019.9083C13.2584%2020.631%2011.9998%2020.0885%2011.9998%2019.0358V15.059C7.76971%2015.5657%205.3071%2019.2021%204.3318%2021.0347C4.00484%2021.6491%203.35608%2021.7355%202.95754%2021.6402C2.55652%2021.5444%201.99456%2021.1591%202.01314%2020.4338C2.11623%2016.411%202.82617%2012.9339%204.56642%2010.4424C6.19859%208.1056%208.65214%206.75309%2011.9998%206.53208V2.48268Z'%20fill='%23F3F3F3'/%3e%3c/svg%3e";
function V({
  title: e,
  description: n,
  image: t,
  activeButton: l,
  shareButton: a
}) {
  return /* @__PURE__ */ s(v, { children: /* @__PURE__ */ i("section", { className: "mk-hero-v1 cat-hero", children: [
    /* @__PURE__ */ i("section", { className: "mk-hero-v1-content-box", children: [
      /* @__PURE__ */ s(o, { as: "h1", className: "mk-hero-v1-title", children: e }),
      /* @__PURE__ */ s(o, { className: "mk-hero-v1-desc", children: n }),
      /* @__PURE__ */ i("div", { className: "mk-hero-v1-button-box", children: [
        /* @__PURE__ */ s(f, { type: "primary", size: "large", loading: !0, animate: !0, className: "mk-hero-v1-btn", children: l }),
        /* @__PURE__ */ i(f, { size: "large", className: "mk-hero-v1-btn", children: [
          /* @__PURE__ */ s($, { className: "mk-hero-v1-btn-ico" }),
          " ",
          /* @__PURE__ */ s(o, { className: "mk-hero-v1-btn-txt", children: a })
        ] }),
        /* @__PURE__ */ s("div", { className: "mk-hero-v1-share" })
      ] })
    ] }),
    /* @__PURE__ */ s(C, { srcSet: t, className: "mk-hero-v1-img", alt: "示例图片" })
  ] }) });
}
function j({
  name: e,
  subtitle: n,
  endTime: t,
  title: l,
  content: a
}) {
  return /* @__PURE__ */ s("div", { className: "mk-calendar-v1 cat-image-text", children: /* @__PURE__ */ i(y, { title: e, subtitle: n, endTime: t, children: [
    /* @__PURE__ */ s(o, { as: "h2", className: "mk-calendar-v1-h2", children: l }),
    /* @__PURE__ */ s(o, { as: "span", className: "mk-calendar-v1-text", children: a })
  ] }) });
}
function M(e) {
  N(() => {
    var n;
    document.title = e.title, (n = document.querySelector('meta[name="description"]')) == null || n.setAttribute("content", e.description);
  }, [e.title, e.description]);
}
function F(e) {
  return M(e), /* @__PURE__ */ i("div", { className: "mk-pl-hero-top cat-page-layout", children: [
    e.hero,
    /* @__PURE__ */ s("div", { className: "mk-pl-hero-top_children", children: e.children })
  ] });
}
export {
  j as CalendarV1,
  V as HeroV1,
  F as PlHeroTop
};
