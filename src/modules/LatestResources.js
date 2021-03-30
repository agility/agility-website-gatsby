import React from 'react';
import { graphql, StaticQuery } from 'gatsby'
import StringUtils from '../utils/string-utils'
import FilteredListing from '../components/filtered-listing.jsx'
export default props => (
	<StaticQuery
		query={graphql`
		query ResourcesQuery {
			allAgilityResourceType(filter: {properties: {referenceName: {eq: "resourcetypes"}}}, sort: {order: ASC, fields: properties___itemOrder}) {
			  nodes {
				contentID
				languageCode
				customFields {
				  title
				}
				properties {
				  itemOrder
				}
			  }
			}
			allAgilityResource(filter: {properties: {referenceName: {eq: "resources"}}}, sort: {fields: properties___itemOrder, order: ASC}) {
			  nodes {
				contentID
				languageCode
				properties {
				  itemOrder
				}
				customFields {
				  date(formatString: "MMM d, yyyy")
				  excerpt
				  title
				  image {
					url
					label
					height
					width
				  }
				  subTitle
				  slug: uRL,
				  resourceTypeName
				  resourceTypeID
				}
			  }
			}
		  }
        `}
		render={queryData => {

			//filter out only those logos that we want...
			let resTypes = queryData.allAgilityResourceType.nodes;
			let resources = queryData.allAgilityResource.nodes;

			//adjust the excerpt and the url
			resources.forEach(p => {
				let excerpt = p.customFields.excerpt;
				if (excerpt) {
					p.customFields.excerpt = StringUtils.stripHtml(excerpt, 160);
				}


				let resType = p.customFields.resourceTypeName.toLowerCase().replace(/ /g, "-");
				p.customFields.url = `/resources/${resType}/${p.customFields.slug}`;


			});

			const viewModel = {
				item: props.item,
				items: resources,
				types: resTypes,
				filter: function(ids) {
					if (! ids || ids.length === 0) return resources;

					 return resources.filter(r => {
						const resTypeID = parseInt(r.customFields.resourceTypeID);
						return ids.findIndex(i => { return i === resTypeID;}) >= 0;
					 })

				}
			}
			return (
				<FilteredListing {...viewModel} />
			);
		}}
	/>
)

