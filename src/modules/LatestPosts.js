import React from 'react';
import { Link, graphql, StaticQuery } from "gatsby"
import ResponsiveImage from '../components/responsive-image.jsx'

import StringUtils from "../utils/string-utils"

import './LatestPosts.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query LatestPostsQuery {

			allAgilityBlogPost(filter: {properties: {referenceName: {eq: "blogposts"}}}, sort: {fields: customFields___date, order: DESC}, limit: 10) {
			  nodes {
				contentID
				customFields {
				  date(formatString: "MMMM D, YYYY")
				  excerpt
				  title
				  uRL
				  postImage {
					url
					label
					height
					width
				  }
				}
				category {
				  customFields {
					title
				  }
				}
				author {
				  customFields {
					image {
					  url
					  label
					  height
					  width
					}
					title
				  }
				}
			  }
			}
		  }
        `}
		render={queryData => {

			//filter out the current post
			let posts = queryData.allAgilityBlogPost.nodes;

			posts.forEach(p => {
				let excerpt = p.customFields.excerpt;
				if (excerpt) {
					p.customFields.excerpt = StringUtils.stripHtml(excerpt, 120);
				}
			});

			if (props.dynamicPageItem) {
				posts = posts.filter(p => {
					return p.contentID !== props.dynamicPageItem.contentID;
				});
			}

			let numPosts = parseInt(props.item.customFields.postCount);
			if (isNaN(numPosts) || numPosts < 1) numPosts = 3;

			//TODO: only pull posts that have the same category or tags as the main post
			posts = posts.slice(0, numPosts);

			posts.forEach(p => {
				//attach the URL from the sitemap

				p.url = "/resources/posts/" + p.customFields.uRL;

			});

			const viewModel = {
				item: props.item,
				posts: posts
			}
			return (
				<LatestPosts {...viewModel} />
			);
		}}
	/>
)


const LatestPosts = ({ item, posts, sitemapNodes }) => {


	const moduleItem = item;
	item = item.customFields;

	var four = posts.map(function (post) {
		return <LatestBlogPostsContent item={post} key={moduleItem.contentID + "-" + post.contentID} readMoreText={item.readMoreLabel} />
	});

	return (

		<section className="latest-blog-posts">
			<div className="container-my">
				<h2 className="title-component">{item.title}</h2>

				<div className="blog-wrapper">
					<div className="blog-inner">
						{four}
					</div>
				</div>
				{item.primaryButton && item.primaryButton.href &&
					<div className="bottom-btn"><a className="btn" href={item.primaryButton.href} target={item.primaryButton.target}>{item.primaryButton.text}</a></div>}

			</div>
		</section>


	);
}


class LatestBlogPostsContent extends React.Component {

	render() {

		let url = this.props.item.url;
		let item = this.props.item.customFields;

		let excerpt = item.excerpt;

		return (
			<div className="blog-item-container">
				<div className="blog-item">
					{item.postImage != null &&
						<div className="image"><Link to={url} >
							<ResponsiveImage img={item.postImage}
								breaks={[{ w: 640, h: 369, max: 640 }, { w: 768, h: 433, min: 800 }, { w: 480, h: 277, min: 1190 }]} /></Link>
						</div>
					}
					<div className="content">
						<Link to={url} ><h3>{item.title}</h3></Link>
						<p>{excerpt}</p>
					</div>
					<Link to={url} className="btn"><span>{this.props.readMoreText}</span></Link>
				</div>
			</div>
		);
	}
}