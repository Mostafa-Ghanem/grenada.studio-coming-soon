// Current render language. The builder renders every page once per language;
// templates call L() only where a sentence cannot be translated fragment by fragment.
export const i18n = { lang: "en" };
export const L = (en, ar) => (i18n.lang === "ar" ? ar : en);
