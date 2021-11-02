import React, { useState, useEffect, useRef } from 'react';
import { graphql, StaticQuery } from 'gatsby'
import { renderHTML } from '../agility/utils'
import './VerticalContentPanel.scss'
import Lazyload, { forceCheck } from 'react-lazyload'
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'
import ResponsiveImage from '../components/responsive-image';
import { animationElementInnerComponent } from '../global/javascript/animation'

export default props => (
<StaticQuery
		query={graphql`
      query getPanelContentItems {
        allAgilityPanelContentItems(sort: {fields: properties___itemOrder}) {
          nodes {
            customFields {
              graphic {
                width
                url
                pixelWidth
                pixelHeight
                label
                height
                filesize
              }
              description
              title
            }
            properties {
              referenceName
              itemOrder
            }
          }
        }
      }
    `}
		render={queryData => {
      const referenceName = props.item.customFields.verticalContentPanels.referencename
      const listPanelContent = queryData.allAgilityPanelContentItems.nodes
      .filter(obj => { return obj.properties.referenceName === referenceName})
      for(let i = 0; i < listPanelContent.length - 1; i++) {
        if (listPanelContent[i].properties.itemOrder > listPanelContent[i + 1].properties.itemOrder) {
          const tam = listPanelContent[i]
          listPanelContent[i] = listPanelContent[i + 1]
          listPanelContent[i + 1] = tam
        }
      }
			const viewModel = {
				item: props.item,
				listPanelContent
      }
			return (
				<VerticalContentPanel {...viewModel} />
			);
		}}
  />
)

