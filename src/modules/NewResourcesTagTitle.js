import React, { useEffect, useRef, useState } from 'react';
import { graphql, StaticQuery } from "gatsby"
import './ResourceTagTitle.scss'
import { Link } from "gatsby"
import Spacing from './Spacing'
import { renderHTML } from '../agility/utils'

export default props => (
  <StaticQuery
    query={graphql`
    query Testttttt {
      allAgilityCustomTag(sort: {order: ASC, fields: properties___itemOrder}) {
        nodes {
          contentID
          languageCode
          properties {
            referenceName
            itemOrder
          }
          customFields {
          title
          }
        }
      }
    }
    `}
    render={queryData => {
			console.log('queryData, props', props)
      return <NewResourcesTagTitle dynamicPageItem={props.dynamicPageItem} page={props.page} item={props.item}/>
    }}
  />
)

const NewResourcesTagTitle = ({ dynamicPageItem, page, item }) => {
  return <React.Fragment>
    <section className="module mod-resource-tag">
      <div className="container">
        <div className="content">
          <div>
            <span className="d-inline-block cs-tag ps-rv">
              {page.title}
              {/* <Link to={link} target="_self" className="ps-as"><span className="sr-only">{page.title}</span></Link> */}
            </span>
          </div>
          <h1>Browse all {page.title}</h1>
          <div dangerouslySetInnerHTML={renderHTML(dynamicPageItem?.customFields?.description)}></div>
          <p>
            <a href="/resources" className="text-decoration-none btn btn-outline-primary btn-arrow-before btn-menu">All Resources</a>
          </p>
        </div>
      </div>
    </section>

    <Spacing item={item} />
  </React.Fragment>
}