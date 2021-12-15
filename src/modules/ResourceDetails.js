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
	// console.log('itemitem', item);
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

const RecommendedWebinar = ({item}) => {
	if (item) {
		const customFields = item.customFields
		let resType = customFields?.resourceTypeName?.toLowerCase().replace(/ /g, "-") || ''
  	const link = `/resources/${resType ? resType + '/' : ''}${customFields.uRL}`
		return (
			<div className="recommend-webinar">
				<h3>Recommended Webinars</h3>
				<LazyBackground className="re-webina-thumb bg ps-rv" src={customFields.image?.url} >
					<Link to={link} className="ps-as d-flex align-items-center justify-content-center"><span className="sr-only">{customFields.title}</span>
						<span className="icomoon icon-video"><span className="path3"></span></span>
					</Link>
				</LazyBackground>
				<div className="content-blog">
					<p>
						{renderTags(customFields.resourceType, 'category')}
					</p>
					{customFields.title &&
						<h3>{customFields.title}</h3>
					}
					<Link to={link} className="link-line link-purple">Watch Now</Link>
				</div>
			</div>
		)
	}
	return (
	<div className="recommend-webinar">
		<h3>Recommended Webinars</h3>
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
			return (<ResourceDetails {...viewModel}/>);
		}}
	/>
)
const ResourceDetails = ({ item, dynamicPageItem, resources }) => {

	// console.log('dynamicPageItem', item, dynamicPageItem);
	let resource = dynamicPageItem.customFields;
	item = item.customFields;
	const resourceTypes = Array.isArray(resource.resourceType) || !resource.resourceType ? resource.resourceType : [resource.resourceType]
	const resourceTopics = Array.isArray(resource.resourceTopics) || !resource.resourceTopics ? resource.resourceTopics : [resource.resourceTopics]

	const isWebinar = resource.resourceTypeName.toLowerCase() === 'webinar'
	const isEbook = resource.resourceTypeName.toLowerCase() === 'ebook'
	const classModule = resource.resourceTypeName &&
	(isEbook || isWebinar) ? 'res-download-detail' : '';

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
			cTAButton: {
				href: '/resources',
				text: 'View All Resources'
			}
		}
	}
	topReadsItem.customFields.content = isWebinar ? '<h2>Top Webinars For You</h2>' : '<h2>Top Picks For You</h2>';
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
          {/*  */}
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
						{(resource.resourceTypeName && resource.resourceTypeName.toLowerCase() === 'ebook' || resource.resourceTypeName && resource.resourceTypeName.toLowerCase() === 'webinar') &&
							<DownloadEbookForm item={{customFields: item}} slug={resource.uRL} />
						}
						<div className="space-50 space-dt-0"></div>
						<SocialShare url={linkResource} />
						<div className="space-50 space-dt-80"></div>
						{topWebinar &&
							<>
								<RecommendedWebinar item={topWebinar} />
								<div className="space-50 space-dt-80"></div>
							</>
						}
            {/* <CTA /> */}
						<RightCTA rightCTAButton={resource.rightCTAButton} rightCTAContent={resource.rightCTAContent} />

          </div>
        </div>
      </div>
		</section>

		{(resource.resourceTypeName && resource.resourceTypeName.toLowerCase() === 'ebook' || resource.resourceTypeName && resource.resourceTypeName.toLowerCase() === 'webinar') &&
			<>
				<TopReads item={topReadsItem} isWebinar={ isWebinar } />
				<div className="space-80"></div>
			</>
		}
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