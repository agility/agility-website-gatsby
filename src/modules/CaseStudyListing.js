import React from 'react';
import { graphql, StaticQuery } from "gatsby"
import StringUtils from "../utils/string-utils"

import ReusablePostListing from "../components/reusable-post-listing.jsx"

import './PostListing.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query CaseStudyListingQuery {
			allAgilityCaseStudy(filter: {properties: {referenceName: {eq: "casestudies"}}}, sort: {fields: properties___itemOrder}) {
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
				  postImage: image {
					url
					label
					filesize
					height
					width
				  }
				  logo: customerLogo {
					url
					label
					filesize
					height
					width
				  }
				}
			  }
			}
		  }

		`}
		render={queryData => {

			//filter out only those logos that we want...
			let posts = queryData.allAgilityCaseStudy.nodes;

			//adjust the excerpt
			posts.forEach(p => {
				let excerpt = p.customFields.excerpt;
				if (excerpt) {
					p.customFields.excerpt = StringUtils.stripHtml(excerpt, 200);
				}

				p.url = "/resources/case-studies/" + p.customFields.uRL;

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