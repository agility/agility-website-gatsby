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
        allAgilityComparisonPlatformFeatures(sort: {fields: properties___itemOrder}) {
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
  const classSection = `mod-feature-table FeatureComparisonChart module animation ps-rv ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`
  const headline = item.customFields.heading
  const fullComparisonLink = item.customFields.fullComparisonLinkLabel
  const textviewFull = item.customFields.viewFullComparisonLabel
  const ctaBtnText = item.customFields.bottomCTA.text
  const ctaBtnhref = item.customFields.bottomCTA.href
  const ctaBtnTaget = item.customFields.bottomCTA.target
  // filter list platform
  const [countPlatformShow, setCountPlatformShow] = useState(4)
  const [active, setActive] = useState(null)
  const [activeMB, setActiveMB] = useState(null)
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  // lấy danh sách platform được chọn trong cms
  const listPlatformGet = dataQuery.listPlatformItems.filter(plat => {
    return dataQuery.listPanelItems.map(obj => obj.customFields.platform.contentid).includes(plat.itemID)
  })
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
      setCountPlatformShow(3)
    }
    if (window.innerWidth >= 1200 && countPlatformShow !== 4) {
      setCountPlatformShow(4)
    }
    if (window.innerWidth <= 991 && countPlatformShow !== 2) {
      setCountPlatformShow(2)
    }
    window.addEventListener('resize', () => {
      if(window.innerWidth >= 992 & window.innerWidth <= 1199 && countPlatformShow !== 3) {
        setCountPlatformShow(3)
      }
      if (window.innerWidth >= 1200 && countPlatformShow !== 4) {
        setCountPlatformShow(4)
      }
      if (window.innerWidth <= 991 && countPlatformShow !== 2) {
        setCountPlatformShow(2)
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
        <a href="#" onClick={(e) => {e.preventDefault()}} target="_self" className="hidden-text" tabIndex='-1'>hidden</a>
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
      return dataQuery.listPanelItems.find(panel => panel.customFields.platform.contentid === plat.itemID && panel.customFields.feature.contentid === idFeatures)
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
          <table className="feature-table full-w-mb">
            <tbody>
              <tr>
                <th>Features</th>
                {displayPlatform}
              </tr>
              {featuresName}
            {linkFullComparion &&
              <tr className="last-tr">
                <td>{textviewFull}</td>
                {linkFullComparion}
              </tr>
            }
          </tbody></table>
          {linkFullComparionMB}
          { ctaBtnText && ctaBtnhref &&
              <div className='cta-feature-table text-center last-mb-none'>
                <p><Link to={ctaBtnhref} href={ctaBtnTaget} className="btn btn-yellow text-decoration-none">{ctaBtnText}</Link></p>
              </div>
            }
        </div>
      </section>
      <Spacing item={item}/>
		</React.Fragment>
	);
}
