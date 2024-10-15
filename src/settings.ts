// 项目配置
export const defaultSettings = {
  /** 广告配置 */
  adSense: {
    // 加载 AdSense 脚本的 URL
    scriptUrl:
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3125188477567991",
    // AdSense 广告元信息
    ads: "google.com, pub-3125188477567991, DIRECT, f08c47fec0942fa0",
    // 广告位配置
    home_1: {
      class: "adsbygoogle",
      style: "display:block",
      "data-ad-client": "ca-pub-3125188477567991",
      "data-ad-slot": "9894162380",
      "data-ad-format": "auto",
      "data-full-width-responsive": "true"
    },
    home_2: {
      class: "adsbygoogle",
      style: "display:block",
      "data-ad-client": "ca-pub-3125188477567991",
      "data-ad-slot": "3365837503",
      "data-ad-format": "auto",
      "data-full-width-responsive": "true"
    }
  },
  /** firebase 配置 */
  firebase: {
    apiKey: "AIzaSyBcS3cwlUXpK99s0FiNLcdhiTqTbqa8pRo",
    authDomain: "webs-58a8d.firebaseapp.com",
    projectId: "webs-58a8d",
    storageBucket: "webs-58a8d.appspot.com",
    messagingSenderId: "730684174767",
    appId: "1:730684174767:web:c2116944c8d15fb40c3f5a",
    measurementId: "G-TYZVCBGETW"
  },
  /** 关于我们 */
  aboutUs: "关于我们",
  /** 邮箱 */
  email: "test@gmail.com",
  /** 版权声明 */
  copyright: "Copyright. All Rights Reserved."
}
