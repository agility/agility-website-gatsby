import React, { useRef, useEffect } from 'react';
import { Link } from 'gatsby'
import Spacing from './Spacing'
import LazyBackground from '../utils/LazyBackground'
import './RelatedResources.scss'
import { animationElementInnerComponent } from '../global/javascript/animation'

const RelatedResources = ({ item }) => {

  // console.log(`props Related`, item)
  const headline = item?.customFields?.title
  const resources = item?.customFields?.relatedResources

  const thisModuleRef = useRef(null)
  /* animation module */
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

  return (
    <>
      <section ref={thisModuleRef} className="related-resources ps-rv animation">
        <div className="container ps-rv anima-bottom delay-2">
          {headline &&
            <div className="text-center">
              <h4 className="h2">{headline}</h4>
            </div>
          }
          <div className="row last-mb-none">
            {resources?.map((res, index) => {
              return <div key={index} className="col-md-6 col-lg-4 relate-col">
                <ResourcesItem resource={res} />
              </div>
            })}
          </div>
        </div>
      </section>
      <Spacing item={item} />
    </>
  )
}

export default RelatedResources


const ResourcesItem = ({ resource }) => {
  const data = resource?.customFields
  const imgUrl = data?.image
  const link = `/resources/${data?.resourceTypeName.toLowerCase().trim().replace(' ', '-')}/${data?.uRL}`
  return (
    <div className="relate-re-box transition-25 h-100">
      <div className="overflow-hidden">
        <LazyBackground className="relate-re-thumb transition-25 bg" src={imgUrl?.url} />
        <Link to={link} className=" ps-as"><span className="sr-only">{data?.title || imgUrl?.label}</span></Link>
      </div>
      <div className="relate-re-cont">
        <h3>{data?.title}</h3>
        <Link to={link} className="link-line line-purple">Read More</Link>
      </div>
    </div>
  )
}