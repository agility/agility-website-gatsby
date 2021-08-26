import React, { useEffect, useRef, useState } from 'react';
import { graphql, StaticQuery, useStaticQuery, Link } from "gatsby"
import { renderHTML } from '../agility/utils'
// import CallToAction from "../components/call-to-action.jsx"
import Slider from 'react-slick'
// import ResponsiveImage from '../components/responsive-image'
import CaseStudyRotator from './CaseStudyRotator';
import RelatedResources from './RelatedResources';
import Spacing from './Spacing'
// import LazyLoad from 'react-lazyload'
import { animationElementInnerComponent } from '../global/javascript/animation'
import "./CaseStudyDetails.scss"
import "./RichTextArea.scss"

const CaseStudyDetails = (props) => {


	const query = useStaticQuery(graphql`
		query CustomRelatedResources {
			rotator: allAgilityCaseStudy(
				filter: {properties: {referenceName: {eq: "casestudies"}}}
				sort: {fields: properties___itemOrder}
				limit: 4
			) {
				nodes {
					properties {
						itemOrder
					}
					contentID
					languageCode
					customFields {
						excerpt
						title
						uRL
						image {
							url
							label
							filesize
							height
							width
						}
						customerLogo {
							url
							label
							filesize
							height
							width
						}
					}
				}
			}
			allAgilityCaseStudy {
				edges {
					node {
						customFields {
							media {
								url
							}
							gallery {
								galleryid
							}
						}
					}
				}
			}
			allAgilityResource(
				sort: {fields: properties___itemOrder}
				filter: {customFields: {resourceTypeName: {eq: "Webinar"}}}
				limit: 10
			) {
				edges {
					node {
						customFields {
							resourceTypeID
							title
							resourceTypeName
							image {
								url
								label
							}
							uRL
						}
					}
				}
			}
			allAgilityBlogPost(
				sort: {order: ASC, fields: properties___itemOrder}
				limit: 10
				filter: {customFields: {categoriesTitle: {eq: "Blog"}}}
			) {
				edges {
					node {
						customFields {
							title
							postImage {
								url
								label
							}
							categoriesTitle
							uRL
						}
					}
				}
			}
		}
	`)

	const mediaLists = query?.allAgilityCaseStudy?.edges
	const relatedRes = query?.allAgilityResource?.edges
	const relatedBlog = query?.allAgilityBlogPost?.edges
	let alternativeRotator = query?.rotator?.nodes

	let caseStudy = props.dynamicPageItem?.customFields;

	let link = '/resources/case-studies/' + caseStudy.uRL

	/* case studies rorator data */
	alternativeRotator = alternativeRotator.filter(alt => {
		if (alt.contentID !== props.item?.contentID) {
			return alt
		}
	})
	const roratorItems = {}
	roratorItems.cTAbuttonText = caseStudy?.rotatorCTAbuttonText || 'See how';
	roratorItems.title = caseStudy?.rotatorTitle || 'See Other Customer Success Stories'
	roratorItems.caseStudies = caseStudy?.rotatorCaseStudies || alternativeRotator.slice(0, 3)
	roratorItems.darkMode = caseStudy?.rotatorDarkMode
	roratorItems.mobileSpace = caseStudy?.rotatorMobileSpace || 80
	roratorItems.desktopSpace = caseStudy?.rotatorDesktopSpace || 100

	/* case studies related resources data */
	const relatedItems = {}
	// relatedItems.cTAbuttonText = caseStudy?.relatedResourcesCTAbuttonText
	relatedItems.title = caseStudy?.relatedResourcesTitle || 'View Related Resources'
	relatedItems.relatedResources = caseStudy?.relatedResources
	relatedItems.darkMode = caseStudy?.relatedResourcesDarkMode
	// relatedItems.mobileSpace = caseStudy?.relatedResourcesMobileSpace || 80
	// relatedItems.desktopSpace = caseStudy?.relatedResourcesDesktopSpace || 100

	const renderTags = (tags, type) => {
		return tags.map((tag, index) => {
			let link = `/resources/case-studies/?${type}=${tag?.customFields?.title?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-')}`
			return (
				<span key={index} className="d-inline-block cs-tag ps-rv">
					{tag?.customFields?.title}
					<Link to={link} target="_self" className="ps-as"><span className="sr-only">{tag?.customFields?.title}</span></Link>
				</span>
			)
		})
	}

	
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
			<section ref={thisModuleRef} className="p-w new-case-study-details animation">
				<div className="container anima-bottom">
					<div className="cs-detail-cont d-flex flex-grow">
						<div className="cs-detail-cont-left content-ul beauty-ul">
							<div className="cs-detail-inner last-mb-none" dangerouslySetInnerHTML={renderHTML(caseStudy?.topContent)}></div>
						</div>
						<div className="cs-detail-cont-right">
							{caseStudy?.website?.href &&
								<div className="small-paragraph cs-website last-mb-none">
									<h4>Website</h4>
									<p><a href={caseStudy?.website?.href} target={caseStudy?.website?.target || '_blank'}>{caseStudy?.website?.text || caseStudy?.website?.href}</a></p>
								</div>
							}

							{caseStudy?.caseStudyIndustries && caseStudy?.caseStudyIndustries.length > 0 &&
								<div className="small-paragraph cs-tag-wrap last-mb-none">
									<h4>Industries</h4>
									<p>
										{renderTags(caseStudy?.caseStudyIndustries, 'industry')}
									</p>
								</div>
							}

							{caseStudy?.caseStudyChallenges && caseStudy?.caseStudyChallenges.length > 0 &&
								<div className="small-paragraph cs-tag-wrap last-mb-none">
									<h4>Challenges</h4>
									<p>
										{renderTags(caseStudy?.caseStudyChallenges, 'challenge')}
									</p>
								</div>
							}

							<div>
								<div className="d-none d-lg-block">
									<CaseStudySocialShare link={link} title={caseStudy.title} />
									{caseStudy?.quote &&
										<div className="cs-quote">
											{/* <span className="icomoon icon-quote"></span> */}
											<div className="last-mb-none" dangerouslySetInnerHTML={renderHTML(caseStudy?.quote)}></div>
										</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>

				<CaseStudyGallery dataList={mediaLists} galleryId={caseStudy?.gallery?.galleryid} title={caseStudy.title} />

				<div className="container">
					<div className="d-lg-flex flex-grow">
						<div className="cs-detail-cont-left beauty-ul">
							<div className="cs-detail-inner">
								<div dangerouslySetInnerHTML={renderHTML(caseStudy?.bottomContent)} />
							</div>
						</div>
						<div className="cs-detail-cont-right fake" />
					</div>

					<div className="d-lg-none">
						{caseStudy?.quote &&
							<div className="cs-quote">
								{/* <span className="icomoon icon-quote"></span> */}
								<div className="last-mb-none" dangerouslySetInnerHTML={renderHTML(caseStudy?.quote)}></div>
							</div>
						}
						<CaseStudySocialShare link={link} title={caseStudy.title} />
					</div>
				</div>

				{/* {caseStudy.cTA && <CallToAction item={caseStudy.cTA} />} */}

			</section>

			<CaseStudyRotator item={{ customFields: roratorItems }} />
			<CaseStudyRelatedResource resources={relatedRes} blogs={relatedBlog} item={{ customFields: relatedItems }} currentContentID={props.item?.contentID} />
			<Spacing item={props.item} />

		</>

	);
}

