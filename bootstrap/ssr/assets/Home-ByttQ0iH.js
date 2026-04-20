import { Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Home.jsx
/**
* Pages/Home.jsx — временная стартовая страница.
*
* Заменим после утверждения брифа и дизайн-системы.
* Цель сейчас: проверить что SSR и Tailwind 4 работают.
*/
function Home({ siteName = "Отель Летягинъ" }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Главная" }), /* @__PURE__ */ jsx("main", {
		className: "min-h-screen flex items-center justify-center px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-xl text-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "uppercase tracking-[0.2em] text-xs mb-6 text-[color:var(--color-sepia)]",
					children: "фаза\xA01 · скелет"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-5xl md:text-6xl mb-6",
					children: siteName
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-lg opacity-80",
					children: "Каркас развёрнут. Ждём бриф, контент, референсы — и превращаем эту страницу в лицо отеля."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-10 text-sm opacity-60",
					children: /* @__PURE__ */ jsx("a", {
						href: "/admin",
						className: "underline underline-offset-4",
						children: "войти в админку"
					})
				})
			]
		})
	})] });
}
//#endregion
export { Home as default };