const VerticalContentPanel = ({ item, listPanelContent }) => {
  const fields = item.customFields
  const title = fields.title
  const description = fields.description
  const positionContent = fields.textSide
  const classSection = `module mod-image-content VerticalContentPanel animation  ${fields.darkMode && fields.darkMode === 'true'  ? 'dark-mode bg-17 text-white': ''}`
  const classPositionContent = `list-content-ic small-paragraph col-xl-6 delay-2 ${positionContent === 'right' ? 'order-2 ': ' '}`
  const classPositionImage = `col-xl-6 d-none d-xl-flex list-image-ic delay-2 ${positionContent === 'right' ? '': ' '}`
  const lazyRef = useRef(null)
  const [active, setActive] = useState(1)
  const [stickyStyle, setStickyStyle] = useState({})
  // const initClass = (ele) => {
  //   const wH = window.innerHeight
  //   const header = document.querySelectorAll('.header')[0].offsetHeight
  //   const offset = wH - header
  //   const calcHeight = ele.querySelectorAll('.title-i-c')[0].offsetHeight + 60 + ele.querySelectorAll('.wrap-lv2')[0].offsetHeight + 60
  //   if (calcHeight < offset) {
  //     ele.classList.add('is-full')
  //     ele.classList.remove('is-lv2')
  //   } else {
  //     ele.classList.add('is-lv2')
  //     ele.classList.remove('is-full')
  //   }
  // }
  // const setheight = (ele) => {
  //   const Fakeheight = ele.querySelectorAll('.fake-height')[0]
  //   const title = ele.querySelectorAll('.title-i-c ')[0].offsetHeight
  //   const item = ele.querySelectorAll('.list-image-ic .item-image-ic')
  //   const list = ele.querySelectorAll('.list-content-ic')[0]
  //   Fakeheight.style.height = title + item.length*list.offsetHeight*4/5 + 60 + 'px'
  //   Fakeheight.style.paddingTop = title + 60 +'px'
  // }

  useEffect(() => {
    const $this = lazyRef.current
    let serviceLeft

    if ($this.classList.contains('is-full')) {
      serviceLeft = $this.querySelectorAll('.wrap-box-vertical')[0]
    } else {
      serviceLeft = $this.querySelectorAll('.wrap-lv2')[0]
    }
    // let flag = true

    // // #region Sticky won't work if any parent element have overflow is hidden || scroll || auto => remove overflow on body, html
    // document.body.style.setProperty('overflow', 'unset', 'important')
    // // #endregion

    // setheight($this)
    // initClass($this)
    // if (lazyRef.current.classList.contains('is-full')) {
    //   setUpCanBeReset($this.querySelectorAll('.fake-height')[0])
    // } else {
    //   setUpCanBeReset($this.querySelectorAll('.wrap-box-vertical')[0])
    // }

    const scrollWindow = () => {
      // caculatePin($this)
      // if (flag === true) {
      //   setheight($this)
      //   flag = false
      // }
    }
    const resizeWindow = () => {
      serviceLeft.style.maxHeight = ''
      if (window.innerWidth < 1199) return
      const list = $this.querySelectorAll('.list-content-ic')[0]
      serviceLeft.style.maxHeight = list.offsetHeight + 'px'
      // initClass($this)
      // setheight($this)
      // caculatePin($this)
    }
    // caculatePin($this)
    resizeWindow()
    window.addEventListener('scroll',  scrollWindow)
    window.addEventListener('resize', resizeWindow)

    return () => {
      window.removeEventListener('scroll',  scrollWindow)
      window.removeEventListener('resize', resizeWindow)
    }
  }, [])

  /* animation module */
	useEffect(() => {
		const scrollEventFunc = () => {
			animationElementInnerComponent(lazyRef.current)
		}
		animationElementInnerComponent(lazyRef.current)
		window.addEventListener('scroll', scrollEventFunc)

		return () => {
			window.removeEventListener('scroll', scrollEventFunc)
		}
	}, [])

  const classPin = 'list-pin'
  const classPin2 = 'list-pin-bottom'
  let scrollTop

  let widthSerLeft
  const resetPropertyPin = (pinElement) => {
    pinElement.classList.remove(classPin)
    pinElement.classList.remove(classPin2)
    pinElement.style.marginLeft = '0'
    pinElement.style.top = 'auto'
  }

  // const setUpCanBeReset = (pinElement) => {
  //   widthSerLeft = pinElement.offsetWidth + 20
  // }
  // const calculateHeightEachItem = () => {
  //   const $this = lazyRef.current
  //   const $fakeHeight = $this.querySelectorAll('.fake-height')[0]
  //   let serviceLeft

  //   if ($this.classList.contains('is-full')) {
  //     serviceLeft = $this.querySelectorAll('.wrap-box-vertical')[0]
  //   } else {
  //     serviceLeft = $this.querySelectorAll('.wrap-lv2')[0]
  //   }
  //   const lengthItemIc = $this.querySelectorAll('.item-ic').length
  //   const heightEachItemIc = (serviceLeft.offsetHeight + $fakeHeight.offsetHeight) / lengthItemIc
  //   let positionTopEachItem = []
  //   for (let index = 0; index < lengthItemIc; index++) {
  //     positionTopEachItem = [...positionTopEachItem, index === 0 ? 0 : (heightEachItemIc * index)]
  //   }
  //   return positionTopEachItem
  // }

  // const caculatePin = ($this) => {
  //   const doc = document.documentElement;
  //   const topPosition = document.getElementsByTagName('header')[0].offsetHeight + 80 + 'px'
  //   let positionTopEachItem = calculateHeightEachItem()
  //   let tabActive = 0
  //   const currentPosition = $this.getBoundingClientRect().top - 200
  //   scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)

  //   if (topPosition !== stickyStyle.top) {
  //     setStickyStyle({
  //       top: topPosition
  //     })
  //   }

  //   if (currentPosition > 0) tabActive = 0
  //   else if (Math.abs(currentPosition) >= positionTopEachItem[positionTopEachItem.length - 1]) tabActive = positionTopEachItem.length - 1
  //   else {
  //     for (let index = 0; index < positionTopEachItem.length; index++) {
  //       const item = positionTopEachItem[index]
  //       const nextItem = positionTopEachItem[index + 1]
  //       if (nextItem && item <= Math.abs(currentPosition) && Math.abs(currentPosition) <= nextItem) {
  //         tabActive = index
  //       }
  //     }
  //   }
  //   activeTab(tabActive)

  //   return true
  // }

  const activeTabHandler = (idx) => {
    setActive(idx + 1)
    setTimeout(() => {
      forceCheck();
    }, 50)
  }

  // const activeTabHandler = (idx) => {
    // const $this = lazyRef.current
    // const heightEachItem = calculateHeightEachItem()
    // const doc = document.documentElement;
    // scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
    // Helpers.animateScrollTop(scrollTop + $this.getBoundingClientRect().top + heightEachItem[idx], 100)
    // console.log('Testtt')
    // activeTab(idx)
  // }

  let isHomePage = false
	if(typeof window !== `undefined`){
		isHomePage = ['/new-home', '/new-home/', '/'].includes(window.location.pathname)
  }
  let classImg = 'col-md-6 d-xl-none image-mb'
	if (!isHomePage) {
		classImg = 'col-md-6 d-xl-none image-mb img-mb-inter'
	}
  const contentPanels = listPanelContent.map((obj, idx) => {
    const customField = obj.customFields
    const className = `item-ic row align-items-center ${idx + 1 === active ? 'tab-active': ''} ${(idx + 1) % 2 !== 0 ? 'flex-md-row-reverse': ''}`
    const ImageMobile = () => {
      if (customField.graphic && customField.graphic.url) {
        if (isHomePage) {
          if (positionContent === 'right') {
            return (
              <React.Fragment>
                <Lazyload offset={Helpers.lazyOffset}><img src='/images/familiar.png' className='layer-image' alt={customField.graphic.label}></img></Lazyload>
                <Lazyload offset={Helpers.lazyOffset}>
                  <ResponsiveImage img={customField.graphic} className='img-before' />
                </Lazyload>
              </React.Fragment>
            )
          } else {
            return (
              <React.Fragment>
                <Lazyload offset={Helpers.lazyOffset}><img src='/images/layer-content-image.png' className='layer-image' alt={customField.graphic.label}></img></Lazyload>
                <Lazyload offset={Helpers.lazyOffset}>
                  <ResponsiveImage img={customField.graphic} className='img-before' />
                </Lazyload>
              </React.Fragment>
            )
          }
        } else {
          return (
            <Lazyload offset={Helpers.lazyOffset}>
              <ResponsiveImage img={customField.graphic} />
				{/* <img src={customField.graphic.url} alt={customField.graphic.label}></img> */}
			</Lazyload>
          )
        }
      } else {
        return null
      }
    }
    return (
      <div className={className} data-content={idx + 1} key={idx} onMouseOver={() => activeTabHandler(idx)}>
        <div className={classImg}>
          <ImageMobile></ImageMobile>
        </div>
        <div className="col-md-6 last-mb-none col-xl-12 box-content">
          {customField.title &&
            <h4>{customField.title}</h4>
          }
          <div className={'last-mb-none'} dangerouslySetInnerHTML={renderHTML(customField.description)}></div>
        </div>
      </div>
    )
  })
  const imagePanels = listPanelContent.map((obj, idx) => {
    const customField = obj.customFields
    const classNameImg = `item-image-ic ${idx + 1 === active ? 'tab-active': ''}`
    if (customField.graphic && customField.graphic.url) {
			if (isHomePage) {
        return (
          <div className={classNameImg} data-image={idx + 1} key={'image-' + idx}>
            <Lazyload offset={Helpers.lazyOffset}>
              <img src={positionContent === 'right' ? '/images/familiar.png' : '/images/layer-content-image.png'} className='layer-image' alt={customField.graphic.label}></img>
            </Lazyload>
            <Lazyload offset={Helpers.lazyOffset}>
              <ResponsiveImage img={customField.graphic} className='img-before' />
            </Lazyload>
          </div>
        )
      } else {
        return (
          <div className={classNameImg} data-image={idx + 1} key={'image-' + idx}>
            <Lazyload offset={Helpers.lazyOffset}>
              <ResponsiveImage img={customField.graphic} />
              {/* <img src={customField.graphic.url} alt={customField.graphic.label}></img> */}
            </Lazyload>
          </div>
        )
      }
    }
    return null
  })

  // const itemfake = listPanelContent.map((obj, idx) => {
  //   const classNameImg = `item-image-ic ${idx + 1 === active ? 'tab-active': ''}`
  //   return (
  //     <div className={classNameImg}  data-image={idx + 1} key={'image-' + idx}>
  //     </div>
  //   )
  // })
	return (
    <React.Fragment>
      <section ref={ lazyRef } className={classSection} data-max={listPanelContent.length} >
        <div className="container anima-bottom" >
          <div className='wrap-box-vertical sticky' style={stickyStyle}>
          { title &&
            <div className="title-i-c text-center last-mb-none">
              <h2 dangerouslySetInnerHTML={renderHTML(title)}></h2>
              { description &&
                <div className="last-mb-none" dangerouslySetInnerHTML={renderHTML(description)}></div>
              }
            </div>
          }
          { (contentPanels.length > 0 || imagePanels.length > 0) &&
            <div className="row wrap-lv2">
              { contentPanels &&
                <div className={classPositionContent}>
                  <div className='box-left'>
                      {contentPanels}
                  </div>
                </div>
              }
              { imagePanels &&
                <div className={classPositionImage}>
                  {imagePanels}
                </div>
              }
            </div>
          }
          </div>
          {/* <div className='fake-height'>{itemfake}</div> */}
        </div>
      </section>
    <Spacing item={item}/>
  </React.Fragment>
	)
}