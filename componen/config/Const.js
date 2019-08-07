import { Strings } from "./Config";

export const constMusicTestings = {
    Audible: "Audible",
    "Amazon Music": "Amazon Music",
    "iHeartRadio / TuneIn": "iHeartRadio / TuneIn",
    Spotify: "Spotify",
    Pandora: "Pandora",
    "Music Skill Kit": "Music Skill Kit",
};

export const constAlexaMarketZones = {
    US: "USA",
    GB: "UK",
    IE: "Ireland",
    CA: "Canada",
    DE: "Germany",
    AT: "Austria",
    IN: "India",
    JP: "Japan",
    AU: "Australia",
    NZ: "New Zealand",
    FR: "France",
    IT: "Italy",
    ES: "Spain",
    MX: "Mexico",
    CN: "中国",
    RU: "Russia",
    KR: "Korea",
};

export const constVoiceServices = {
    alexa: "Amazon - Alexa",
    xiaowei: "腾讯 - 小薇",
    dingdang: "腾讯 - 叮当",
    tianmao: "阿里 - 天猫精灵",
    dma: "百度 - DMA",
    alice: "Yandex - Alice",
    clova: "Naver - Clova",
    other: "非语音",
};

export const constBusinesses = {
    "limonkey": "林果文 (max.lin@linkplay.com)",
    "liangjun.chen": "陈良君 (liangjun.chen@linkplay.com)",
    "shunyu.wang": "王顺裕 (shunyu.wang@linkplay.com)",
    "chong.lin": "林冲 (chong.lin@linkplay.com)",
    "shuai.zhao": "赵帅 (shuai.zhao@linkplay.com)",
};

export const constProjectType = {
    "wifi": "Wi-Fi",
    "bt": "BT"
};

export const constPMs = {
    "jianjin.wang": "Juliy (jianjin.wang@linkplay.com)",
    "xiaohong.li": "Mandy (xiaohong.li@linkplay.com)",
    "bilian.shan": "单碧连 (bilian.shan@linkplay.com)",
    "lishen.xia": "Ray (lishen.xia@linkplay.com)",
    "yi.li": "Tom (yi.li@linkplay.com)",
    "chuiting.zeng": "Tina (chuiting.zeng@linkplay.com)",
    "shuai.zhao": "赵帅 (shuai.zhao@linkplay.com)",
};

export const constProductCategoriesBT = {
    btspeaker: Strings.PROJECT_NEW_PRODUCT_CATEGORY_BTSPEAKER,
    btearphone: Strings.PROJECT_NEW_PRODUCT_CATEGORY_BTEARPHONE,
    carlighter: Strings.PROJECT_NEW_PRODUCT_CATEGORY_CARLIGHTER,
};
export const constProductCategoriesWifi = {
    wifispeaker: Strings.PROJECT_NEW_WIFISPEAKER,
    wifilight: Strings.PROJECT_NEW_WIFILIGHT
};

export const constAllSoundOutputModes = {
    SingleDIN: "SingleDIN",
    SupportAuxPhone: "Mobile phone Aux",
    SupportAuxDevice: "Device Aux",
    SupportBT: "Bluebooth for cars",
    SupportFM: "Device FM"
};

export const constProductModelsBT = {
    ba1: "ATS2825 - BA1 Module",
    "ba1-onboard": "ATS2825 - Onboard",
    bes2000il: "BES2000IL",
    bes2000iz: "BES2000IZ",
    BK3266: "BK3266"
};

export const constProductModelsWIFI = {
    A28: "A28",
    A31: "A31",
    A98: "A98",
    "A98-12": "A98-12",
    "A98-22": "A98-22",
    A98G: "A98G",
    A98L: "A98L",
    "A98L-12": "A98L-12",
    A98M: "A98M",
    "A98M-12": "A98M-12",
    "A98M-22": "A98M-22",
    "A98ML": "A98ML",
    "A98ML-12": "A98ML-12",
    "A98ML-22": "A98ML-22"
};

export const constSRTriggers = {
    touchinitiated: { title: "Touch-initiated", comment: Strings.PROJECT_VOICE_TRIGGER_TOUCH },
    handsfree: { title: "Hands-free", comment: Strings.PROJECT_VOICE_TRIGGER_HANDSFREE },
    farfield: { title: "Far-field", comment: Strings.PROJECT_VOICE_TRIGGER_FARFIELD },
};

export const constSRTriggersWIFI = {
    touchinitiated: { title: "Touch-initiated", comment: Strings.PROJECT_VOICE_TRIGGER_TOUCH },
    handsfree: { title: "Hands-free", comment: Strings.PROJECT_VOICE_TRIGGER_HANDSFREE },
    farfield: { title: "Far-field", comment: Strings.PROJECT_VOICE_TRIGGER_FARFIELD },
    "3pda": { title: "3PDA", comment: "" },
};


export const allDSPModels = {
    C02: "C02",
    C04: "C04",
    SA2: "SA2",
    "N/A": "N/A"
};

export const allMCU = {
   "AP8048C": "山景AP8048C",
   "AP8064": "山景AP8064",
   "other": "其他",
   "N/A": "N/A",
};
    

export const constAppRequestTypes = {
    appbasic_new: Strings.PROJECT_NEW_APP_BASIC_CUSTOM,
    appbasic_modify: Strings.PROJECT_NEW_APP_BASIC_MODIFY ,
    appsdk: "SDK",
    None: "None"
};

export const constProjectStatus = {
    PrepareForSubmission: "Prepare For Submission",
    WaitingForReview: "Waiting For Review",
    InSalesReview: "In Review",
    InPMReview: "In Review",
    InResearch: "In Research",
    Rejected: "Rejected",
};
