import React, { useRef, useEffect } from 'react';
import { renderHTML } from '../agility/utils'
import Spacing from './Spacing';

import ResponsiveImage from '../components/responsive-image.jsx'
import { animationElementInnerComponent } from '../global/javascript/animation';
import './NewFeaturedResource.scss'

const RenderNewFeatureResource = ({ item }) => {
  const { bookCover, resourceTypeName, title, uRL, excerpt } = item?.customFields?.featuredResource?.customFields
  bookCover.label = bookCover.label ? bookCover.label : title
  const link = `/resources/${resourceTypeName.toLowerCase()}/${uRL}`
  /* animation module */
  const thisModuleRef = useRef(null)
  useEffect(() => {
    const scrollEventFunc = () => {
      animationElementInnerComponent(thisModuleRef.current)
    }
    animationElementInnerComponent(thisModuleRef.current)
    window.addEventListener('scroll', scrollEventFunc)

    return () => {
      window.removeEventListener('scroll', scrollEventFunc)
    }
  }, [])

  const trimText = (text) => {
    let txt = text.split(' ')
    return txt.length > 20 ? txt.slice(0, 20).join(' ').concat('...') : txt.join(' ')
  }

  return (
    <section ref={thisModuleRef} className="new-feature-res ps-rv animation">
      <div className="space-50 space-dt-70"></div>
      <div className="container ps-rv z-2 bg anima-bottom">
        <div className="row">
          <div className="col col-12 col-lg-6">
            <div className="resource-lp-left max-w-350 ps-rv mb-45 lg-mb-0 last-mb-none">
              <a className="ps-rv" href={link} >
                <ResponsiveImage img={bookCover} />
              </a>
            </div>
          </div>
          <div className="col col-12 col-lg-6">
            <div className="d-table w-100 h-100 resource-lp-right">
              <div className="d-table-cell align-middle">
                {resourceTypeName &&
                  <h5>{resourceTypeName}</h5>
                }
                {
                  title &&
                  <h2 className="h1">{title}</h2>
                }
                {
                  excerpt &&
                  <div dangerouslySetInnerHTML={renderHTML(trimText(excerpt))} className='paragraph excerpt-feature'></div>
                }
                {uRL && resourceTypeName &&
                  <a href={link} className="btn mb-0">Download</a>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
const NewFeaturedResource = ({ item }) => {
  return (
    <>
      {item?.customFields?.featuredResource?.customFields && <>
        <RenderNewFeatureResource item={item}/>
        <Spacing item={item} />
      </>}
    </>
  )
}

export default NewFeaturedResource;
