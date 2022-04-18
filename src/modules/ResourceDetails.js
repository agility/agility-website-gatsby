import React, {useRef, useEffect} from 'react';
import { graphql, StaticQuery, Link } from "gatsby"
import {DateTime} from 'luxon'
import { renderHTML } from '../agility/utils'
import ResponsiveImage from '../components/responsive-image.jsx'
import CallToAction from "../components/call-to-action.jsx"
import './ResourceDetails.scss'
import './RichTextArea.scss'
import LazyBackground from '../utils/LazyBackground'
import PostItemImageVertical from '../modules/DownloadableItem'
import DownloadEbookForm from '../components/forms/DownloadEbookForm'
import NewDowloadableEbooks from './NewDowloadableEbooks'
import NewWebinarDowload from './NewWebinarDowload'
import RightCTA from '../components/RightCTA';
import { animationElementInnerComponent } from '../global/javascript/animation';



const renderTags = (tags, type) => {
	if (typeof (tags) === 'object' && !tags.length) {
		let link = `/resources/${type}/${tags?.customFields?.title?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-')}`
		return (
			<span className="d-inline-block cs-tag ps-rv">
				{tags?.customFields?.title}
				<Link to={link} target="_self" className="ps-as"><span className="sr-only">{tags?.customFields?.title}</span></Link>
			</span>
		)
	}
	return tags?.map((tag, index) => {
		let link = `/resources/${type}/${tag?.customFields?.title?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-')}`
		return (
			<span key={index} className="d-inline-block cs-tag ps-rv">
				{tag?.customFields?.title}
				<Link to={link} target="_self" className="ps-as"><span className="sr-only">{tag?.customFields?.title}</span></Link>
			</span>
		)
	})
}

// const RightCTA = ({rightCTAButton, rightCTAContent}) => {

//   return (
// 		<>
// 			{rightCTAContent && rightCTAButton.href &&
// 				<div className="learn-more-cta bg-58 text-white">
// 					<div className="d-table w-100">
// 						<div className="d-table-cell align-middle text-center small-paragraph last-mb-none">
// 							<div dangerouslySetInnerHTML={renderHTML(rightCTAContent)}></div>
// 							{ rightCTAButton &&
// 								<Link to={rightCTAButton.href} className="btn btn-white mb-0">{rightCTAButton.text || 'Watch Now'}</Link>
// 							}
// 						</div>
// 					</div>
// 				</div>
// 			}
// 		</>
//   )
// }


const TopReads = ({ item, isWebinar }) => {
	if (isWebinar && !item?.customFields?.buttonItemText) {
		item.customFields.buttonItemText = 'Download'
	}
	return (
		<>
			<div className="top-read-for-u">
				<div className="container ps-rv bg">
					<div className="top-read-line"></div>
				</div>
			</div>
			{isWebinar &&
				<NewWebinarDowload item={item} />
			}
			{!isWebinar &&
				<NewDowloadableEbooks item={item} />
			}
		</>
	);
}

const RecommendedWebinar = ({ customFieldsPage }) => {
	const title = customFieldsPage.resourceHeading || 'Recommended for You'
	const customFieldResourceItem = customFieldsPage?.resourceItem?.customFields || {}
	let resType = customFieldResourceItem?.resourceTypeName?.toLowerCase().replace(/ /g, "-") || ''
	const link = `/resources/${resType ? resType + '/' : ''}${customFieldResourceItem.uRL}`
	const isWebinar = resType.includes('webinar')

	return (
		<div className="recommend-webinar">
			<h3>{title}</h3>
			{
				customFieldsPage?.resourceItem && <>
					<LazyBackground className="re-webina-thumb bg ps-rv" src={customFieldResourceItem.image?.url} >
						<Link to={link} className="ps-as d-flex align-items-center justify-content-center"><span className="sr-only">{customFieldsPage.title}</span>
							{isWebinar && <span className="icomoon icon-video"><span className="path3"></span></span>}
						</Link>
					</LazyBackground>
					<div className="content-blog">
						<p>
							{renderTags(customFieldResourceItem.resourceType, 'category')}
						</p>
						{customFieldResourceItem.title &&
							<h3>{customFieldResourceItem.title}</h3>
						}
						<Link to={link} className="link-line link-purple">{customFieldsPage?.resourceButtonText || 'Watch Now'}</Link>
					</div>
				</>
			}
		</div>
	)
}

