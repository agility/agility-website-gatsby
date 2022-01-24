import { Link } from 'gatsby'
import React from 'react'
import LazyBackground from '../utils/LazyBackground'
import Lazyload from 'react-lazyload'
import Helpers from '../global/javascript/Helpers'

const DownloadableItem = ({ post, isVerticalImage, buttonItemText = 'Download' }) => {
  let thumbUrl = isVerticalImage ? (post?.customFields?.bookCover ? post?.customFields?.bookCover?.url : '/images/ebook-cover-default.png') : post?.customFields?.image?.url
  let resType = post?.customFields?.resourceTypeName?.toLowerCase().replace(/ /g, "-") || ''
  const link = `/resources/${resType ? resType + '/' : ''}${post?.customFields?.uRL}`
  const title = post?.customFields?.title
  const body = post?.customFields?.excerpt || ''
  const urlCustomer = post?.customFields?.customerWhiteLogo?.url

	const trimText = (text) => {
		let txt = text.split(' ')
		return txt.length > 18 ? txt.slice(0, 18).join(' ').concat('...') : txt.join(' ')
	}
  return (
    <div className={`downloadable-box h-100 transition-25 ps-rv d-flex flex-column  ${isVerticalImage ? 'vertical' : 'horizon'}`}>
        {isVerticalImage &&
         <div className="downloadable-thumb-vertical ps-rv">
           <Link to={link} className="ps-as d-flex align-items-center justify-content-center"><span className="sr-only">{title}</span>
            </Link>
            <div className="downloadable-pattern">
            <Lazyload offset={Helpers.lazyOffset}><img src="/images/features/downloadable-pattern.svg" className="bg transition-25" alt={title || 'Ebook'}></img></Lazyload>
            </div>
            <div className="downloadable-img">
              <Lazyload offset={Helpers.lazyOffset}><img src={thumbUrl} className="bg transition-25" alt={title || 'Ebook'}></img></Lazyload>
            </div>
          </div>
        }
        {!isVerticalImage &&
          <div className="downloadable-thumb ps-rv overflow-hidden">
            <LazyBackground src={thumbUrl} className="bg h-100 transition-25"></LazyBackground>
            <Link to={link} className="ps-as d-flex align-items-center justify-content-center"><span className="sr-only">{title}</span>
              <span className="icomoon icon-video"><span className="path3"></span></span>
            </Link>
          </div>
        }

      <div className="downloadable-content d-flex flex-column small-paragraph flex">
        <div className="flex-0-0">
          <h3>{title}</h3>
        </div>
        <div className="flex last-mb-none">
          <p>{trimText(body)}</p>
        </div>
        {link &&
          <Link to={link} className="link-line link-purple mt-15">{buttonItemText}</Link>
        }
      </div>
    </div>
  )
}

export default DownloadableItem