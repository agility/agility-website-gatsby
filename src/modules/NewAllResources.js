import React, { useEffect, useState} from 'react';
import {  graphql, StaticQuery } from "gatsby"
import * as StringUtils from "../utils/string-utils"
import SelectC8 from '../utils/SelectC8'
import Helpers from '../global/javascript/Helpers'
import { Link } from 'gatsby'
import { renderHTML } from '../agility/utils'
import LazyBackground from '../utils/LazyBackground'
// import { DateTime } from 'luxon'
import Spacing from './Spacing'
import Lazyload from 'react-lazyload'

import './NewAllResources.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query NewResourcesListingQuery {
			allAgilityResource(sort: {fields: customFields___date, order: DESC}) {
				nodes {
					customFields {
						image {
							url
							width
							height
							label
						}
						resourceType {
							contentid
						}
						date(formatString: "MMMM D, YYYY")
						title
						uRL
						resourceTypeID
						resourceTypeName
					}
					contentID
				}
			}
			allAgilityResourceType(sort: {order: ASC, fields: properties___itemOrder}) {
				nodes {
					customFields {
						title
					}
					id
					contentID
				}
			}
		  }
    `}
		render={queryData => {
			//filter out only those logos that we want...
			let resources = queryData.allAgilityResource.nodes
			const resourceType = queryData.allAgilityResourceType.nodes
			let {content, numberItemPerPage} = props.item?.customFields
			const viewModel = {
				item: props.item,
				resources,
				resourceType,
				content,
				numberItemPerPage
			}
			return (<NewAllResources {...viewModel}/>);
		}}
	/>
)

const PostItem = ({ thumbUrl, link, title }) => {
	return (
		<>
			<div className="case-thumb ps-rv overflow-hidden bg-c9-o25">
				{ thumbUrl ?
					(<LazyBackground className="ps-as z-2 bg transition-25" src={thumbUrl} />)
					:
					(
						<Lazyload offset={Helpers.lazyOffset}>
							<img src="/images/blog-icon-default.png" className='image-default' alt='Default Blog' loading="lazy" />
						</Lazyload>
					)
				}
				<Link to={link} className="ps-as"><span className="sr-only">{title}</span></Link>
			</div>
			<div className="case-content d-flex flex-column small-paragraph flex">
				<div className="flex-0-0 last-mb-none heading">
					<h3><Link to={link} className="color-inherit">{title}</Link> </h3>
				</div>
				{link && <Link to={link} className="link-line flex-0-0 link-purple">Read More</Link>}
			</div>
		</>
	)
}

const PostResult = ({posts, loadMoreIdx}) => {
	if (posts.length) {
		const postResults = posts.filter((item, index) => index < loadMoreIdx).map((post, index) => {
			const thumbUrl = post?.customFields?.image?.url
			let resType = post?.customFields?.resourceTypeName?.toLowerCase().replace(/ /g, "-") || ''
			const link = `/resources/${resType ? resType + '/' : ''}${post?.customFields?.uRL}`
			const title = post?.customFields?.title
			return <div className="col-12 col-md-6 col-lg-4 post-item" key={`post-${post.contentID}`}>
			<div className="case-box h-100 transition-25 flex-column new-post ps-rv d-flex">
				<PostItem thumbUrl={thumbUrl} link={link} title={title} />
			</div>
		</div>
		})
		return (<>{postResults}</>)
	}
	return (
		<h3 className="text-center col-12">There are no resource in this type. Please check back later.</h3>
	)
}

const NewAllResources = ({item, resources, resourceType, content, numberItemPerPage}) => {
	const [loadMoreIdx, setLoadMoreIdx] = useState( numberItemPerPage ? Number(numberItemPerPage) : 12)
	const tmpPostOptions = {
		name: 'posts',
		options: { ...resourceType.reduce((obj, node) => {
			obj[node.contentID] = node.customFields.title
			return obj
		}, {}), 1: 'Asset Category' },
		selectedOption: [1]
	}
	const [postOpts, setPostOpts] = useState(tmpPostOptions)
	const [postRender, setPostRender] = useState(resources)

	const onChangeFilter = ({ name, value }) => {
		if (value.includes(1)) {
			setPostRender(resources)
			setPostOpts({...tmpPostOptions, selectedOption: [1]})
		} else {
			const detailCategory = resourceType.find((node) => {
				return value.includes(node.contentID)
			})
			const newResoucesFilter = resources.filter(res => {
				return value.includes(+res.customFields?.resourceTypeID)
			})
			setPostRender(newResoucesFilter)
			setPostOpts({...tmpPostOptions, selectedOption: value})
		}
		setLoadMoreIdx(numberItemPerPage ? Number(numberItemPerPage) : 12)
	}

	const loadMoreHandler = () => {
		let tmpLoadMoreIdx = loadMoreIdx
		tmpLoadMoreIdx += 12
		setLoadMoreIdx(tmpLoadMoreIdx)
	}

	// as componentDidMount
	useEffect (() => {
		setTimeout(() => {
			const hideModules = document.querySelectorAll('.blog-listing, .info-box, .stay-in-touch-box, .most-viewed-articles')
			hideModules.forEach(mod => {
				mod.style.display = 'none'
			})
		}, 1000)
	}, [])

	return (
		<>
			<section className="mod-new-post-listing">
				<div className="container">
					{ content &&
						<div className="mx-auto mb-45 last-mb-none max-w-940 text-center beauty-ul" dangerouslySetInnerHTML={renderHTML(content)}></div>
					}
					<div className="filter-wrap small-paragraph case-filter-box">
						<SelectC8 className="d-inline-block" data={postOpts} onChange={onChangeFilter} />
					</div>

					<div className="row">
						<PostResult posts={postRender} loadMoreIdx={loadMoreIdx} />
					</div>

					{loadMoreIdx <= postRender.length - 1 && <div className="text-center">
					<a className="btn btn-load-more" onClick={loadMoreHandler}>
						<span>Load More</span>
					</a>
				</div>}
				</div>
			</section>
			<Spacing item={item}/>
		</>
	);
}