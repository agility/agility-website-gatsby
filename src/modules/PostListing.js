import React from 'react';
import {  graphql, StaticQuery } from "gatsby"
import StringUtils from "../utils/string-utils"
import ReusablePostListing from "../components/reusable-post-listing.jsx"



import './PostListing.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query PostListingQuery {

			allAgilityBlogPost(filter: {properties: {referenceName: {eq: "blogposts"}}}, sort: {fields: customFields___date, order: DESC}) {
			  nodes {
				contentID
				customFields {
				  date(formatString: "MMMM D, YYYY")
				  excerpt
				  title
				  uRL
				  postImage {
					label
					url
					filesize
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
					}
					title
				  }
				}
				tags {
					contentID
					customFields {
						title
					}
				}
			  }
			}
		  }
        `}
		render={queryData => {

			//filter out only those logos that we want...
			let posts = queryData.allAgilityBlogPost.nodes;

			//filter by tag if neccessary
			if (props.dynamicPageItem && props.dynamicPageItem.properties.definitionName === "BlogTag") {
				const tagContentID = props.dynamicPageItem.contentID;

				posts = posts.filter(p => {
					if (! p.tags || ! (p.tags.length > 0)) return false;
					const index = p.tags.findIndex(t => { return parseInt(t.contentID) === parseInt(tagContentID); });
					return index >= 0;
				});
			}

			//adjust the excerpt
			posts.forEach(p => {
				let excerpt = p.customFields.excerpt;
				if (excerpt) {
					p.customFields.excerpt = StringUtils.stripHtml(excerpt, 200);
				}

				p.url = "/resources/posts/" + p.customFields.uRL;
			});

			const viewModel = {
				item: props.item,
				posts: posts
			}
			return (
				<ReusablePostListing {...viewModel} />
			);
		}}
	/>
)
