import React, { useEffect, useState} from 'react';
import {  graphql, StaticQuery, Link } from "gatsby"
import * as StringUtils from "../utils/string-utils"
import { renderHTML } from '../agility/utils'
import LazyBackground from '../utils/LazyBackground'
// import { DateTime } from 'luxon'
import PostItem from '../modules/PostItem'
import PostItemImageVertical from '../modules/DownloadableItem'
import Spacing from './Spacing'
import Lazyload from 'react-lazyload'

import './NewEBookThankYou.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query NewEBookThankYouQuery {
      eBook:allAgilityResource(
				filter: {customFields: {resourceTypeName: {eq: "eBook"}}}
				limit: 4
			) {
        totalCount
        nodes {
          customFields {
            image {
              url
              width
              height
              label
            }
            bookCover {
              url
            }
            thankYouContent
            resourceType {
              contentid
            }
            date(formatString: "MMMM D, YYYY")
            title
            uRL
            resourceTypeID
            resourceTypeName
            resourceTopics {
              referencename
              sortids
            }
            topReads {
              referencename
            }
            topWebinars {
              referencename
            }
            resourceTopics_TextField
            resourceTopics_ValueField
            topReads_ValueField
            topReads_TextField
            topWebinars_TextField
            topWebinars_ValueField
            excerpt
            cTA {
              contentid
            }
            fileDownload {
              url
              label
              filesize
            }
            downloadButtonText
          }
          contentID
        }
      }
      Webinar:allAgilityResource(
				filter: {customFields: {resourceTypeName: {eq: "Webinar"}}}
				limit: 4
			) {
        totalCount
        nodes {
          customFields {
            image {
              url
              width
              height
              label
            }
            bookCover {
              url
            }
            thankYouContent
            resourceType {
              contentid
            }
            date(formatString: "MMMM D, YYYY")
            title
            uRL
            resourceTypeID
            resourceTypeName
            resourceTopics {
              referencename
              sortids
            }
            topReads {
              referencename
            }
            topWebinars {
              referencename
            }
            resourceTopics_TextField
            resourceTopics_ValueField
            topReads_ValueField
            topReads_TextField
            topWebinars_TextField
            topWebinars_ValueField
            excerpt
            cTA {
              contentid
            }
            fileDownload {
              url
              label
              filesize
            }
            downloadButtonText
          }
          contentID
        }
      }
		  }
    `}
		render={queryData => {
			//filter out only those logos that we want...
			let resources = queryData.eBook.nodes.concat(queryData.Webinar.nodes)
			const viewModel = {
				item: props.item,
        dynamicPageItem: props.dynamicPageItem,
				resources,
			}
			return (<NewEBookThankYou {...viewModel}/>);
		}}
	/>
)

/*  */
const FeatureCaseStudies = ({topWebinar}) => {
  return (
    <section>
    <div className="container ps-rv bg">
      <div className="top-read-line"></div>
      <div className="mx-auto mb-45 last-mb-none max-w-940 text-center beauty-ul">
        <h2>Top Webinars for You</h2>
      </div>
      <div className="row">
        {topWebinar?.map((post, index) => {
          let resType = post?.customFields?.resourceTypeName?.toLowerCase().replace(/ /g, "-") || ''
          post.url = `/resources/${resType ? resType + '/' : ''}${post?.customFields?.uRL}`
          return (
            <div className="col-md-6 col-lg-4 mb-45 lg-mb-0" key={index}>
              <PostItem showCustomerLogo={true} post={post} hideDescription={true} />
            </div>
          )
        })}
      </div>
    </div>
  </section>
  )
}
const DownloadEbook = ({topReads, isVerticalImage}) => {
  return (
    <>
    <div className="top-read-for-u">
      <div className="container ps-rv bg">
        <div className="top-read-line"></div>
      </div>
    </div>
    <section>
      <div className="container ps-rv bg">
        <div className="mx-auto mb-45 last-mb-none max-w-940 text-center beauty-ul">
          <h2>Top Reads For You</h2>
        </div>
        <div className="row">
          {topReads.map((post, index) => {
            return (
              <div className="col-md-6 col-lg-4 mb-45 lg-mb-0" key={index}>
                < PostItemImageVertical post={post} isVerticalImage= {isVerticalImage} />
              </div>
            )
          })}
        </div>
        {/* <div className="text-center">
          <Link to="#" className="btn"><span>Browser All Downloadable items</span></Link>
        </div> */}
      </div>
    </section>
  </>
  )
}

const FeatureRes = ({ eBookSelected }) => {
  const { downloadButtonText, fileDownload, webinarURL, image, excerpt, title, thankYouContent, bookCover, resourceTypeName} = eBookSelected?.customFields
  const urlCover = bookCover ? bookCover.url : '/images/ebook-cover-default.png'
  const isWebinar = resourceTypeName.toLowerCase() === 'webinar'
  const buttonCtaUrl = isWebinar ? (webinarURL ? webinarURL.href : '') : (fileDownload ? fileDownload?.url : '')

  return (
    <section className="thanks-block">
      <div className="space-80"></div>
      <div className="container ps-rv bg">
        <div className="row">
          <div className="col col-12 col-lg-6 mb-45 lg-mb-0">
            <div className="d-table w-100 h-100 resource-lp-right">
              <div className="d-table-cell">
                { thankYouContent &&
                  <div dangerouslySetInnerHTML={renderHTML(thankYouContent)}></div>
                }
                { downloadButtonText &&
                  <a href={buttonCtaUrl || '#'} className="btn btn-yellow text-uppercase">{downloadButtonText}</a>
                }
              </div>
            </div>
          </div>
          <div className="col col-12 col-lg-6 col-second">
            <div className="resource-lp-left ps-rv last-mb-none">
              <img src={urlCover} alt={title}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const NewEBookThankYou = ({ item, resources, dynamicPageItem }) => {
  const [eBookSelected, setEBookSelected] = useState(dynamicPageItem)
  const topWebinarIds = eBookSelected?.customFields?.topWebinars
  const topReadIds = eBookSelected?.customFields?.topReads

  // const isWebinar = dynamicPageItem.customFields.resourceTypeName.toLowerCase() === 'webinar'
	// const isEbook = dynamicPageItem.customFields.resourceTypeName.toLowerCase() === 'ebook'

  const handleGetTopWebinars = (topWebinarIds) => {
    let results = topWebinarIds || []

    if(results.length < 3) {
      let count = results.length
      for(let i = 0; i < resources.length; i++) {
        if (count < 3 && resources[i].customFields?.resourceTypeName === 'Webinar') {
          results.push(resources[i])
          count++
        }
        if (count === 3) {
          break;
        }
      }
    }
    return results
  }

  const handleGetTopReads = (topReadIds) => {
    let results = topReadIds || []

    if(results.length < 3) {
      let count = results.length
      for(let i = 0; i < resources.length; i++) {
        if (count < 3 && resources[i].customFields?.resourceTypeName === 'eBook') {
          results.push(resources[i])
          count++
        }
        if (count === 3) {
          break;
        }
      }
    }
    return results
  }

  const topWebinar = handleGetTopWebinars(topWebinarIds)

  const topRead = handleGetTopReads(topReadIds)

	return (
		<>
    { eBookSelected &&
    <>
      <FeatureRes eBookSelected={eBookSelected} />
			<section className="mod-new-post-listing">
        <div className="space-60 space-dt-80"></div>
        <FeatureCaseStudies topWebinar={topWebinar} />
        <div className="space-30 space-dt-80"></div>
        {topRead && topRead.length &&
        <>
          <DownloadEbook topReads={topRead} isVerticalImage={true} />
          <div className="space-70 space-dt-100"></div>
        </>
        }

			</section>
    </>
    }
		</>
	);
}