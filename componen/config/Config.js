
import LocalizedStrings from "react-localization";

import en from "./Localization/en";
import zhCN from "./Localization/zh-CN";

export const Strings = new LocalizedStrings({
    en: en,
    "zh-CN": zhCN,
});

if (localStorage.getItem("language")) {
    Strings.setLanguage(localStorage.getItem("language"));
}

export const setLocalStorage = (newObj, userRelated) => {
    let cacheID = "LocalConfig";
    if (userRelated && localStorage.getItem("name")) {
        cacheID = `${localStorage.getItem("name").replace(" ", "")}_${cacheID}`;
    } else {
        return;
    }

    let cacheProductInfo = localStorage.getItem(cacheID);
    if (!cacheProductInfo) {
        cacheProductInfo = {};
    } else {
        cacheProductInfo = JSON.parse(cacheProductInfo);
        if (!cacheProductInfo) {
            cacheProductInfo = {};
        }
    }

    if (!newObj) {
        localStorage.removeItem(cacheID);
    } else {
        Object.assign(cacheProductInfo, newObj);
        localStorage.setItem(cacheID, JSON.stringify(cacheProductInfo));
    }
};

export const removeLocalStorage = (key, userRelated) => {
    if (!key || key.length === 0) return null;

    let cacheID = "LocalConfig";
    if (userRelated && localStorage.getItem("name")) {
        cacheID = `${localStorage.getItem("name").replace(" ", "")}_${cacheID}`;
    } else {
        return null;
    }

    let cacheProductInfo = localStorage.getItem(cacheID);
    if (cacheProductInfo) {
        cacheProductInfo = JSON.parse(cacheProductInfo);
        if (cacheProductInfo) {
            delete cacheProductInfo[key];
            localStorage.setItem(cacheID, JSON.stringify(cacheProductInfo));
        }
    }
};

export const getLocalStorage = (key, userRelated) => {
    if (!key || key.length === 0) return null;

    let cacheID = "LocalConfig";
    if (userRelated && localStorage.getItem("name")) {
        cacheID = `${localStorage.getItem("name").replace(" ", "")}_${cacheID}`;
    } else {
        return null;
    }

    let cacheProductInfo = localStorage.getItem(cacheID);
    if (cacheProductInfo) {
        cacheProductInfo = JSON.parse(cacheProductInfo);
        if (cacheProductInfo) {
            return cacheProductInfo[key];
        }
    }

    return null;
};


const setLanguage = lan => {
    localStorage.setItem("language", lan);
    Strings.setLanguage(lan);
    window.location.reload(false);
};

export default {
    Strings,
    setLanguage: setLanguage,
    getLocalStorage: getLocalStorage,
    setLocalStorage: setLocalStorage,
    removeLocalStorage: removeLocalStorage,
};
