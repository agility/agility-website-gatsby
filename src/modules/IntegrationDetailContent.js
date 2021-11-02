import React, { useEffect, useRef } from 'react';
// graphql, StaticQuery, useStaticQuery,
import { Link } from "gatsby"
import { renderHTML } from '../agility/utils'
// import CallToAction from "../components/call-to-action.jsx"
// import Slider from 'react-slick'
// import ResponsiveImage from '../components/responsive-image'
// import RelatedResources from './RelatedResources';
// import Spacing from './Spacing'
// import LazyLoad from 'react-lazyload'
import { animationElementInnerComponent } from '../global/javascript/animation'
import "./CaseStudyDetails.scss"
import "./RichTextArea.scss"

const IntegrationDetailContent = ({ viewModel, isIntegrationReference}) => {
	let dynamicPageItem = viewModel.dynamicPageItem
	let documentation = viewModel.documentation
	// let dynamicPageItem = viewModel.dynamicPageItem

	/* case studies related resources data */
	const relatedItems = {}
	// relatedItems.cTAbuttonText = caseStudy?.relatedResourcesCTAbuttonText
	relatedItems.title = dynamicPageItem?.relatedResourcesTitle || 'View Related Resources'
	relatedItems.relatedResources = dynamicPageItem?.relatedResources
	relatedItems.darkMode = dynamicPageItem?.relatedResourcesDarkMode
	// relatedItems.mobileSpace = caseStudy?.relatedResourcesMobileSpace || 80
	// relatedItems.desktopSpace = caseStudy?.relatedResourcesDesktopSpace || 100

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
	let content = <div className="cs-detail-inner last-mb-none" dangerouslySetInnerHTML={renderHTML(dynamicPageItem?.customFields?.textblob)}></div>
	if (viewModel.isIntegrationReference) {
		content = <>
			<h2>{dynamicPageItem?.customFields?.overviewHeading}</h2>
			<div className="cs-detail-inner last-mb-none" dangerouslySetInnerHTML={renderHTML(dynamicPageItem?.customFields?.overviewContent)}></div>
			{viewModel.overviewItems.length && <ul className="list-url last-mb-none">
				{viewModel.overviewItems.map(item => <li key={`overview-item-` + item.contentID}>
					<p><strong>{item?.customFields?.heading}</strong></p>
					<p>{item?.customFields?.description}</p>
				</li>)}
			</ul>}
		</>
	}

	return (
		<>
			<section ref={thisModuleRef} className="p-w new-case-study-details animation">
				<div className="container anima-bottom">
					<div className="cs-detail-cont d-flex flex-grow">
						<div className="cs-detail-cont-left content-ul">
						{content}
						</div>
						<IntegrationRightSidebar dynamicPageItem={dynamicPageItem} documentation={documentation} isIntegrationReference={viewModel.isIntegrationReference}/>
					</div>
				</div>

			</section>
			{/* <Spacing item={props.item} /> */}
		</>
	);
}

export default IntegrationDetailContent

const IntegrationRightSidebar = ({ dynamicPageItem, documentation, isIntegrationReference }) => {
	const website = isIntegrationReference ? {
		href: dynamicPageItem.customFields.website,
		text: dynamicPageItem.customFields.title
	} : dynamicPageItem?.customFields?.website
	let tags = dynamicPageItem?.customFields?.customTags
	let link = '/partners/integrations/' + dynamicPageItem.customFields.uRL

	const renderTags = (tags, type) => {
		return tags.map((tag, index) => {
			let link = `/partners/integrations/?${type}=${tag?.customFields?.title?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-')}`
			return <span key={'tags-' + index} className="d-inline-block cs-tag ps-rv">
					{tag?.customFields?.title}
					<Link to={link} target="_self" className="ps-as"><span className="sr-only">{tag?.customFields?.title}</span></Link>
				</span>
		})
	}

	return <div className="cs-detail-cont-right">
		{website?.href &&
			<div className="small-paragraph cs-website last-mb-none">
				<h4>Website</h4>
				<p><a href={website?.href} target={website?.target || '_blank'}>{website?.text || website?.href}</a></p>
			</div>
		}

		{tags && tags.length > 0 &&
			<div className="small-paragraph cs-tag-wrap last-mb-none">
				<h4>Type of Integration</h4>
				<p>{renderTags(tags, 'integration')}</p>
			</div>
		}

		{documentation && documentation.length > 0 &&
			<div className="small-paragraph cs-website last-mb-none">
				<h4>Documentation</h4>
				{documentation.map((doc, index) => {
					const url = doc.customFields.uRL
					return <div key={'doc-' + index}><a href={url?.href} target={url?.target || '_blank'}>{url?.text || url?.href}</a></div>
				})}
			</div>
		}

		<div>
			<div className="d-none d-lg-block">
				<IntegrationSocialShare link={link} title={dynamicPageItem.title} />
			</div>
		</div>
	</div>
}
const IntegrationSocialShare = ({ link, title }) => {
	let shareLink = link.charAt(0) === '/' ? link.replace('/', '') : link
	shareLink = shareLink.trim()
	const domain = 'https://agilitycms.com'

	return (
		<>
			<div className="cs-d-social">
				<h5>SHARE INTEGRATION</h5>
				<div className="soc-box d-flex flex-wrap">
					{/* <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${domain + '/' + shareLink}`} target="_blank" className="d-flex align-items-center justify-content-center">
						<span className="icomoon icon-share2"></span>
					</a> */}
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