// using with vue-i18n in CDN
/*eslint-disable */
import Vue from 'vue';
const isServer = Vue.prototype.$isServer;

export default function(lang) {
    if (!isServer) {
        if (typeof window.mafe !== 'undefined') {
            if (!('langs' in mafe)) {
                mafe.langs = {};
            }
            mafe.langs[lang.i.locale] = lang;
        }
    }
};