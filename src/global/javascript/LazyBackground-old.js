const call = (elementTmp, element) => {
  const datasrc = element.getAttribute('data-src')
  if (elementTmp === 'IMG') {
    element.setAttribute('src', datasrc)
  } else {
    element.setAttribute('style',
      `background-image: url('${datasrc}')`)
  }
  element.classList.add('lazy-loaded')
  element.classList.remove('lazy')
  element.setAttribute('data-src', '')
}

// const lazyimage = '.lazy:visible'
const lazyimage = '.lazy'
const hasSlider = (element) => {
  // const sliderLazy = $(element).parents('.slider-lazy')
  // const prevActive = sliderLazy.find('.slick-current').prev().find('.lazy')
  // const nextActive = sliderLazy.find('.slick-current').next().find('.lazy')
  // const srcprev = prevActive.attr('data-src')
  // const srcnext = nextActive.attr('data-src')

  // if (prevActive.length) {
  //   if (prevActive[0].nodeName === 'IMG') {
  //     prevActive.attr('src', srcprev)
  //   } else {
  //     prevActive.css({
  //       'background-image': `url('${srcprev}')`
  //     })
  //   }
  // }
  // if (nextActive.length) {
  //   if (nextActive[0].nodeName === 'IMG') {
  //     nextActive.attr('src', srcnext)
  //   } else {
  //     nextActive.css({
  //       'background-image': `url('${srcnext}')`
  //     })
  //   }
  // }

  // prevActive.removeClass('lazy').addClass('b-loaded')
  // nextActive.removeClass('lazy').addClass('b-loaded')
}

function elementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0
    && rect.left >= 0
    && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  )
}

const lazyloadimageCustom = () => {
  const lazyElement = document.querySelectorAll(lazyimage)
  console.log('lazyElement:', lazyElement)
  lazyElement.forEach((e) => {
    (() => {
      if (elementInViewport(e) && !e.classList.contains('lazy-loaded') && e.offsetWidth > 0) {
        
        console.log('elementScroll', e, elementInViewport(e))
        const elementTmp = e.tagName
        console.log(elementTmp)
        call(elementTmp, e)
        // if ($(element).parents('.slider-lazy').hasClass('slick-initialized')) {
        //   hasSlider(element)
        // }
      }
    })()
  })
}
const LazyLoadImage = () => {
  const lazyLoadImage = () => {
    // if ($(lazyimage).length) {
      // hasSlider()
      lazyloadimageCustom()
      document.addEventListener('scroll', () => {
        lazyloadimageCustom()
      })
  }

  setTimeout(() => {
    lazyLoadImage()
  }, 100)
  // window.lazyLoadImage = lazyLoadImage
  // $(window).on('resize orientationchange', () => {
  //   lazyLoadImage()
  // })
}
export default LazyLoadImage