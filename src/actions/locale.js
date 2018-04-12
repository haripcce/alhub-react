import { LOCALE_SET } from "../types";

export const setLocale = lang => dispatch =>{
localStorage.alhubLang = lang;
dispatch(localeSet(lang));
}

export const localeSet = (lang) => (
    {
        type:LOCALE_SET,
        lang
    }
)
