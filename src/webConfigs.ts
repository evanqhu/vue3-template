// 网站配置

const defaultConfig = {
  appTitle: "Template Web",
  appEmail: "templateweb.support@gmail.com",
  appUrl: "templateweb.com",
  appLogo: "template",
  aboutUs: `The aboutUs of template web.`,
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  },
  adSense: {
    client: "ca-google",
    ads: "template ads",
    home_1: {
      class: "adsbygoogle",
      style: "display:block",
      "data-ad-client": "ca-pub-8158555231596181",
      "data-ad-slot": "1468595611",
      "data-ad-format": "auto",
      "data-full-width-responsive": "true"
    },
    home_2: {
      class: "adsbygoogle",
      style: "display:block",
      "data-ad-client": "ca-pub-8158555231596181",
      "data-ad-slot": "9290411161",
      "data-ad-format": "auto",
      "data-full-width-responsive": "true"
    }
  }
}

export type WebConfig = typeof defaultConfig

export default {
  localhost: defaultConfig
}
