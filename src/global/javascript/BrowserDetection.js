const { default: _default } = require("react-share/lib/FacebookShareCount");

const BrowserDetection = {
  browserDetection: () => {
    let $html = document.querySelector('html');
    let isExplorer = (navigator.userAgent.indexOf('MSIE') || navigator.userAgent.indexOf('rv:15')) > -1
    let isFirefox = navigator.userAgent.indexOf('Firefox') > -1
    let isSafari = navigator.userAgent.indexOf('Safari') > -1
    let isChrome = navigator.userAgent.indexOf('Chrome') > -1
    if (isExplorer || document.documentMode) {
      $html.classList.add('ie')
    }
    if (isFirefox) {
      $html.classList.add('firefox')
    }
    if (isChrome && isSafari) {
      $html.classList.add('chrome')
    }
    if (!isChrome && isSafari) {
      $html.classList.add('safari')
    }
    if (/Edge/.test(navigator.userAgent)) {
      $html.classList.add('edge')
    }
	}
}

export default BrowserDetection