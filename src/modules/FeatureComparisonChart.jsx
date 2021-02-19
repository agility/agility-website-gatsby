import React, {useEffect, useState} from 'react';
import { graphql, StaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import './FeatureComparisonChart.scss'
import Lazyload from 'react-lazyload'
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'
export default props => (
  <StaticQuery
		query={graphql`
			query agilityComparisonQuery {
        allAgilityComparisonPlatformFeatures(sort: {fields: customFields___platformName}) {
          nodes {
            customFields {
              featureName
              feature {
                contentid
              }
              platformName
              platform_ValueField
              platform {
                contentid
              }
              textValue
              trueFalseValue
              feature_ValueField
            }
            properties {
              referenceName
              itemOrder
            }
          }
        }
        allAgilityComparisonFeatures(sort: {fields: properties___itemOrder}) {
          nodes {
            customFields {
              title
            }
            contentID
            properties {
              itemOrder
            }
          }
        }
        allAgilityComparisonPlatform(sort: {fields: properties___itemOrder}) {
          nodes {
            itemID
            contentID
            customFields {
              logo {
                filesize
                label
                pixelHeight
                pixelWidth
                url
              }
              title
              fullComparisonLink {
                href
                target
                text
              }
            }
            properties {
              itemOrder
            }
          }
        }
			}
		`}
		render={queryData => {
			const customFieldsQuery = props.item.customFields
			const reference = customFieldsQuery.comparisonPlatformFeatures.referencename
			const listPanelItems = queryData.allAgilityComparisonPlatformFeatures.nodes.filter(obj => {
				return obj.properties.referenceName === reference
      })
      const listFeaturesItems = queryData.allAgilityComparisonFeatures.nodes
      const listPlatformItems = queryData.allAgilityComparisonPlatform.nodes
			const dataQuery = {
        listPanelItems,
        listFeaturesItems,
        listPlatformItems
			}
			const viewModel = {
				item: props.item,
				dataQuery
			}
			return (
				<FeatureComparisonChart {...viewModel} />
			);
		}}
	/>
)
const FeatureComparisonChart = ({ item, dataQuery }) => {
  const fields = item.customFields
  const classSection = `mod-feature-table FeatureComparisonChart module animation ps-rv ${fields.darkMode && fields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`
  const headline = fields.heading
  const fullComparisonLink = fields.fullComparisonLinkLabel
  const textviewFull = fields.viewFullComparisonLabel
  const ctaBtnText = fields.bottomCTA.text
  const ctaBtnhref = fields.bottomCTA.href
  const ctaBtnTaget = fields.bottomCTA.target
  const listPlatFormCurrent = fields.defaultcompetitors
  // filter list platform
  const [active, setActive] = useState(null)
  const [activeMB, setActiveMB] = useState(null)
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [isPin, setIsPin] = useState(false)

  // lấy danh sách platform được chọn trong cms
  let listPlatformGet = dataQuery.listPlatformItems.filter(plat => {
    return plat.itemID === 2351
  })
  listPlatformGet = [...listPlatformGet, ...listPlatFormCurrent]
  const [listPlatformFake, setListPlatformFake] = useState(listPlatformGet)
  const handleFilter = (name, platform) => {
    const listNewPlatform = listPlatformFake.map(obj => obj)
    const idxName = listPlatformFake.findIndex((x) => x === name)
    const idxPlatform = listPlatformFake.findIndex((y) => y === platform)
    listNewPlatform[idxName] = platform
    listNewPlatform[idxPlatform] = name
    setActive(null)
    setActiveMB(null)
    setListPlatformFake(listNewPlatform)
  }
  const openCloseSelect = (index) => {
    if (index !== active) {
      setActive(index)
      setIsOpenSelect(true)
    } else {
      setIsOpenSelect(!isOpenSelect)
    }
  }
  // danh sách platform được show ra
  const [countPlatformShow, setCountPlatformShow] = useState(listPlatformFake.length > 4 ? 4 : listPlatformFake.length)
  const listPlatformShow = listPlatformFake.filter((obj, idx) => idx < countPlatformShow)
  const displayPlatform = listPlatformShow.map((platform, index) => {
    const logo = platform.customFields.logo.url
    const title = platform.customFields.title
    const classBox = `box-select d-mb-none ps-rv ${active === index && isOpenSelect ? 'current-select' : ''}`
    const textSelected = 'text-seclected'
    // danh sách platform ẩn đi
    const listPlatformHide = listPlatformFake.filter((Ihide) => {
      return !listPlatformShow.includes(Ihide)
    }).map((i, idx) => {
      return (
        <li key={idx} onClick={() => {handleFilter(i, platform)}}>{i.customFields.title}</li>
      )
    })
    return (
      <th key={index}>
        <div className="d-flex align-items-center justidy-content-center box-feature-logo">
          <img className="feature-logo-tab" src={logo} alt={title} />
        </div>
        { index > 0 && listPlatformFake.length > countPlatformShow &&
          <div className={classBox}>
            <div className={textSelected} onClick={() => {openCloseSelect(index)}}><span>{title}</span><span className="caret icomoon icon-chevron-down"></span></div>
              { listPlatformHide.length > 0 &&
                <ul className="list-select last-mb-none list-unstyled">
                  {listPlatformHide}
                </ul>
              }
          </div>
        }
      </th>
    )
  })
  // end
  // danh sách feature được show ra
  const checkBreakPoint = () => {
    if(window.innerWidth >= 992 & window.innerWidth <= 1199 && countPlatformShow !== 3) {
      setCountPlatformShow(listPlatformFake.length > 3 ? 3 : listPlatformFake.length)
    }
    if (window.innerWidth >= 1200 && countPlatformShow !== 4) {
      setCountPlatformShow(listPlatformFake.length > 4 ? 4 : listPlatformFake.length)
    }
    if (window.innerWidth <= 991 && countPlatformShow !== 2) {
      setCountPlatformShow(listPlatformFake.length > 2 ? 2 : listPlatformFake.length)
    }
    window.addEventListener('resize', () => {
      if(window.innerWidth >= 992 & window.innerWidth <= 1199 && countPlatformShow !== 3) {
        setCountPlatformShow(listPlatformFake.length > 3 ? 3 : listPlatformFake.length)
      }
      if (window.innerWidth >= 1200 && countPlatformShow !== 4) {
        setCountPlatformShow(listPlatformFake.length > 4 ? 4 : listPlatformFake.length)
      }
      if (window.innerWidth <= 991 && countPlatformShow !== 2) {
        setCountPlatformShow(listPlatformFake.length > 2 ? 2 : listPlatformFake.length)
      }
    })
  }
  // danh sách platform show mobile
  const MobileListPlatform = () => {
    // lấy platform thứ 2 trở đi
    const classBoxMB = `box-select ps-rv ${activeMB ? 'current-select' : ''}`
    const listPlatformShowMB = listPlatformFake.filter((obj, idx) => idx > 0)
    const titleShow = listPlatformShowMB[0].customFields.title
    const listPlatformHideMB = listPlatformShowMB.filter((Ihide) => {
      return !listPlatformShow.includes(Ihide)
    }).map((i, idx) => {
      return (
        <li key={idx} onClick={() => {handleFilter(i, listPlatformShowMB[0])}}>{i.customFields.title}</li>
      )
    })
    return (
      <div className={classBoxMB}>
        <div className="text-seclected" onClick={() => {setActiveMB(!activeMB)}}><span>{titleShow}</span><span className="caret icomoon icon-chevron-down"></span></div>
        <ul className="list-select last-mb-none list-unstyled">
          {listPlatformHideMB}
        </ul>
      </div>
    )
  }
  useEffect(() => {
    checkBreakPoint()
    // caculatePin()
    pinHeaderTable()

    window.addEventListener('scroll',pinHeaderTable)
    return function cleanup() {
      window.removeEventListener('scroll', pinHeaderTable)
    }
  })
  const linkFullComparion = listPlatformShow.map((platfor, indx) => {
    const fieldLinks = platfor.customFields.fullComparisonLink
    if (fieldLinks && fieldLinks.href) {
      return (
        <td key={indx}>
          {fullComparisonLink && fullComparisonLink.href &&
            (<a href={fullComparisonLink.href} target={fullComparisonLink.target}>{fullComparisonLink.text}<span className="icomoon icon-chevron-right"></span></a>)
          }
          {fieldLinks && fieldLinks.href &&
            <a href={fieldLinks.href} target={fieldLinks.target}>{fieldLinks.text}<span className="icomoon icon-chevron-right"></span></a>
          }
        </td>
      )
    }
    return (
      <td key={indx}>
        <a href="javascript:;" onClick={(e) => {e.preventDefault()}} target="_self" className="hidden-text" tabIndex='-1'>hidden</a>
      </td>
    )
  })
  const linkFullComparionMB = listPlatformShow.map((platfor, indx) => {
    const fieldLinks = platfor.customFields.fullComparisonLink
    if (fieldLinks && fieldLinks.href) {
      return (
      <div className="last-tr-mb full-w-mb" key={indx}>
        <a href={fieldLinks.href} target={fieldLinks.target}>{fieldLinks.text}<span className="icomoon icon-chevron-right"></span></a>
      </div>)
    }
    return null
  })
  const featuresName = dataQuery.listFeaturesItems.map((features, index) => {
    const idFeatures = features.contentID
    // show list feature theo platform
    const orderListFeature = listPlatformShow.map(plat => {
      return dataQuery.listPanelItems.find(panel => panel.customFields.platform.contentid === plat.contentID && panel.customFields.feature.contentid === idFeatures)
    })
    const list = orderListFeature.map((contentFeature, idx) => {
      if (contentFeature !== undefined) {
        const check = contentFeature.customFields.trueFalseValue
        const text = contentFeature.customFields.textValue
        if (check === 'true') {
          if (text !== null) {
            return (
              <td key={idx}><span className="feat-text">{text}</span></td>
            )
          } else {
            return (
              <td key={idx}><span className="icomoon icon-check feat-check"></span></td>
            )
          }
        } else {
          if (text !== null) {
            return (
              <td key={idx}><span className="feat-text">{text}</span></td>
            )
          } else {
            return (
              <td key={idx}><span className="feat-check feat-no-support"></span></td>
            )
          }
        }
      } else {
        return (
          <td key={idx}></td>
        )
      }
    })
    return (
      <tr key={index}>
        <td>{features.customFields.title}</td>
        {list}
      </tr>
    )
  })

  /* pin headertable */
  const caculatePin = (pinEle, $header, virtual, scrollArea) => {
		let offsetPin
		let rootOffset
		let header
		let trigger
		let listOffset
		let scrollTop
    const getElementOffset = (el) => {
      let top = 0;
      let left = 0;
      let element = el;

      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);

      return {
        top,
        left,
      };
    }

    rootOffset = getElementOffset(virtual).top;
    scrollTop = window.pageYOffset;
    header = $header.clientHeight;
    offsetPin = getElementOffset(virtual);
    listOffset = getElementOffset(scrollArea).top + scrollArea.clientHeight //- document.querySelector('.table-3').clientHeight - pinEle.clientHeight - 90
    trigger = scrollTop + header

    if (trigger > rootOffset) {
      pinEle.classList.add('table-pin');
      pinEle.childNodes[0].classList.add('container');
      virtual.style.height = pinEle.clientHeight + 'px'
      if (trigger + pinEle.clientHeight < listOffset) {
        pinEle.style.top = $header.clientHeight + 'px';
      } else {
        pinEle.style.top = listOffset - pinEle.clientHeight - scrollTop + 'px';
      }
    } else {
      pinEle.classList.remove('table-pin')
      virtual.style.height = '';
      pinEle.childNodes[0].classList.remove('container');
    }

  }
  const pinHeaderTable = (event) => {
		const pinEle = document.querySelector('.table-header')
		const $header = document.querySelector('#header')
		const virtual = document.querySelector('.virtual-pin-bar')
		const scrollArea = document.querySelector('.pin-section')

		caculatePin(pinEle, $header, virtual, scrollArea);
	}
  /* end pin headertable */

  return (
    <React.Fragment>
      <section className={classSection}>
        <Lazyload offset={ Helpers.lazyOffset }><img src="/images/patterns-purple.svg" alt='patterns' className='patterns1 d-none d-xl-block'></img></Lazyload>
        <Lazyload offset={ Helpers.lazyOffset }><img src="/images/patterns-purple.svg" alt='patterns' className='patterns2 d-none d-xl-block'></img></Lazyload>
        <Lazyload offset={ Helpers.lazyOffset }><img src="/images/parrent2.svg" alt='patterns' className='patterns3 d-none d-md-block'></img></Lazyload>

        <div className="container anima-bottom">
          <div className="feature-head last-mb-none">
            {headline &&
            <h2>{headline}</h2>
            }
          </div>
          <div className="select-compet-mb">
            <h4>Select a Competitor</h4>
            { <MobileListPlatform /> }
          </div>

          {/* Pin section */}
          <div className="pin-section">
            <div className="virtual-pin-bar" style={{height: `${ isPin ? document.querySelector('.table-header').clientHeight + 'px' : ''}`}}></div>
            <div className={`table-header ${isPin ? 'table-pin' : ''}`}>
              <div className={ isPin ? 'container' : ''}>
                <table className="feature-table full-w-mb">
                  <tbody>
                    <tr>
                      <th>Features</th>
                      {displayPlatform}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <table className="feature-table full-w-mb">
              <tbody>
                {/* <tr>
                  <th>Features</th>
                  {displayPlatform}
                </tr> */}
                {featuresName}
                {linkFullComparion &&
                  <tr className="last-tr">
                    <td>{textviewFull}</td>
                    {linkFullComparion}
                  </tr>
                }
              </tbody>
            </table>
          </div>
          {linkFullComparionMB}
          { ctaBtnText && ctaBtnhref &&
              <div className='cta-feature-table text-center last-mb-none'>
                <p><Link to={ctaBtnhref} target={ctaBtnTaget} className="btn btn-yellow text-decoration-none">{ctaBtnText}</Link></p>
              </div>
            }
        </div>
      </section>
      <Spacing item={item}/>
		</React.Fragment>
	);
}
