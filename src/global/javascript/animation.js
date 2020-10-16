
const animationEle = () =>  {
  let $elems = document.querySelectorAll('.animation')
  let winH = window.innerHeight
  let winW = window.innerWidth
  let offset = .85
  if (winW > 1024) {
    let wintop = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
    Array.from($elems).forEach((ele) => {
      const $elm = ele
      if ($elm.classList.contains('set-animation')) {
        return true
      }
      let topcoords = $elm.offsetTop
      if (wintop > (topcoords - (winH * offset))) {
        $elm.classList.add('set-animation')
      }
      return true
    })
  } else {
    Array.from($elems).forEach((ele) => {
      const $elm = ele
      $elm.classList.add('set-animation')
    })
  }
}
const removeLoading = () => {
  setTimeout(() => {
    document.getElementsByTagName('html')[0].classList.add('hide-loader')
    animationEle()
    window.addEventListener('scroll', function(e) {
      animationEle()
    })
  }, 0)
}
const AnimationScrollPage = () => {
  document.querySelector('html').scrollTop = 0;
  setTimeout (() => {
    if(document.querySelectorAll('.ani-banner').length) {
      let inter = setInterval(() => {
        if (document.querySelectorAll('.done-ani').length) {
          clearInterval(inter)
          removeLoading()
        }
      }, 5)
    } else {
      removeLoading()
    }

  }, 300)
}

export default AnimationScrollPage
