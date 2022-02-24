import React, { useEffect, useRef, useState } from 'react';
import { graphql, StaticQuery } from "gatsby"
import './ResourceTagTitle.scss'
import ResponsiveImage from '../components/responsive-image.jsx'
import { Link } from "gatsby"
import LazyBackground from '../utils/LazyBackground'

import './ResourceTagList.scss'
// import * as StringUtils from "../utils/string-utils"
import Spacing from './Spacing'

export default props => (
  <StaticQuery
    query={graphql`
    query NewResourceTag {
      allAgilityResource {
        nodes {
          id
          customFields {
            title
            resourceTopics_TextField
            resourceTopics_ValueField
            resourceTopics {
              referencename
              sortids
            }
            resourceTypeName
            resourceType {
              contentid
            }
            resourceTypeID
            excerpt
            image {
              label
              url
              filesize
              pixelHeight
              pixelWidth
              height
              width
            }
            bookCover {
              filesize
              height
              url
            }
            uRL
            slug: uRL
            resourceTypeName
          }
        }
      }
    }
    `}
    render={queryData => {
      const allResource = queryData?.allAgilityResource?.nodes || []
      return <NewResourcesTagList allResource={allResource} page={props.page} item={props.item} dynamicPageItem={props.dynamicPageItem}/>
    }}
  />
)

const NewResourcesTagList = ({ allResource, page, item, dynamicPageItem }) => {
  const [loadMoreIdx, setLoadMoreIdx] = useState(12)
  const stringContentId = dynamicPageItem.contentID.toString()
  const [checkIsEbook, setCheckIsEbook] = useState(false)
  const listResourceTopic = allResource.filter(resourceItem => {
    const data = {
      ...resourceItem.customFields,
      id: resourceItem.id
    }
    let condition = true
    if (dynamicPageItem.properties.referenceName === 'resourcetopics') {
      condition = ((data.resourceTopics_ValueField || '').split(',')).includes(stringContentId)
    }
    if (dynamicPageItem.properties.referenceName === 'resourcetypes') {
      condition = ((data.resourceTypeID || '').split(',')).includes(stringContentId)
    }
    return condition
  })

  useEffect (() => {
    if ((dynamicPageItem?.customFields?.title || '').toLowerCase() === 'ebook') {
      setCheckIsEbook(true)
    }
  }, [])

  const loadMoreHandler = () => {
    let tmpLoadMoreIdx = loadMoreIdx
    tmpLoadMoreIdx += 6
    setLoadMoreIdx(tmpLoadMoreIdx)
  }

  return <React.Fragment>
    <section className="module mod-resource-tag-list">
      <div className="container">
        <div className="row list-resources-tags">
          {listResourceTopic
            .filter((item, index) => index < loadMoreIdx)
            .map((item, index) => {
            let resType = item.customFields.resourceTypeName.toLowerCase().replace(/ /g, "-");
            const url = `/resources/${resType}/${item.customFields.slug}`
            const customFields = item.customFields
            return <div className="col-sm-6 col-xl-4 last-mb-none col-item d-flex" key={`resouce-${item.id}`}>
              <div className="item-resource d-flex flex-column">

                {checkIsEbook && <div className="img-item ebook ps-rv z-1">
                  <Link to={url}>
                    <LazyBackground className="bg ps-as bg-overlay" src={'/images/pattern-resoucre-ebook.png'} />
                    <LazyBackground className="resource-bg ebook bg ps-rv" src={(customFields.bookCover ? customFields.bookCover.url : customFields.image.url) + '?w=500'} />
                  </Link>
                </div>}

                {!checkIsEbook && <div className="img-item">
                  <Link to={url}>
                    <LazyBackground className="resource-bg bg" src={customFields.image.url} />
                  </Link>
                </div>}
                <div className="flex">
                  <Link to={url}> <h3 className="h3">{customFields.title}</h3></Link>
                  <p>{customFields.excerpt}</p>
                </div>
                <Link to={url} className="link-line link-purple">Download</Link>
                {/* {item.customFields.fileDownload && <a className="link-line link-purple " href={item.customFields.fileDownload.url} download>Download</a>} */}
              </div>
            </div>
          })}
        </div>

        {loadMoreIdx <= listResourceTopic.length - 1 && <div className="text-center">
          <button className="btn btn-load-more btn-outline-primary" onClick={loadMoreHandler}>
            <span>Load More</span>
          </button>
        </div>}
      </div>
    </section>

    <Spacing item={item} />
  </React.Fragment>
}