export default CaseStudyDetails



const CaseStudySocialShare = ({ link, title }) => {

	let shareLink = link.charAt(0) === '/' ? link.replace('/', '') : link
	shareLink = shareLink.trim()
	const domain = 'https://agilitycms.com'
	useEffect(() => {

		return () => {

		}
	}, [])

	return (
		<>
			<div className="cs-d-social">
				<h5>Share Case Study</h5>
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

const CaseStudyGallery = ({ dataList, galleryId, title }) => {

	const mediaLists = dataList // query?.allAgilityCaseStudy?.edges
	const founded = mediaLists?.filter(i => {
		if (i.node?.customFields?.gallery?.galleryid === galleryId) {
			return i.node.customFields
		}
	})

	let listMedia = []
	if (founded && founded.length > 0) {
		listMedia = founded[0].node.customFields.media
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 250,
		arrows: true,
		rows: 1,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
	}
	const galleries = listMedia?.map((i, index) => {
		return (
			<div key={index} className="gal-item">
				{/* <ResponsiveImage img={i} /> */}
				{/* <LazyLoad><img src={i.url} alt="ab" /></LazyLoad> */}
				<img src={i.url} alt={title} />
			</div>

		)
	});

	return (
		<>
			<section className={`case-d-gallery `} >
				{listMedia && listMedia.length > 0 &&
					<Slider {...settings} className={`gal-slider ${galleries?.length > 1 ? 'has-slide' : ''}`}>
						{galleries}
					</Slider>
				}

			</section>
		</>
	)
}

const CaseStudyRelatedResource = ({ resources, blogs, item, currentContentID = null }) => {

	if (!item.customFields?.relatedResources?.length) {
		resources = resources.map(res => {
			return res.node
		})
		blogs = blogs.map(blog => {
			blog.node.customFields.image = blog.node?.customFields?.postImage
			blog.node.customFields.resourceTypeName = blog.node?.customFields?.categoriesTitle
			return blog.node
		})

		resources.push(...blogs)

		resources = resources.filter(res => {
			if (res?.customFields?.image && res?.customFields?.contentID !== currentContentID) {
				return res
			}
		})
		item.customFields.relatedResources = resources.slice(0, 3)
	}

	return (
		<RelatedResources item={item} />
	)
}