/* ______________________ */
/* ______________________ */
/* ______________________ */
/* Main Component Detail */
export default props => (
	<StaticQuery
		query={graphql`
		query NewResourceDetailQuery {
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
			return (<ResourceDetails {...viewModel}/>);
		}}
	/>
)

const ResourceDetails = ({ item, dynamicPageItem, resources }) => {
	let resource = dynamicPageItem.customFields;
	item = item.customFields;
	item.formTitle = resource.formTitle || resource.title
	console.log(resource)
	// item.submissionPOSTURL = resource.submissio nPOSTURL
	const resourceTypes = Array.isArray(resource.resourceType) || !resource.resourceType ? resource.resourceType : [resource.resourceType]
	const resourceTopics = Array.isArray(resource.resourceTopics) || !resource.resourceTopics ? resource.resourceTopics : [resource.resourceTopics]
	const resourceTypeName = resource.resourceTypeName || ''
	const isWebinar = resourceTypeName.toLowerCase().includes('webinar')
	const isEbook = resourceTypeName.toLowerCase().includes('ebook')

	item.autopilotJourneyTrigger = resource.autopilotJourneyTrigger || (isWebinar ? 'gatedwebinar' : resource.uRL)

	// const classModule = resource.resourceTypeName &&
	// (isEbook || isWebinar) ? 'res-download-detail' : '';
	const classModule = 'res-download-detail'

	const thumbImage = resource.resourceTypeName &&
	(isEbook || isWebinar) ? resource.bookCover : resource.image;
	if (thumbImage) {
		thumbImage.label = thumbImage?.label ? thumbImage.label : resource.title
	}
	const topReadIds = resource?.topReads
	const handleGetTopReads = (topReadIds) => {
    let results = topReadIds || []
    // if (topReadIds?.length) {
    //   const formatTopReadIds = topReadIds.map(id => Number(id))
    //   results = resources.filter(res => {
    //     return formatTopReadIds.includes(res.contentID)
    //   })
    // }
    if(results.length < 3) {
      let count = results.length
      for(let i = 0; i < resources.length; i++) {
        if (count < 3 && resources[i].customFields?.resourceTypeName === resource.resourceTypeName) {
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

	/* content for top read for you */
	const topReadsItem = {
		customFields: {
			listeBooks: handleGetTopReads(topReadIds),
			listWebinar: handleGetTopReads(topReadIds),
			buttonItemText: resource?.buttonTextTopRead,
			cTAButton: {
				href: '/resources',
				text: 'View All Resources'
			}
		}
	}
	topReadsItem.customFields.content = isWebinar ? 'Top Recommended For You' : 'Top Reads For You';
	if (dynamicPageItem?.customFields?.headingTopReads) {
		topReadsItem.customFields.content = `${dynamicPageItem?.customFields?.headingTopReads}`
	}
	topReadsItem.customFields.content = `<h2>${topReadsItem.customFields.content}</h2>`
	/*  */

	const linkResource = `/resources/${resource.resourceTypeName.toLowerCase()}/${resource.uRL}`

	const topWebinar = resource.topWebinars?.length ? resource.topWebinars[0] : resource.topWebinars
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
	const contentCTA = (resource?.rightColumnCTATitle ? '<h3>' + resource?.rightColumnCTATitle + '</h3>' : '') + (resource?.rightCTAContent || '')
	let topReadsContent = <TopReads item={topReadsItem} isWebinar={ isWebinar } />
	if (!resource?.topReads || resource?.topReads?.length === 0) {
		topReadsContent = ''
	}

	return (
		<React.Fragment>
		<section ref={thisModuleRef} className={`resource-details new-resource-detail animation ${classModule}`}>
			<div className="space-70 space-dt-90"></div>
			<div className="container ps-rv z-2 ">
        <div className="d-lg-flex flex-wrap">
          <div className="cs-detail-cont-left content-ul beauty-ul anima-left">
            <div className="cs-detail-inner last-mb-none">
							<div className="date-box small-paragraph">
								<span className="date">{DateTime.fromISO(resource.date).toFormat("MMM d, yyyy")}</span>
							</div>
						<h1 className="h1">{resource.title}</h1>
						{resource.subTitle &&
							<p>{resource.subTitle}</p>
						}
						{thumbImage && thumbImage.url &&
							<div className="image-thumb">
								<ResponsiveImage img={thumbImage}
									breaks={[{ w: 640, max: 640 }, { w: 780, max: 800 }, { w: 1200, max: 1920 }]} />
							</div>
						}

						<div className="content mt-35">
							<div className="last-mb-none" dangerouslySetInnerHTML={renderHTML(resource.textblob)}></div>
						</div>
            </div>
          </div>
          <div className="cs-detail-cont-right anima-right">
						{resourceTypes && resourceTypes.length &&
							<div className="small-paragraph cs-tag-wrap last-mb-none">
								<h4>Categories</h4>
								<p>
									{renderTags(resourceTypes, 'category')}
								</p>
							</div>
						}
						{resourceTopics && resourceTopics.length &&
							<div className="small-paragraph cs-tag-wrap last-mb-none">
								<h4>Topics</h4>
								<p>
									{renderTags(resourceTopics, 'topic')}
								</p>
							</div>
						}
						{/* (resource.resourceTypeName && resource.resourceTypeName.toLowerCase() === 'ebook' || resource.resourceTypeName && resource.resourceTypeName.toLowerCase() === 'webinar') && */}
						{resource.gated === 'true' && <DownloadEbookForm item={{customFields: item}} slug={resource.uRL} allowGmail={resource.allowGmail} />}
						<div className="space-50 space-dt-0"></div>
						<SocialShare url={linkResource} />
						<div className="space-50 space-dt-50"></div>
						{dynamicPageItem?.customFields?.resourceItem &&
							<>
								<RecommendedWebinar customFieldsPage={dynamicPageItem.customFields}/>
								<div className="space-50 space-dt-80"></div>
							</>
						}
            {/* <CTA /> */}
						<RightCTA rightCTAButton={resource.rightCTAButton} rightCTAContent={contentCTA} />
          </div>
        </div>
      </div>
		</section>

		{topReadsContent}
		<div className="space-80"></div>

		</React.Fragment>
	);
}

const SocialShare = ({ url }) => {
	let shareLink = url.charAt(0) === '/' ? url.replace('/', '') : url
	shareLink = shareLink.trim()
	const domain = 'https://agilitycms.com'
	return (
		<>
			<div className="cs-d-social">
				<h5>Share This</h5>
				<div className="soc-box d-flex flex-wrap">
					<a href={`https://www.linkedin.com/shareArticle?mini=true&url=${domain + '/' + shareLink}`} target="_blank" className="d-flex align-items-center justify-content-center">
						<span className="icomoon icon-linkedin2"></span>
					</a>
					<a href={`https://twitter.com/intent/tweet/?url=${domain + '/' + shareLink}`} target="_blank" className="d-flex align-items-center justify-content-center">
						<span className="icomoon icon-twitter"></span>
					</a>
					<a href={`https://www.facebook.com/sharer/sharer.php?u=${domain + '/' + shareLink}`} target="_blank" className="d-flex align-items-center justify-content-center">
						<span className="icomoon icon-facebook"></span>
					</a>
				</div>
			</div>
		</>
	)
}