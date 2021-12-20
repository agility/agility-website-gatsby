import React from 'react';
import {  graphql, StaticQuery } from "gatsby"
import * as StringUtils from "../utils/string-utils"
import ResponsiveImage from '../components/responsive-image';
import { Link } from "gatsby"
import './NewPostsFeatured.scss'
import Spacing from './Spacing'
import LazyBackground from '../utils/LazyBackground'
import Helpers from '../global/javascript/Helpers'
import Lazyload from 'react-lazyload'

const NewPostsFeatured = ({ item }) => {
	let posts = item?.customFields?.posts;
	posts.forEach(p => {
		let excerpt = p.customFields.excerpt;
		if (excerpt) {
			p.customFields.excerpt = StringUtils.stripHtml(excerpt, 200);
		}

		p.url = "/resources/posts/" + p.customFields.uRL;
	});
	return <section className="mod-new-posts-featured">
		<div className="container">
			<div className="text-center heading last-mb-none">
				<h2>{item?.customFields?.title}</h2>
			</div>
			<section className="mod-space space-20 space-dt-50 "></section>

			<div className="row">
				{posts.map(post => {
					const thumbUrl = post?.customFields?.postImage?.url
					const link = '/resources/posts/' + post?.customFields?.uRL
					return <div className="posts-feature-item-col flex col-12 col-lg-4" key={`post-feature-${post.contentID}`}>
						<div className="case-box h-100 transition-25 flex-column new-post ps-rv d-flex posts-feature-item-wrap">
							<div className="case-thumb ps-rv overflow-hidden bg-c9-o25">
								{thumbUrl && <LazyBackground className="ps-as z-2 bg transition-25" src={thumbUrl} />}
								{!thumbUrl && <Lazyload offset={Helpers.lazyOffset}><img src="/images/blog-icon-default.png" className='image-default' alt='Default Blog' loading="lazy" /></Lazyload>}
								<Link to={link} className="ps-as"><span className="sr-only">{post?.customFields?.title}</span></Link>
							</div>
							<div className="case-content d-flex flex-column small-paragraph flex text-white bg-58">
								<div className="flex heading">
									<h3>{post?.customFields?.title}</h3>
									<p>{post.customFields.excerpt}</p>
								</div>
								<div className="cta flex-0-0">
									<Link to={post.url} className="btn btn-outline-white text-white">Read More</Link>
								</div>
							</div>
							<Link to={link} className=" ps-as"><span className="sr-only">{post?.customFields?.title}</span></Link>
						</div>
					</div>
				})}
			</div>
			<Spacing item={item}/>
		</div>
	</section>
}
export default NewPostsFeatured

