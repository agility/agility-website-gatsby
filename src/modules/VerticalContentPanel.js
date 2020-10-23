import React, { useState, useEffect, useRef } from 'react';
import { graphql, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'
import './VerticalContentPanel.scss'
import Lazyload, { forceCheck, forceVisible } from 'react-lazyload'
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'

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
      // console.log('queryData.allAgilityPanelContentItems', queryData.allAgilityPanelContentItems)
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
  const classSection = `module mod-image-content VerticalContentPanel  ${fields.darkMode && fields.darkMode === 'true'  ? 'dark-mode bg-17 text-white': ''}`
  const classPositionContent = `list-content-ic small-paragraph col-xl-6 delay-2 ${positionContent === 'right' ? 'order-2 anima-right': ' anima-left'}`
  const classPositionImage = `col-xl-6 d-none d-xl-block list-image-ic delay-2 ${positionContent === 'right' ? 'anima-left': ' anima-right'}`
  const lazyRef = useRef(null)
  const [active, setActive] = useState(1)
  useEffect(() => {
    init()
  }, [])
  const init = () => {
    const section = document.querySelectorAll('.mod-image-content')
    Array.from(section).forEach((ele) => {
      const $this = ele
      const serviceLeft = $this.querySelectorAll('.box-left')[0]
      setUpCanBeReset($this.querySelectorAll('.list-content-ic')[0])
      caculatePin($this)
      window.addEventListener('scroll', () => {
        caculatePin($this)
      } )
      window.addEventListener('resize', () => {
        resetPropertyPin(serviceLeft)
        setUpCanBeReset($this.querySelectorAll('.list-content-ic')[0])
        caculatePin($this)
      })
    })
  }
  const classPin = 'list-pin'
  const classPin2 = 'list-pin-bottom'
  let scrollTop

  let widthSerLeft
  const resetPropertyPin = (pinElement) => {
    pinElement.classList.remove(classPin)
    pinElement.classList.remove(classPin2)
    pinElement.style.marginLeft = '0'
    pinElement.style.top = 'auto'
    // pinElement.style.width = 'auto'
  }

  const setUpCanBeReset = (pinElement) => {
    widthSerLeft = pinElement.offsetWidth - 65
  }
  const caculatePin = ($this) => {
    const serviceLeft = $this.querySelectorAll('.box-left')[0]
    const serviceRight = $this.querySelectorAll('.list-image-ic')[0]
    const doc = document.documentElement;
    let offsetPin
    let rootOffset
    let header = document.querySelectorAll('#header')[0].offsetHeight
    let trigger
    let listOffset
    if (window.innerWidth < 1200) {
      resetPropertyPin(serviceLeft)
      return false
    }
    rootOffset = $this.offsetTop + $this.querySelectorAll('.title-i-c')[0].offsetHeight + 45
    scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
    offsetPin = (window.innerHeight - document.querySelectorAll('#header')[0].offsetHeight - serviceLeft.offsetHeight) / 2
    listOffset = rootOffset + serviceRight.offsetHeight
    trigger = scrollTop + header + offsetPin
    let item = $this.querySelectorAll('.item-image-ic ')
    Array.from(item).forEach((elem,i) => {
      const oft = elem.offsetTop
      const middle =  scrollTop + header + (window.innerHeight - document.querySelectorAll('#header')[0].offsetHeight)/2
      if (middle >= oft && middle <= oft + elem.offsetHeight) {
        activetab($this,i)
      }
    })
    if (trigger > rootOffset) {
      if (trigger + serviceLeft.offsetHeight < listOffset) {
        serviceLeft.classList.remove(classPin2)
        serviceLeft.classList.add(classPin)
        serviceLeft.style.top = header + offsetPin + 'px'
      } else {
        serviceLeft.classList.add(classPin2)
        serviceLeft.style.top = rootOffset - scrollTop + 'px'
      }
      if( serviceLeft.classList.contains('order-2')) {
        serviceLeft.style.marginLeft = widthSerLeft + 'px'
      }
      serviceLeft.style.width = widthSerLeft + 'px'
    } else {
      resetPropertyPin(serviceLeft)
    }
    return true
  }

  const activetab = (ele,tab) => {
    ele.querySelectorAll(`.item-ic[data-content="${ tab + 1 }"]`)[0].click()
  }

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
                <Lazyload offset={ Helpers.lazyOffset }><img src={customField.graphic.url} className='img-before' alt={customField.graphic.label}></img></Lazyload>
                <Lazyload offset={ Helpers.lazyOffset }><img src='../images/familiar.png' className='layer-image' alt={customField.graphic.label}></img></Lazyload>
              </React.Fragment>
            )
          } else {
            return (
              <React.Fragment>
                <Lazyload offset={ Helpers.lazyOffset }><img src={customField.graphic.url} className='img-before' alt={customField.graphic.label}></img></Lazyload>
                <Lazyload offset={ Helpers.lazyOffset }><img src='../images/layer-content-image.png' className='layer-image' alt={customField.graphic.label}></img></Lazyload>
              </React.Fragment>
            )
          }
        } else {
          return (
            <Lazyload offset={ Helpers.lazyOffset }><img src={customField.graphic.url} alt={customField.graphic.label}></img></Lazyload>
          )
        }
      } else {
        return null
      }
    }
    return (
      <div className={className} data-content={idx + 1} key={idx} onClick={() => { setActive(idx + 1); setTimeout(() => {
        forceCheck();
      }, 50) }}>
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
    return null
  })
  const imagePanels = listPanelContent.map((obj, idx) => {
    const customField = obj.customFields
    const classNameImg = `item-image-ic ${idx + 1 === active ? 'tab-active': ''}`
    if (customField.graphic && customField.graphic.url) {
			if (isHomePage) {
        if (positionContent === 'right') {
          return (
            <div className={classNameImg}  data-image={idx + 1} key={'image-' + idx}>
              <Lazyload offset={ Helpers.lazyOffset }><img src={customField.graphic.url} className='img-before' alt={customField.graphic.label}></img></Lazyload>
              <Lazyload offset={ Helpers.lazyOffset }><img src='../images/familiar.png' className='layer-image' alt={customField.graphic.label}></img></Lazyload>
            </div>
          )
        } else {
          return (
            <div className={classNameImg}  data-image={idx + 1} key={'image-' + idx}>
              <Lazyload offset={ Helpers.lazyOffset }><img src={customField.graphic.url} className='img-before' alt={customField.graphic.label}></img></Lazyload>
              <Lazyload offset={ Helpers.lazyOffset }><img src='../images/layer-content-image.png' className='layer-image' alt={customField.graphic.label}></img></Lazyload>
            </div>
          )
        }
			} else {
        return (
          <div className={classNameImg}  data-image={idx + 1} key={'image-' + idx}>
            <Lazyload offset={ Helpers.lazyOffset }><img src={customField.graphic.url} alt={customField.graphic.label}></img></Lazyload>
          </div>
        )
      }
    }
    return null
  })

  const checkForceLazyImg = () => {
    const top  = (window.pageYOffset || document.documentElement.scrollTop) + (window.innerHeight || document.documentElement.clientHeight)
    const elem = lazyRef.current.getBoundingClientRect()
    if (top >= elem.top) {
      forceVisible()
    }
  }

	return (
    <React.Fragment>
      <section ref={ lazyRef } className={classSection} data-max={listPanelContent.length}>
        <div className="container">
          { title &&
            <div className="title-i-c text-center last-mb-none animation anima-bottom">
              <h2 dangerouslySetInnerHTML={renderHTML(title)}></h2>
              { description &&
                <div className="last-mb-none" dangerouslySetInnerHTML={renderHTML(description)}></div>
              }
            </div>
          }
          { (contentPanels.length > 0 || imagePanels.length > 0) &&
            <div className="row animation">
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
      </section>
    <Spacing item={item}/>
  </React.Fragment>
	);
}